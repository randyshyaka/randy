const Blog = require('../models/BlogModel');


const ownerOrAdmin = (req, res, next) => {
  const userId = req.user.id;
  const isAdmin = req.user.role === 'admin';
  const isOwner = req.params.id === userId;

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};

const blogOwnerOrAdmin = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwner = blog.author.toString() === req.user.id;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  ownerOrAdmin,
  blogOwnerOrAdmin,
};
