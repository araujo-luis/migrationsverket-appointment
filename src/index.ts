import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
import axios from 'axios';
import router from "./routes";
import transporter from './helpers/Nodemailer';
dotenv.config();
const PORT: string = process.env.PORT || '4000';


const app: Application = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(bodyParser.json());

const days = ['2021-02-10', '2021-02-11', '2021-02-12'];
let send = false;
let thatDay = '';
const interval = setInterval(async () => {
  const requests = days.map(day => axios.get('http://localhost:4000/migration/Z083/'+day+'/2/1'));

  await Promise.all(requests).then((value) => {
      value.forEach(async (response, index) => { 
          console.log(days[index] + ' -> ' + response.data) 
          if (response.data > 0){
            send = true;
            clearInterval(interval);
            console.log('enviar email')
            thatDay = days[index]
          }
      });
    });
    console.log('SEND', send);
    if (send) {
        console.log('HOLLLAA');
        const res = await transporter.sendMail({
            from: process.env.EMAIL_PROVIDER,
            to: process.env.EMAIL_RECEIVER,
            subject: 'STOCKHOLM APPOITMENT AVAILABLE ' + thatDay,
            text: 'FINALLY',
            priority: 'high'
        });
        console.log("Message sent: %s", res.messageId);

    }
  }, 6000);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));