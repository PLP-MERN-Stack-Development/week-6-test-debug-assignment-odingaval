const postsController = require('../../src/controllers/postsController');
const Post = require('../../src/models/Post');

jest.mock('../../src/models/Post');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

describe('postsController', () => {
  describe('createPost', () => {
    it('should return 400 if title is missing', async () => {
      const req = { body: { content: 'test', category: 'cat' }, user: { _id: 'u1' } };
      const res = mockRes();
      await postsController.createPost(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Title is required' });
    });
    it('should create and return a post', async () => {
      const req = { body: { title: 'T', content: 'C', category: 'cat' }, user: { _id: 'u1' } };
      const res = mockRes();
      Post.create.mockResolvedValue({ _id: 'p1', ...req.body, author: 'u1', slug: 't' });
      await postsController.createPost(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'T', author: 'u1' }));
    });
  });

  describe('getAllPosts', () => {
    it('should return posts', async () => {
      const req = { query: {} };
      const res = mockRes();
      Post.find.mockReturnValue({ skip: () => ({ limit: jest.fn().mockResolvedValue(['p1', 'p2']) }) });
      await postsController.getAllPosts(req, res, jest.fn());
      expect(res.json).toHaveBeenCalledWith(['p1', 'p2']);
    });
  });

  describe('getPostById', () => {
    it('should return 404 if not found', async () => {
      const req = { params: { id: 'notfound' } };
      const res = mockRes();
      Post.findById.mockResolvedValue(null);
      await postsController.getPostById(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.end).toHaveBeenCalled();
    });
    it('should return post if found', async () => {
      const req = { params: { id: 'p1' } };
      const res = mockRes();
      Post.findById.mockResolvedValue({ _id: 'p1', title: 'T' });
      await postsController.getPostById(req, res, jest.fn());
      expect(res.json).toHaveBeenCalledWith({ _id: 'p1', title: 'T' });
    });
  });

  describe('updatePost', () => {
    it('should return 404 if not found', async () => {
      const req = { params: { id: 'notfound' }, user: { _id: 'u1' }, body: {} };
      const res = mockRes();
      Post.findById.mockResolvedValue(null);
      await postsController.updatePost(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.end).toHaveBeenCalled();
    });
    it('should return 403 if not author', async () => {
      const req = { params: { id: 'p1' }, user: { _id: 'u1' }, body: {} };
      const res = mockRes();
      Post.findById.mockResolvedValue({ _id: 'p1', author: 'u2', save: jest.fn() });
      await postsController.updatePost(req, res, jest.fn());
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.end).toHaveBeenCalled();
    });
    it('should update and return post if author', async () => {
      const req = { params: { id: 'p1' }, user: { _id: 'u1' }, body: { title: 'New' } };
      const res = mockRes();
      const post = { _id: 'p1', author: 'u1', save: jest.fn(), ...req.body };
      Post.findById.mockResolvedValue(post);
      await postsController.updatePost(req, res, jest.fn());
      expect(post.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'New' }));
    });
  });
}); 