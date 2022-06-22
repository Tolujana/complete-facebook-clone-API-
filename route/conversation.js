const Conversation = require('../models/Conversation');
const User = require('../models/User');
const router = require('express').Router();

// create conversation

router.post('/', async (req, res) => {
  try {
    const conversation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//Get converation of a suser

router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      $in: { message: req.params.userId },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
