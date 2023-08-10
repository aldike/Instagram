const Post = require('./models/Post')
const MediaFile = require('./models/MediaFile');
const Story = require('./models/Story')
const Commentary = require('./models/Commentary');
const User = require('../auth/User');
const { Op } = require('sequelize');

const createPost = async (req, res) => {
  try {
    const creatorId = req.user.id; // Use "creatorId" instead of "userId"
    const { description, media} = req.body;

    const post = await Post.create({
      creatorId: creatorId,
      description: description,
    });
    await MediaFile.create({
      postId: post.id,
      link: media,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const myPosts = await Post.findAll({ where: { creatorId: req.user.id } });
    res.status(200).send(myPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get posts' });
  }
};

const getAllPosts = async (req, res) =>{
  try {
    const posts = await Post.findAll()
    res.status(200).send(posts)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getPost = async (req, res) =>{
  try {
    const post = await Post.findByPk(req.params.id)
    res.status(200).send(post)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deletePost = async (req, res) =>{
  try {
    const data = await Post.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).end()
  } catch (error) {
    res.status(500).send(error)
  }
}

const editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { description, media } = req.body;

    await Post.update(
      {
        description: description,
        media: media,
      },
      {
        where: {
          id: postId,
        },
      }
    );

    const mediaFile = await MediaFile.findOne({ where: { postId: postId } });
    if (mediaFile) {
      await MediaFile.update(
        {
          link: media,
        },
        {
          where: {
            postId: postId,
          },
        }
      );
    }

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

const createStory = async (req, res) => {
  try {
    const creatorId = req.user.id;
    const { title, media} = req.body;

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const story = await Story.create({
      creatorId: creatorId,
      title: title,
      expiresAt: expiresAt,
    });

    await MediaFile.create({
      storyId: story.id,
      link: media,
    });

    res.status(201).json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create story' });
  }
};
const deleteStory = async (req, res) =>{
  try {
    const data = await Story.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).end()
  } catch (error) {
    res.status(500).send(error)
  }
}

const getUserStories = async (req, res) => {
  try {
    const userStories = await Story.findAll({
      where: {
        creatorId: req.params.id,
        expiresAt: {
          [Op.gt]: new Date()
        }
      }
    });
    const storyIds = userStories.map(story => story.id);
    const userStoryMedia = await MediaFile.findAll({ where: { storyId: storyIds } });

    const storiesWithMediaLinks = userStories.map(story => {
      return {
        ...story.toJSON(),
        mediaLinks: userStoryMedia.filter(media => media.storyId === story.id).map(media => media.link)
      };
    });

    res.status(200).json(storiesWithMediaLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get users stories' });
  }
};

const writeCommentary = async (req, res) => {
  try {
    const authorId = req.user.id;
    const {commentary} = req.body;

    const comment = await Commentary.create({
      authorId: authorId,
      commentary: commentary,
      postId: req.params.id
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to write commentary' });
  }
};
const deleteCommentary = async (req, res) =>{
  try {
    const data = await Commentary.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).end()
  } catch (error) {
    res.status(500).send(error)
  }
}

const getCommentsByPostId = async (req, res) =>{
  try {
    const post = await Post.findByPk(req.params.id)
    const comments = await Commentary.findAll({where: {postId: post.id}})
    res.status(200).send(comments)
  } catch (error) {
    res.status(500).send(error)
  }
}
const getPostsByUsername = async (req, res) =>{
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    if(!user) res.status(201).send({message: "User with that username is not exist"})
    else{
      const posts = await Post.findAll({
        where: {
          creatorId: user.id
        }
      })
      if(posts.length > 0) res.status(200).send(posts)
      
      else res.status(201).send({message: "User didn't post anything yet"})
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
    createPost,
    getMyPosts,
    getAllPosts,
    getPost,
    deletePost,
    editPost,
    createStory,
    deleteStory,
    getUserStories,
    writeCommentary,
    deleteCommentary,
    getCommentsByPostId,
    getPostsByUsername
}