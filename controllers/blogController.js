const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

exports.getAllBlogs = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const query = {
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ]
  };

  try {
    const blogs = await Blog.find(query)
      .populate('author', 'username')
      .populate('category', 'name')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username')
      .populate('category', 'name')
      .populate({ path: 'comments', populate: { path: 'user', select: 'username' } });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
};

exports.createBlog = async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const blog = new Blog({
      title,
      content,
      category,
      author: req.user.id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create blog' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update blog' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete blog' });
  }
};

exports.addComment = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: 'Comment text is required' });

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const comment = new Comment({
      blog: blog._id,
      user: req.user.id,
      text
    });

    await comment.save();
    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      { $group: { _id: '$category', total: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'categoryInfo' } },
      { $unwind: '$categoryInfo' },
      { $project: { _id: 0, category: '$categoryInfo.name', total: 1 } }
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get stats' });
  }
};
