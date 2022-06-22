const Message = require('../models/Message');
const User = require('../models/User');
const router = require('express').Router();

// create new message

router.post('/', async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get messages
router.get('/:conversationId', async (req, res) => {
  try {
    const conversation = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500);
  }
});
module.exports = router;
