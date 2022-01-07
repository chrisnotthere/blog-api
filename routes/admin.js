var express = require('express');
var router = express.Router();

//passport stuff
const passport = require("passport");
const jwtStrategry  = require("../config/jwt")
passport.use(jwtStrategry);

// Require controller modules.
var admin_controller = require('../controllers/adminController');

/// admin ROUTES ///

// GET all blogs for admin home page.
router.get('/', admin_controller.blog_list);

// GET request for admin login
router.get('/login', admin_controller.login_get);

// POST request for admin login
router.post('/login', admin_controller.login_post);

// GET request for creating a new blog - protected
router.get("/create", passport.authenticate('jwt', { session: false }), admin_controller.blog_create_get);

// POST request for creating a new blog
router.post('/create', passport.authenticate('jwt', { session: false }), admin_controller.blog_create_post);

// GET request for editing a blog
router.get('/edit/:id',passport.authenticate('jwt', { session: false }),  admin_controller.blog_edit_get);

// PUT request for editing a blog
router.put('/edit/:id',passport.authenticate('jwt', { session: false }),  admin_controller.blog_edit_put);

// GET request for deleting a blog
router.get('/delete/:id', passport.authenticate('jwt', { session: false }), admin_controller.blog_delete_get);

// DELETE a blog
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), admin_controller.blog_delete_delete);

// DELETE a comment 
router.delete('/comment/:postid/:commentid', passport.authenticate('jwt', { session: false }), (admin_controller.comment_delete));

// GET specific blog
router.get('/:id', admin_controller.blog_get);

module.exports = router;
