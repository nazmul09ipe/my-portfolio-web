import { Message } from '../models/Message.js';
import { ApiError } from '../utils/ApiError.js';
import { dbConnected } from '../config/db.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await sendEmail({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to send email',
    });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    next(err);
  }
};

export const markMessageRead = async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!doc) throw new ApiError(404, 'Message not found');
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndDelete(req.params.id);
    if (!doc) throw new ApiError(404, 'Message not found');
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
};
