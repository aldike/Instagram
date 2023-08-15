const Like = require('./Like')

const likeUnlikePost = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        postId: req.params.id
      },
    });
    if (existingLike) {
      await existingLike.destroy();
      res.status(201).json({ message: 'Post with that Id is successfully unliked' });
    }else{
      await Like.create({
        userId: req.user.id,
        postId: req.params.id
      });
      res.status(201).json({ message: 'Post with that Id is successfully liked' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like Post' });
  }
};

const likeUnlikeComment = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        commentaryId: req.params.id
      },
    });
    if (existingLike) {
      await existingLike.destroy();
      res.status(201).json({ message: 'Commentary with that Id is successfully unliked' });
    }else{
      await Like.create({
        userId: req.user.id,
        commentaryId: req.params.id
      });
      res.status(201).json({ message: 'Commentary with that Id is successfully liked' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like Commentary' });
  }
};

const likeUnlikeStory = async (req, res) => {
  try {
    const existingLike = await Like.findOne({
      where: {
        userId: req.user.id,
        storyId: req.params.id
      },
    });
    if (existingLike) {
      await existingLike.destroy();
      res.status(201).json({ message: 'Story with that Id is successfully unliked' });
    }else{
      await Like.create({
        userId: req.user.id,
        storyId: req.params.id
      });
      res.status(201).json({ message: 'Story with that Id is successfully liked' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like Story' });
  }
};

module.exports = {
  likeUnlikePost,
  likeUnlikeComment,
  likeUnlikeStory
}