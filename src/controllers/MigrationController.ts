import { NextFunction, Request, Response } from 'express';
import { validateAgency, validateAppoitmentType } from '../helpers/Validations';
import * as MigrationService  from '../services/Migration'
import { FindSlots } from '../utils/types';


export const findSlots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
try {
    const { agency, appoitmentType, numberOfPeople, startDate, endDate } = req.params;

    const agencyData = validateAgency(agency);
    const appointmentTypeData = validateAppoitmentType(parseInt(appoitmentType));
    const numberOfPeopleData = parseInt(numberOfPeople) <= 10 ? numberOfPeople: undefined;
    const areValid = agencyData && appointmentTypeData && numberOfPeopleData;
    
    if(!areValid)
        throw new Error('Data not match');

    const data: FindSlots = {
        agency: agencyData?.code || '', 
        appointmentType: appointmentTypeData?.code || 0,  
        numberOfPeople: parseInt(numberOfPeopleData || '0'),
        startDate,
        endDate
    };

    const response = await MigrationService.findSlots(data);
   
    res.status(200).json(response.data);
} catch (error) {
    console.error(error)
}
    
}