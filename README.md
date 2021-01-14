# Swedish Migrationsverket Appoitment Alert App

Since getting a slot at the Swedish Migration Agency (Migrationsverket) you need to look at the site over and over again, at some point you will get exhausted. This is a tedious way to find a slot and schedule your appointment.

The intent of this app is to automate this process so you can go to the site when there is a slot available in a date range you set up previously. It sends a request every certain period of time to validate available slots.

It is build on NodeJS with one endpoint where you define your appointment

Get Appointments  :  `GET migration/:agency/:startDate/:endDate/:appoitmentType/:numberOfPeople`
- `agency`:  Agency code, one of the following

		Z209 -> Stockholm (Sundbyberg)
		Z102 -> Göteborg
		KCMA -> Malmö (Agnesfridsvägen)
		BBBO -> Boden
		NHL -> Borlänge
		VBR -> Borås
		MAFM -> Flen
		VHD -> Halmstad
		Z085 -> Jönköping
		SKK -> Karlskrona
		VKA -> Karlstad
		NKR -> Kramfors
		SOL -> Kristianstad
		VSK -> Mariestad
		Z083 -> Norrköping
		BBSU -> Sundsvall
		BBUM -> Umeå
		MUP1 -> Uppsala
		Z115 -> Visby
		Z096 -> Vänersborg
		BBVS -> Västerås
		BBVX -> Växjö
		MAOM -> Örebro

- `startDate`: following this format `YYYY-MM-DD`
- `endDate`: following this format `YYYY-MM-DD`
- `appoitmentType`: Appointment type code. One of the following.

	    2 -> Have your fingerprints and photograph taken
	    4 -> Apply for an alien's passport or a travel document
	    1 -> Collect an alien's passport or a travel document
	    8 -> Collect an Asylum Seeker Card (LMA-kort)
	    9 -> Apply for a special allowance
	    5 -> Extend a visit to Sweden
	    15 -> Submit an online application/notification for Swedish citizenship
- `numberOfPeople`: Number of person will attend the appointment.


## Install

Since it's build on NodeJs, you need to clone this repository and install dependencies.

    npm install

## Environment Variables

This application sends an email when finds available slots in the date range provided, in that case you need to set up your Sender and Receiver email.

    SENDER_EMAIL=<EMAIL> # Sender Email address 
    
    SENDER_EMAIL_PASS=<EMAIL PASS> # Sender Email password
    
    RECEIVER_EMAIL=<EMAIL> # Receiver Email address
    
    INTERVAL_DELAY=300000 # Request interval in milliseconds, in this case 5 minutes
    
**!! IMPORTANT**
I have tested it using an outlook account as a sender, gmail sometimes got problems but you can test and change the Nodemailer service as `gmail` in the `src/helpers/Nodemailer.ts`

## Appointment Config

Inside the project there is a file so you can configure your appointment settings as needed. `src/config.ts`

    export  const  START_DATE='2021-02-10';
    
    export  const  END_DATE='2021-02-15';
    
    export  const  AGENCY_CODE='Z209'; // Stockholm
    
    export  const  APPOINTMENT_TYPE_CODE=2 // Have your fingerprints and photograph taken
    
    export  const  NUMBER_PEOPLE=1


## Run

After you set up the project you can run using this command:

    npm start

## Deploy

If you want to run this application in a server, it is recommended to dockerize it. In this project there is a Dockerfile which you can edit you environmental variables as needed. Then create you image and run.

    docker build -t your-username/migrationsverket .

    docker run -d your-username/migrationsverket


## Author

* **[Luis Araujo](https://luisaraujo.io)** - *Software Engineer*

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
