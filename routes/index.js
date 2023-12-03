const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const signoutRouter = require('./signout');
const auth = require('../middlewares/auth');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/signout', signoutRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
