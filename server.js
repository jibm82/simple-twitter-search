const express = require('express');
const Twitter = require('twitter');
const config = require('./config/twitter');
const t = new Twitter(config);

const app = express();

app.get('/search/twitter/:q', (req, res) => {
  let params = {
    q: req.params.q,
    count: 10,
    result_type: 'recent',
    lang: 'en'
  };

  t.get('search/tweets', params, function (err, data, response) {
    // If there is no error, proceed
    if (!err) {
      // Loop through the returned tweets
      res.json(data);
    } else {
      res.status(400).json(err);
    }
  })
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));