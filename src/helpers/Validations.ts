import agencies from "../utils/agencies";
import appoitments from "../utils/appoitmentsTypes";

export const validateAgency = (agencyCode: string) => {
    const agency = agencies.find(agency => agency.code === agencyCode );
    return agency;
}
export const validateAppoitmentType = (appotimentCode: number) => {
    const appoitment = appoitments.find(appoitment => appoitment.code === appotimentCode);
    return appoitment;
}