import axios from 'axios';
import { date } from 'joi';
import { FindSlots } from '../utils/types';

const  formatDate = (date: Date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
export const findSlots = async (data: FindSlots) => {
    const request = 'https://www.migrationsverket.se/ansokanbokning/valjtyp?sprak=en&bokningstyp='+data.appointmentType+'&enhet='+ data.agency+'&sokande='+data.numberOfPeople;
    const validity = await axios.get(request);

    const JSESSIONID= validity.request.path.split(';')[1].slice(0, -2).split('=')[1];
    // console.log(JSESSIONID);

    const currentDate = new Date(data.date + ' 00:00');
    const copyDate = new Date(currentDate);
    const nextDay = new Date(copyDate.setDate(copyDate.getDate() +1));
    
    const migrationRequest = 'https://www.migrationsverket.se/ansokanbokning/wicket/page;jsessionid='+JSESSIONID+'?1-1.IBehaviorListener.1-form-kalender-kalender&start='+formatDate(currentDate)+'T00%3A00%3A00%2B00%3A00&end='+formatDate(nextDay)+'T00%3A00%3A00%2B00%3A00&_='+ Date.now();                                      
    // console.log(migrationRequest);
    const response = await axios.get(migrationRequest, 
    {
        headers: {
            cookie: 'JSESSIONID="'+JSESSIONID+'"; _ga=GA1.2.519854118.1604266806; ReadSpeakerSettings=enlarge=enlargeoff; ',
            "X-Requested-With": "XMLHttpRequest"
        }
    });
    return response;
}