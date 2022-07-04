const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const { findById } = require('../models/User');
const User = require('../models/User');

//get a user
router.get('/', async (req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    console.log(user);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get following

router.get('/friend/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.following.map((friend) => {
        return User.findById(friend);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { username, _id, profilePicture } = friend;
      friendList.push({ username, _id, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    console.log(error);
  }
});
//follow

router.put('/:id/follow', async (req, res) => {
  const currentUser = req.body.userId;
  const user = req.params.id;
  if (currentUser !== user) {
    try {
      const user2 = await User.findById(req.params.id);
      const currentUser2 = await User.findById(req.body.userId);
      if (!user2.followers.includes(req.params.id)) {
        await user2.updateOne({ $push: { followers: req.body.userId } });
        await currentUser2.updateOne({ $push: { following: req.params.id } });

        res.status(200).json('succesfully followed ');
      } else {
        res.status(403).json('notch is not good enough');
      }
    } catch (error) {}
  } else {
    res.status(403).json('you cannot follow yourself');
  }
});

//unfollow

router.put('/:id/unfollow', async (req, res) => {
  const currentUser = req.body.userId;
  const user = req.params.id;
  if (req.body.userId !== req.params.id) {
    try {
      const user2 = await User.findById(req.params.id);
      const currentUser2 = await User.findById(req.body.userId);
      if (user2.followers.includes(req.params.id)) {
        await user2.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser2.updateOne({ $pull: { following: req.params.id } });

        res.status(200).json('user has been unfollowed succesful ');
      } else {
        res.status(403).json('you already unfollowed user ');
      }
    } catch (error) {}
  } else {
    res.status(403).json('you cannot follow yourself');
  }
});
//send friend request

router.put('/:id/request', async (req, res) => {
  if (req.params.id !== req.body.id) {
    try {
      const currentUser = await User.findById(req.body.id);
      const user = await User.findById(req.params.id);
      if (!user.friendRequest.includes(req.body.id)) {
        await user.updateOne({
          $push: { friendRequest: req.body.id },
        });
        res.status(200).json("friend added");
      } else {
        await user.updateOne({ $pull: { friendRequest: req.body.id } });
        res.status(200).json('friend request cancelled');
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json('you cannot friend yoursel');
  }
});

// cancel Friend request

router.put('/:id/cancelrequest', async (req, res) => {
  if (req.params.id !== req.body.id) {
    try {
      const currentUser = await User.findById(req.body.id);
      const user = await User.findById(req.params.id);
      if (user.friendRequest.includes(req.body.id)) {
        await user.updateOne({ $pull: { friendRequest: req.body.id } });
        res.status(200).json(user);
      } else {
        res.status(200).json('Friendrequest already cancelled');
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json('you cannot friend yoursel');
  }
});

// delete a user

router.delete('/:id', async (req, res) => {
  if (req.params.id === req.body.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      console.log(user);

      res.status(200).json('Account has been deleted');
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json('you can only delete your account');
  }
});

//update user
router.put('/:id/update', async (req, res) => {
  if (req.params.id === req.body.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcryptjs.genSalt(10);
        req.body.password = await bcryptjs.hash(req.body.password, salt);
      } catch (e) {
        e.message;
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(user);
    } catch (e) {
      console.error(e.message);
    }
  }
});

module.exports = router;
