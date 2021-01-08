import axios from 'axios';
import { FindSlots } from '../utils/types';

export const findSlots = async (data: FindSlots) => {

    const validity = await axios.get('https://www.migrationsverket.se/ansokanbokning/valjtyp?sprak=en&bokningstyp='+data.appointmentType+'&enhet='+ data.agency+'&sokande='+data.numberOfPeople);

    const JSESSIONID= validity.request.path.split(';')[1].slice(0, -2).split('=')[1];
    console.log(JSESSIONID);

                                      
    const response = await axios.get('https://www.migrationsverket.se/ansokanbokning/wicket/page;jsessionid='+JSESSIONID+'?1-1.IBehaviorListener.1-form-kalender-kalender&start=2021-02-10T00%3A00%3A00%2B00%3A00&end=2021-02-11T00%3A00%3A00%2B00%3A00&_='+ Date.now(), 
    {
        headers: {
            cookie: 'JSESSIONID="'+JSESSIONID+'"; _ga=GA1.2.519854118.1604266806; ReadSpeakerSettings=enlarge=enlargeoff; ',
            "X-Requested-With": "XMLHttpRequest"
        }
    });
    return response;
}