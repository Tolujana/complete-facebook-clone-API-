const Post = require("../models/Post");
const User = require("../models/User");
const router = require("express").Router();

// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {}
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // const user = await User.findbyId(post.userId);
    if (post.userId == req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated");
    } else {
      res.status(500).json("you can update only your post");
    }
  } catch (error) {
    res.status(403).json(error);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // const user = await User.findbyId(post.userId);
    if (post.userId == req.body.userId) {
      await post.deleteOne();
      res.status(200).json("post deleted");
    } else {
      res.status(500).json("you can delete only your post");
    }
  } catch (error) {
    res.status(403).json(error);
  }
});

// like a post and dislike
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });

      res.status(200).json("post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post has been dislike");
    }
  } catch (error) {
    res.status(403).json(error);
  }
});
// add comments
router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = req.body.comment;
    //const comment = JSON.parse(req.body.comment);

    await post.updateOne({
      $push: {
        comment: { $each: comment },
      },
    });

    res.status(200).json("post commented");
  } catch (error) {
    res.status(403).json(error.message);
  }
});

// friends post

router.get("/timeline/:id", async (req, res) => {
  let postArray = [];
  const offset = req.query.offset;
  try {
    const currentUser = await User.findById(req.params.id);
    const { following, friends, _id } = currentUser;

    const postUserId = [...friends, _id];

    const posts = await Post.find({ userId: { $in: postUserId } })
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(4);

    res.json(posts);
  } catch (error) {
    res.status(500).json("errror occured loading timeline post");
  }
});

//get timeline post (user post and friends post )
router.get("/timelinepost/:id", async (req, res) => {
  let postArray = [];
  const offset = req.query.offset;
  try {
    const currentUser = await User.findById(req.params.id);
    const userPost = await Post.find({ userId: currentUser._id })
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(2);

    const dateOfLastPost = userPost.at(-1).updatedAt;

    const friendPost = await Promise.all(
      currentUser?.friends.map((friendId) => {
        return Post.find({ userId: friendId }).where("updatedAt").gte(dateOfLastPost);
      })
    );

    res.json(userPost.concat(...friendPost));
  } catch (error) {
    res.status(500).json("error occured loading post");
  }
});

//get user post
router.get("/profile/:username", async (req, res) => {
  //let postArray = [];
  const offset = req.query.offset;
  try {
    const user = await User.findOne({ username: req.params.username });
    const userPost = await Post.find({ userId: user._id })
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(3);

    res.status(200).json(userPost);
    // res.json(userPost);
  } catch (error) {}
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("post like that does not exist");
  }
});
module.exports = router;
