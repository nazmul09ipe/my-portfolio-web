import nodemailer from 'nodemailer';

/**
 * Sends an email using Nodemailer
 * @param {Object} options - Email options
 * @param {string} options.name - Sender name
 * @param {string} options.email - Sender email
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Email body
 */
export const sendEmail = async ({ name, email, subject, message }) => {
  // Check if email configuration is available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email configuration missing. Skipping email sending.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Message: ${subject || 'No Subject'}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Portfolio Message</h2>
        
        <div style="margin-top: 20px;">
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        </div>
        
        <div style="margin-top: 20px; background-color: #f8fafc; padding: 15px; border-radius: 6px;">
          <p style="margin-top: 0; font-weight: bold; color: #64748b;">Message:</p>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center;">
          <p>Sent from your Portfolio Website</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Nodemailer Error:', error);
    throw new Error('Failed to send email notification');
  }
};