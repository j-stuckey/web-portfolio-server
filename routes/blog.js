'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment');

const Blog = require('../models/blog');

// starts an instance of router for the route
const router = express.Router();

router.get('/', (req, res, next) => {
    Blog.find()
        .then(results => {
            res.json(results);
        })
        .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    const post = req.body;
    post.posted = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    Blog.create(post)
        .then(results => {
            res.json(results);
        })
        .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    Blog.findByIdAndRemove(id)
        .then(result => {
            console.log(result);
            res.location(`${req.originalUrl}/${result.id}`)
                .status(201)
                .json(result);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
});

module.exports = router;
