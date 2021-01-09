import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
import axios from 'axios';
import router from "./routes";
import { proccesRequests } from './helpers/Nodemailer';
dotenv.config();
const PORT: string = process.env.PORT || '4000';


const app: Application = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(bodyParser.json());

const days = process.env.SEARCH_DAYS?.split(',');
const intervalDelay = parseInt(process.env.INTERVAL_DELAY || '') || 60000;
const agencyCode = process.env.AGENCY_CODE;
const appointmentType = process.env.APPOINTMENT_TYPE_CODE;
const numberOfPeople = process.env.NUMBER_PEOPLE;

if (!(days && intervalDelay && agencyCode && appointmentType && numberOfPeople))
    throw new Error('VARIABLES INVALID. CHECK YOU ENVIRONMENT VARIABLES');

const interval = setInterval(async () => {
  const requests = days.map(day => axios.get('http://localhost:4000/migration/'+agencyCode+'/'+day+'/'+appointmentType+'/'+numberOfPeople));

  await Promise.all(requests).then(proccesRequests(interval));
  }, intervalDelay);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));