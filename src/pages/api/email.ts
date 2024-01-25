import type { NextApiRequest, NextApiResponse } from 'next/types';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    host: "mail.virtualeternity.cl",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  if (req.method === 'POST') {
    const email = req.body.to;

    let subjectLine = '';
    let htmlContent = '';

    if (req.body.contentType === 'video') {
      subjectLine = `${req.body.name} te ha enviado un video titulado ${req.body.subject}`;
      htmlContent = `${req.body.name} te ha enviado un video titulado ${req.body.subject} <br> <a href="${req.body.downloadUrl}">Ver video</a>`;
    } else {
      subjectLine = `${req.body.name} te ha enviado un documento titulado ${req.body.subject}`;
      htmlContent = `${req.body.name} te ha enviado un documento titulado ${req.body.subject} <br> <a href="${req.body.downloadUrl}">Ver documento</a>`;
    }

    const mailOptions = {
      from: '"Virtual Eternity" <noreply@virtualeternity.cl>',
      to: email,
      subject: subjectLine,
      text: req.body.text,
      html: `
      <img src="https://firebasestorage.googleapis.com/v0/b/virtual-c312e.appspot.com/o/public%2Fabove%20text%20copy.png?alt=media&token=97b8d649-d7b5-4a0d-9b69-78c283d5537f" alt="Virtual Eternity Logo" style="display: block; margin: 0 auto; width: 800px;">
      <div style="background-color: #f7f7f7; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #444444;">
          ${htmlContent}
        </div>
        <img src="https://firebasestorage.googleapis.com/v0/b/virtual-c312e.appspot.com/o/public%2Funder%20text.png?alt=media&token=fcb5e9a7-1423-40c9-81c0-e7acf5e24316" alt="Virtual Eternity Logo" style="display: block; margin: 0 auto; height: 500px;">
      </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
