'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// starts an instance of router for the route
const router = express.Router();

router.get('/api/blog', (req, res, next) => {
    console.log('Working!');
});

module.exports = router;
