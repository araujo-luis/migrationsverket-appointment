import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { AxiosResponse } from 'axios';
import { createEmail } from '../utils/emailTemplate';
import agencies from '../utils/agencies';
import { EmailData } from '../utils/types';

dotenv.config();
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_EMAIL_PASS = process.env.SENDER_EMAIL_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL
const AGENCY_CODE = process.env.AGENCY_CODE;
const days = process.env.SEARCH_DAYS?.split(',');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_EMAIL_PASS
    }
  });

export const proccesRequests = (interval: NodeJS.Timeout) => (async (requests:  AxiosResponse<any>[] ) => {
  let send = false;
  const emailData: EmailData = { agency: '', date: ''}
  requests.forEach((response, index) => { 
    console.log(days?.[index] + ' -> ' + response.data)
    if (response.data > 0){
      send = true
      emailData.agency = agencies.find(agency=> agency.code === AGENCY_CODE)?.text || ''
      emailData.date = days?.[index] || '';
      clearInterval(interval);
    }
  });
  if(send) await sendEmail(emailData);
  console.log('-------------------------------');
});

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