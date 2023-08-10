const Like = require('./Like')

const likePost = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        postId: req.params.id
      },
    });
    if (existingLike) {
      return res.status(409).json({ message: 'Post is already liked' });
    }
    await Like.create({
      userId: req.user.id,
      postId: req.params.id
    });
    res.status(201).json({ message: 'Post with that Id is successfully liked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like Post' });
  }
};
const unlikePost = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        postId: req.params.id
      },
    });
    if (!existingLike) {
      return res.status(409).json({ message: 'Post is not liked yet' });
    }
    await existingLike.destroy();

    res.status(201).json({ message: 'Post with that Id is successfully unliked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to unlike Post' });
  }
};
const likeComment = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        commentaryId: req.params.id
      },
    });
    if (existingLike) {
      return res.status(409).json({ message: 'Commentary is already liked' });
    }
    await Like.create({
      userId: req.user.id,
      commentaryId: req.params.id
    });
    res.status(201).json({ message: 'Commentary with that Id is successfully liked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like Commentary' });
  }
};
const unlikeComment = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        commentaryId: req.params.id
      },
    });
    if (!existingLike) {
      return res.status(409).json({ message: 'Commentary is not liked yet' });
    }
    await existingLike.destroy();

    res.status(201).json({ message: 'Commentary with that Id is successfully unliked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to unlike Commentary' });
  }
};
const likeStory = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        storyId: req.params.id
      },
    });
    if (existingLike) {
      return res.status(409).json({ message: 'Story is already liked' });
    }
    await Like.create({
      userId: req.user.id,
      storyId: req.params.id
    });
    res.status(201).json({ message: 'Story with that Id is successfully liked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like Story' });
  }
};
const unlikeStory = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        storyId: req.params.id
      },
    });
    if (!existingLike) {
      return res.status(409).json({ message: 'Story is not liked yet' });
    }
    await existingLike.destroy();

    res.status(201).json({ message: 'Story with that Id is successfully unliked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to unlike Story' });
  }
};
module.exports = {
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
  likeStory,
  unlikeStory
}