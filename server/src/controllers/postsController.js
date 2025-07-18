const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    console.log('DEBUG: Entered createPost with body:', req.body);
    const { title, content, category } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const post = await Post.create({
      title,
      content,
      category,
      author: req.user._id,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
    });
    res.status(201).json(post);
  } catch (err) { next(err); }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    console.log('DEBUG: getAllPosts query:', req.query);
    const { category, page = 1, limit = 10 } = req.query;
    const filter = category ? { category } : {};
    const posts = await Post.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(posts);
  } catch (err) { next(err); }
};

exports.getPostById = async (req, res, next) => {
  try {
    console.log('DEBUG: getPostById id:', req.params.id);
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).end();
    res.json(post);
  } catch (err) { next(err); }
};

exports.updatePost = async (req, res, next) => {
  try {
    console.log('DEBUG: updatePost id:', req.params.id, 'body:', req.body);
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).end();
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).end();
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) { next(err); }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).end();
    if (!req.user) return res.status(401).end();
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).end();
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) { next(err); }
}; 