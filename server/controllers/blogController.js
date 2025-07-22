const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// Get single blog by ID (Public)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// --- CREATE a blog post (Robust Version) ---
exports.createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, authorName, authorLinkedin } = req.body;
    if (!title || !content || !excerpt || !authorName) {
        return res.status(400).json({ message: 'Title, content, excerpt, and author name are required.' });
    }
    if (!req.file) {
        return res.status(400).json({ message: 'A feature image is required.' });
    }
    const newBlog = new Blog({ title, content, excerpt, authorName, authorLinkedin, imageUrl: req.file.path });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// --- UPDATE a blog post (Robust Version) ---
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, authorName, authorLinkedin } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    
    if(title) blog.title = title;
    if(content) blog.content = content;
    if(excerpt) blog.excerpt = excerpt;
    if(authorName) blog.authorName = authorName;
    if(authorLinkedin) blog.authorLinkedin = authorLinkedin;

    if (req.file) {
        blog.imageUrl = req.file.path;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: 'Server Error' + error.message });
  }
};

// Delete a blog (Protected)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id); // More efficient
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post removed' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};