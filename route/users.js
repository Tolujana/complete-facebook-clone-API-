const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const { findById } = require("../models/User");
const User = require("../models/User");

//get a user
router.get("/", async (req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  try {
    const user = userId ? await User.findById(userId) : await User.findOne({ username: username });
    // console.log(user);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get friends

router.get("/friend/:id", async (req, res) => {
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

// get friendrequest

router.get("/friendrequests/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const friendRequests = user.friendRequest;
    res.status(200).json(friendRequests);
  } catch (error) {
    console.log(error);
  }
});

//confirm friends

router.put("/:id/friend", async (req, res) => {
  const currentUser = req.body.userId;
  const user = req.params.id;
  if (currentUser !== user) {
    try {
      const userDetails = await User.findById(req.params.id);
      const currentUserDetails = await User.findById(req.body.userId);
      if (!currentUserDetails.friends.includes(req.params.id)) {
        await currentUserDetails.updateOne({ $push: { friends: req.params.id } });
        res.status(200).json(currentUserDetails.friends);
        await userDetails.updateOne({ $push: { friends: req.body.userId } });
      } else {
        res.status(200).json(currentUserDetails.friends);
      }
    } catch (error) {}
  } else {
    res.status(403).json("you cannot follow yourself");
  }
});
//unfriend

router.put("/:id/unfriend", async (req, res) => {
  const currentUser = req.body.id;
  const user = req.params.id;
  if (currentUser !== user) {
    try {
      const userDetails = await User.findById(user);
      const currentUserDetails = await User.findById(currentUser);
      if (currentUserDetails.friends.includes(user)) {
        await currentUserDetails.updateOne({ $pull: { friends: user } });
        res.status(200).json("no longer friends ");
        await userDetails.updateOne({ $pull: { friends: currentUser } });
      } else {
        res.status(200).json("already a friends");
      }
    } catch (error) {}
  } else {
    res.status(403).json("you cannot follow yourself");
  }
});

//unfollow

router.put("/:id/unfollow", async (req, res) => {
  const currentUser = req.body.userId;
  const user = req.params.id;
  if (req.body.userId !== req.params.id) {
    try {
      const user2 = await User.findById(req.params.id);
      const currentUser2 = await User.findById(req.body.userId);
      if (user2.followers.includes(req.params.id)) {
        await user2.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser2.updateOne({ $pull: { following: req.params.id } });

        res.status(200).json("user has been unfollowed succesful ");
      } else {
        res.status(403).json("you already unfollowed user ");
      }
    } catch (error) {}
  } else {
    res.status(403).json("you cannot follow yourself");
  }
});

//send or cancel friend request

router.put("/:id/request", async (req, res) => {
  if (req.params.id !== req.body.id) {
    try {
      const currentUser = await User.findById(req.body.id);
      const user = await User.findById(req.params.id);
      if (!user.friendRequest.includes(req.body.id)) {
        await user.updateOne({
          $push: { friendRequest: req.body.id },
        });
        res.status(200).json("Cancel Request");
        // await currentUser.updateOne({
        //   $push: { sentRequest: req.params.id },
        // });
      } else {
        await user.updateOne({ $pull: { friendRequest: req.body.id } });
        res.status(200).json("Add friend");
        await currentUser.updateOne({ $pull: { sentRequest: req.params.id } });
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you cannot friend yoursel");
  }
});

//updated friendRequest
router.put("/:id/requests", async (req, res) => {
  if (req.params.id !== req.body.id) {
    try {
      const user = await User.findById(req.body.id);
      const currentUser = await User.findById(req.params.id);

      const hasUserId = currentUser.friendRequest.some((request) => request.id === req.body.id);
      if (!hasUserId) {
        await currentUser.updateOne({
          $push: { friendRequest: req.body },
        });
        res.status(200).json("Cancel Request");
        // await currentUser.updateOne({
        //   $push: { sentRequest: req.params.id },
        // });
      } else {
        await currentUser.updateOne({ $pull: { friendRequest: req.body } });
        res.status(200).json("Add friend");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you cannot friend yoursel");
  }
});
// cancel Friend request by reciever

router.put("/:id/cancelrequest", async (req, res) => {
  if (req.params.id !== req.body.id) {
    try {
      const currentUser = await User.findById(req.body.id);
      //const user = await User.findById(req.params.id);
      if (currentUser.friendRequest.includes(req.params.id)) {
        await currentUser.updateOne({
          $pull: { friendRequest: req.params.id },
        });
        res.status(200).json(currentUser.friendRequest);
      } else {
        res.status(200).json("no friend request sent ");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you cannot friend yoursel");
  }
});

// delete a user

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.body.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json("Account has been deleted");
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you can only delete your account");
  }
});

//update user

router.put("/:id/update", async (req, res) => {
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
      console.log("test");
    } catch (e) {
      console.error(e.message);
    }
  }
});

//update profile picture

router.put("/:id/updatepics", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);

    await currentUser.updateOne({
      $set: { profilePicture: req.body.profilePicture },
    });
    res.status(200).json("profile updated");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

{
  $set: {
    stringValue: "New Value";
  }
}

//add story

router.put("/story", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);

    await currentUser.updateOne({
      $push: { story: req.body.file },
    });
    res.status(200).json("story  uploaded");
    // await currentUser.updateOne({
    //   $push: { sentRequest: req.params.id },
    // });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
