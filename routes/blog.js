'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

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

module.exports = router;
