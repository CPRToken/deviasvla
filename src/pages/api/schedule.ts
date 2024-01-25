import nodemailer from 'nodemailer';
import admin from 'src/libs/firebaseAdmin';

const { Timestamp } = require('firebase-admin').firestore;

interface Schedule {
    to: string;
    name: string;
    title: string;
    description: string;
    downloadUrl: string;
    contentType: 'video' | 'document';
    docId?: string;
}


export async function sendScheduledEmails() {
    const db = admin.firestore();
    const schedulesCollection = db.collection('schedules');

    const now = Timestamp.now(); // Gets the current Timestamp
    // Filter for records that are scheduled up to the current time
    const querySnapshot = await schedulesCollection.where('scheduleDate', '<=', now).get();



    let fetchedSchedules: Schedule[] = [];


    querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.docId = doc.id;
        fetchedSchedules.push(data as Schedule);
    });




  const transporter = nodemailer.createTransport({
        host: "mail.virtualeternity.cl",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    for (const schedule of fetchedSchedules) {
        const mailOptions = {
            from: '"Virtual Eternity" <noreply@virtualeternity.cl>',
            to: schedule.to,
            subject: `${schedule.name} te ha enviado ${schedule.title},`,
            text: schedule.description,
            downloadUrl: schedule.downloadUrl,
            html: `
        <img src="https://firebasestorage.googleapis.com/v0/b/virtual-c312e.appspot.com/o/public%2Fabove%20text%20copy.png?alt=media&token=97b8d649-d7b5-4a0d-9b69-78c283d5537f" alt="Virtual Eternity Logo" style="display: block; margin: 0 auto; width: 800px;">
        <div style="background-color: #f7f7f7; padding: 20px;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #444444;">
            ${schedule.contentType === 'video' ?
                `${schedule.name} le ha enviado un video titulado ${schedule.title} con descripción ${schedule.description} <br> <a href="${schedule.downloadUrl}">Ver video</a>` :
                `${schedule.name} le ha enviado un documento titulado ${schedule.title} con descripción ${schedule.description} <br> <a href="${schedule.downloadUrl}">Ver documento</a>`
            }
          </div>
          <img src="https://firebasestorage.googleapis.com/v0/b/virtual-c312e.appspot.com/o/public%2Funder%20text.png?alt=media&token=fcb5e9a7-1423-40c9-81c0-e7acf5e24316" alt="Virtual Eternity Logo" style="display: block; margin: 0 auto; height: 500px;">
        </div>
      `
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent:', info.response);
                if (schedule.docId) {
                    await schedulesCollection.doc(schedule.docId).delete();
                } else {
                    console.error('Doc ID not found for schedule:', schedule);
                }
            }
        });
    }
}
