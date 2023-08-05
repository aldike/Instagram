const Follow = require('./Follow')

const followUser = async (req, res) => {
  try {
    const followingUserId = req.user.id;
    const followedByUserId = req.params.id;

    const existingFollow = await Follow.findOne({
      where: {
        followingUserId: followingUserId,
        followedByUserId: followedByUserId,
      },
    });

    if (existingFollow) {
      return res.status(409).json({ error: 'User is already followed' });
    }

    await Follow.create({
      followingUserId: followingUserId,
      followedByUserId: followedByUserId,
    });

    res.status(201).json({ message: 'User with that Id is successfully followed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to follow User' });
  }
};

const unFollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followedId = req.params.id;

    const followRelationship = await Follow.findOne({
      where: {
        followingUserId: followerId,
        followedByUserId: followedId,
      },
    });

    if (followRelationship) {
      await followRelationship.destroy();
      res.status(200).json({ message: 'User successfully unfollowed' });
    } else {
      res.status(404).json({ error: 'Follow relationship not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
};


module.exports = {
  followUser,
  unFollowUser
}