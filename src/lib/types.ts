export interface Event_Data {
	id: string;
	name: string;
	description: string;
	location: string;
	time: string;
	thumbnail_src: string;
}

export interface Participant{
    first_name: string,
    last_name:string,
    email: string,
    contact: string,
    gender: string,
    roll: string
}

export const firebaseConfig = {
    apiKey: "AIzaSyAWGFukqeiv3zKSL-oOqCWC5dz_AX6FcsM",
    authDomain: "ebsb-register.firebaseapp.com",
    projectId: "ebsb-register",
    storageBucket: "ebsb-register.appspot.com",
    messagingSenderId: "662765326986",
    appId: "1:662765326986:web:d5bc36850368d529a81373"
};
