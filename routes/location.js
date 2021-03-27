const router = require('express').Router();
const Location = require('../models/Location');

router.post('/comment', () => {});

//Post location
router.post('/', async (req, res) => {
  console.log(req.body);
  const {
    latitude,
    longitude,
    name,
    fourSquareCategory,
    fourSquareId
  } = req.body.body;
  const payload = {
    latitude,
    longitude,
    fourSquareId,
    fourSquareCategory,
    name
  };
  try {
    const place = await Location.findOne({ fourSquareId: fourSquareId });
    if (place) {
      // console.log('unable to inser');
      return res.status(400).json({ msg: 'Place already exists' });
    }

    const data = new Location(payload);
    const location = await data.save();
    return res.json({ location });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

//Get location details by fourSquareId (passed in body)
router.get('/:foursquareid', async (req, res) => {
  try {
    const place = await Location.findOne({
      fourSquareId: req.params.foursquareid
    });
    if (!place) {
      return res
        .status(404)
        .json({ msg: 'The place does not exist in the database' });
    }
    return res.json({ place });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: 'server error' });
  }
});

//Get average covidR rating by fourSquareId
router.get('/rating', async (req, res) => {
  const { fourSquareId } = req.body;
  try {
    const place = await Location.findOne({ fourSquareId: fourSquareId });
    const rating = place.averageCovidRating;
    return res.json({ rating });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: 'server error' });
  }
});

//Give average covid rating
router.put('/rating/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const location = await Location.findById(req.params.id);
    console.log(location);
    const length = location.covidRating.length;
    location.covidRating.unshift({
      rating: req.body.rating
    });
    const newRating =
      (location.averageCovidRating * length + req.body.rating) / (length + 1);

    location.averageCovidRating = newRating;

    await location.save();
    return res.json(location.covidRating);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: 'server error' });
  }
});

//Post comment (by foursquareID)
router.post('/comment/', async (req, res) => {
  try {
    const { fourSquareId } = req.body;
    const place = await Location.findOne({ fourSquareId: fourSquareId });
    const newComment = {
      text: req.body.text
    };

    place.comments.unshift(newComment);

    await place.save();
    return res.json(place.comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'server error' });
  }
});

//Get comments (by fourSquareId)
router.get('/comment/', async (req, res) => {
  try {
    const { fourSquareId } = req.body;
    const place = await Location.findOne({ fourSquareId: fourSquareId });

    const comments = place.comments;
    return res.json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;
