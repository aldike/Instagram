const Follow = require('./Follow')
const User = require('../auth/User')

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
const getFollowersByUsername = async (req, res) =>{
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    if(!user) res.status(201).send({message: "User with that username is not exist"})
    else{
      const followers = await Follow.findAll({
        where: {
          followedByUserId: user.id
        }
      })
      if(followers.length > 0) res.status(200).send(followers)
      
      else res.status(201).send({message: "User has not any followers yet"})
    }
  } catch (error) {
    res.status(500).send(error)
  }
}
const getFollowsByUsername = async (req, res) =>{
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    if(!user) res.status(201).send({message: "User with that username is not exist"})
    else{
      const follows = await Follow.findAll({
        where: {
          followingUserId: user.id
        }
      })
      if(follows.length > 0) res.status(200).send(follows)
      
      else res.status(201).send({message: "User has not any followers yet"})
    }
  } catch (error) {
    res.status(500).send(error)
  }
}
const getUserInfoByUsername = async (req, res) =>{
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    if(!user) res.status(201).send({message: "User with that username is not exist"})
    else res.status(200).send({full_name : user.full_name, email: user.email, phone: user.phone})
  } catch (error) {
    res.status(500).send(error)
  }
}
module.exports = {
  followUser,
  unFollowUser,
  getFollowersByUsername,
  getFollowsByUsername,
  getUserInfoByUsername
}