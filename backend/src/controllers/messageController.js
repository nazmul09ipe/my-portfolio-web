import { Message } from '../models/Message.js';
import { ApiError } from '../utils/ApiError.js';
import { dbConnected } from '../config/db.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Save to database first (so it's never lost)
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    // 2. Try to send email notification
    // We don't necessarily want to block the response if email fails, 
    // but the user wants it fully functional, so we'll try-catch specifically for email
    try {
      await sendEmail({
        name,
        email,
        subject,
        message,
      });
    } catch (emailError) {
      console.error('Database saved, but email notification failed:', emailError);
      // We still return 201 because the message IS saved in the DB
    }

    res.status(201).json({
      success: true,
      message: 'Message received successfully',
      data: newMessage,
    });
  } catch (error) {
    next(error);
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
