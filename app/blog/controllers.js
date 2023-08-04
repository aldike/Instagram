const Post = require('./models/Post')
const MediaFile = require('./models/MediaFile');
const Story = require('./models/Story')
const createPost = async (req, res) => {
  try {
    const creatorId = req.user.id; // Use "creatorId" instead of "userId"
    const { description, media} = req.body;

    const post = await Post.create({
      creatorId: creatorId,
      description: description,
    });

    // Create MediaFile entry for the newly created Post
    await MediaFile.create({
      postId: post.id,
      link: media, // You can use the 'media' value as the link, adjust if needed
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
  const posts = await Post.findAll()
  res.status(200).send(posts)
}

const getPost = async (req, res) =>{
    const post = await Post.findByPk(req.params.id)
    res.status(200).send(post)
}

const deletePost = async (req, res) =>{
    const data = await Post.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).end()
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

    // Calculate the expiration time (24 hours from now)
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
  const data = await Story.destroy({
      where: {
          id: req.params.id
      }
  })
  res.status(200).end()
}

const getUserStories = async (req, res) => {
  try {
    const userStories = await Story.findAll({ where: { creatorId: req.params.id } });
    
    // Create an array of storyIds from the userStories array
    const storyIds = userStories.map(story => story.id);

    // Use the array of storyIds in the query to get the corresponding media files
    const userStoryMedia = await MediaFile.findAll({ where: { storyId: storyIds } });
    res.status(200).json({ userStories, userStoryMedia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get users stories' });
  }
};

module.exports = {
    createPost,
    getMyPosts,
    getAllPosts,
    getPost,
    deletePost,
    editPost,
    createStory,
    deleteStory,
    getUserStories
}