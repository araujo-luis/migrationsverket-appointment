import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER;
const EMAIL_PROVIDER_PASS = process.env.EMAIL_PROVIDER_PASS;

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: EMAIL_PROVIDER,
      pass: EMAIL_PROVIDER_PASS
    }
  });

  export default transporter;