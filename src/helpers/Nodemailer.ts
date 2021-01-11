import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { AxiosResponse } from 'axios';
import { createEmail } from '../utils/emailTemplate';
import agencies from '../utils/agencies';
import appoitmentsTypes from '../utils/appoitmentsTypes';
import { EmailData } from '../utils/types';
import { AGENCY_CODE, END_DATE, START_DATE, APPOINTMENT_TYPE_CODE } from '../config';

dotenv.config();
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_EMAIL_PASS = process.env.SENDER_EMAIL_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_EMAIL_PASS
    }
  });

export const proccesResponse = async (interval: NodeJS.Timeout, response:  AxiosResponse<any> ) => {
  let send = false;
  const emailData: EmailData = { agency: '', date: ''}
  const agency = agencies.find(agency=> agency.code === AGENCY_CODE);
  const appoitmentType = appoitmentsTypes.find(agency=> agency.code === APPOINTMENT_TYPE_CODE);
    console.log(`Request at: ${new Date()}`);
    console.log(`Agency: ${agency?.text}`);
    console.log(`Appointment type: ${appoitmentType?.name}`);
    console.log(`Appoitments avaiable between ${START_DATE} and ${END_DATE} -> ${response.data.length}`)
    if (response.data.length > 0){
      clearInterval(interval);
      send = true
      emailData.agency = agency?.text || ''
      emailData.date = `${START_DATE} - ${END_DATE}`;
    }
  if(send) await sendEmail(emailData);
  console.log('-------------------------------');
};

const sendEmail = async (emailData: any) => {
    console.log('Sending email...')
    const res = await transporter.sendMail({
        from: SENDER_EMAIL,
        to: RECEIVER_EMAIL,
        subject: 'MIGRATIONSVERKET APPOINTMENT AVAILABLE!',
        html: createEmail(emailData),
        priority: 'high'
    });
    console.log("Message sent: %s", res.messageId);
}
  export default transporter;