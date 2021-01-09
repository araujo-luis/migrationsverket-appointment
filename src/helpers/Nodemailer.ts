import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { AxiosResponse } from 'axios';
import { createEmail } from '../utils/emailTemplate';
import agencies from '../utils/agencies';
import { EmailData } from '../utils/types';

dotenv.config();
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER;
const EMAIL_PROVIDER_PASS = process.env.EMAIL_PROVIDER_PASS;
const AGENCY_CODE = process.env.AGENCY_CODE;
const days = process.env.SEARCH_DAYS?.split(',');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: EMAIL_PROVIDER,
      pass: EMAIL_PROVIDER_PASS
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
        from: process.env.EMAIL_PROVIDER,
        to: process.env.EMAIL_RECEIVER,
        subject: 'MIGRATIONSVERKET APPOITMENT AVAILABLE!',
        html: createEmail(emailData),
        priority: 'high'
    });
    console.log("Message sent: %s", res.messageId);
}
  export default transporter;