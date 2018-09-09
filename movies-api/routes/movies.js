'use strict'

const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');

const Movie = require('../models/movie')

/* GET home page. */
router.get('/', (req, res, next) => {
  Movie.find({})
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});


router.post('/', (req, res, next) => {
  const title = req.body.title;
  const year = Number(req.body.year);
  const posterUrl = req.body.posterUrl;

  if (!title || !year || !posterUrl) {
    return res.status(422).json({ code: 'Unprocessable-entity' });
  }

  //check if the name is already in use
  // Movie.findOne({title: title})
  // .then(result => {
  //   if (result) {
  //     return res.status(401).json({code: 'tite already in use'});
  //   }
  // })

  const newMovie = new Movie({ title, year, posterUrl });

  newMovie.save()
    .then((result) => {
      res.status(201).json({ code: "okay" }) // status 201 = created
    })
    .catch(next);
});


router.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});


router.put('/:id', (req, res, next) => {

  if (!mongooose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(422).json({code: 'unprocessale-entity'})
  }

  const newData = {
    title: req.body.title,
    posterUrl: req.body.posterUrl,
    year: req.body.year
  }

  const options = {
    new: true
  }

  //if there's no movie with this id
  Movie.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({code: 'not-found'});
      }
      
      result.title = newData.title;
      result.posterUrl = newData.posterUrl;
      result.year = newData.year;

      result.save()
        .then(() => {
          res.json(result);
        })
        .catch(next);
    })
    .catch(next);
});


router.delete('/:id', (req, res, next) => {

  if (!mongooose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(422).json({code: 'unprocessale-entity'})
  }

  Movie.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({code: 'not-found'});
      }
      
      result.remove()
        .then(() => {
          res.json(result);
        })
        .catch(next);
    })
    .catch(next);
});


// [{title: 'Infinity wars', year: 2018}];

module.exports = router;
