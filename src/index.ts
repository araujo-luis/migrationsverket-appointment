import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
import axios from 'axios';
import router from "./routes";
import { proccesResponse } from './helpers/Nodemailer';
import { AGENCY_CODE, APPOINTMENT_TYPE_CODE, END_DATE, NUMBER_PEOPLE, START_DATE } from './config';
dotenv.config();
const PORT: string = process.env.PORT || '4000';


const app: Application = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(bodyParser.json());

const days = process.env.SEARCH_DAYS?.split(',');
const intervalDelay = parseInt(process.env.INTERVAL_DELAY || '') || 60000;


const interval = setInterval(async () => {
  const request = `http://localhost:4000/migration/${AGENCY_CODE}/${START_DATE}/${END_DATE}/${APPOINTMENT_TYPE_CODE}/${NUMBER_PEOPLE}`
  const response = await axios.get(request);

  await proccesResponse(interval, response);
  }, intervalDelay);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));