var express = require('express');
var router = express.Router();

// Require controller modules.
var admin_controller = require('../controllers/adminController');

/// admin ROUTES ///

// GET all blogs for admin home page.
router.get('/', admin_controller.blog_list);

// GET request for creating a new blog
router.get('/create', admin_controller.blog_create_get);

// POST request for creating a new blog
router.post('/create', admin_controller.blog_create_post);

// GET specific blog
router.get('/:id', admin_controller.blog_get);

// GET request for editing a blog
router.get('/edit/:id', admin_controller.blog_edit_get);

// PUT request for editing a blog
router.put('/edit/:id', admin_controller.blog_edit_put);

// GET request for deleting a blog
router.get('/delete/:id', admin_controller.blog_delete_get);

// DELETE a blog
router.delete('/delete/:id', admin_controller.blog_delete_delete);

// DELETE a comment - no GET required, the comment will be removed with no confirmation
router.delete('/comment/:id', admin_controller.comment_delete);

module.exports = router;
