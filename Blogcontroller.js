const blogService = require('../services/Blogservice');


const getAllBlogs = async (req, res) => {
  const blogs = await blogService.getAllBlogs();
  res.json(blogs);
};


const getBlogById = async (req, res) => {
  const blog = await blogService.getBlogById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
};


const createBlog = async (req, res) => {
  const { title, content, category } = req.body;
  const blog = await blogService.createBlog({
    title,
    content,
    category,
    author: req.user.id,
  });

  res.status(201).json({ message: 'Blog created', blog });
};


const updateBlog = async (req, res) => {
  const blog = await blogService.updateBlog(req.params.id, req.body);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  res.json({ message: 'Blog updated', blog });
};


const deleteBlog = async (req, res) => {
  const result = await blogService.deleteBlog(req.params.id);
  if (!result) return res.status(404).json({ message: 'Blog not found' });

  res.json({ message: 'Blog deleted' });
};


const getBlogsByCategory = async (req, res) => {
  const blogs = await blogService.getBlogsByCategory(req.params.categoryId);
  res.json(blogs);
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
};
