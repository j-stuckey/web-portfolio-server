'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const authRouter = require('./routes/auth');
const blogsRouter = require('./routes/blog');

const app = express();

app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
        skip: (req, res) => process.env.NODE_ENV === 'test'
    })
);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

// parses the request body
app.use(express.json());

// Configures passport to use the strategies
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/auth', authRouter);
app.use('/api/blog', blogsRouter);

// 404 Handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Custom Error Handler
app.use((err, req, res, next) => {
    // console.log(err);
    if (err.status) {
        const errBody = Object.assign({}, err, { message: err.message });
        res.status(err.status).json(errBody);
    } else {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}

if (require.main === module) {
    dbConnect();
    runServer();
}

module.exports = { app };
