var express = require('express');
var router = express.Router();

// Require controller modules.
var blog_controller = require('../controllers/blogController');

/// blog ROUTES ///

// GET all blogs for home page.
router.get('/', blog_controller.blog_list);

// GET specific blog by id
router.get('/:id', blog_controller.blog_get);

// POST create comment and attach to specific blog
router.post('/:id', blog_controller.comment_post);

module.exports = router;
