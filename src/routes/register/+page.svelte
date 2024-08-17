<script lang="ts">
    import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
    import { initializeApp } from "firebase/app";
	import type { PageData } from './$types';
	import { fade, slide } from 'svelte/transition';

    const firebaseConfig = {
      apiKey: "AIzaSyAWGFukqeiv3zKSL-oOqCWC5dz_AX6FcsM",
      authDomain: "ebsb-register.firebaseapp.com",
      projectId: "ebsb-register",
      storageBucket: "ebsb-register.appspot.com",
      messagingSenderId: "662765326986",
      appId: "1:662765326986:web:d5bc36850368d529a81373"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    export let data:PageData;
    
    interface Participant{
        first_name: string,
        last_name:string,
        email: string,
        contact: string,
        gender: string,
        roll: string
    }

    enum DATA{
        SUBMIT_OK,
        SUBMIT_ERROR,
        NOT_SUBMIT,
        ALREADY_REGISTERED
    }

    let participant:Participant={
        first_name:"",
        last_name:"",
        email:"",
        contact:"",
        gender:"male",
        roll:"", 
    };

    let isDataSubmitted:DATA=DATA.NOT_SUBMIT;


    function submitForm(){
        let is_input_valid=true;

        try{

            if(!/[a-z]+/i.test(participant.first_name)) {
                alert("Invalid First Name");
                is_input_valid=false;
            }
            if(!/[a-z]+/i.test(participant.last_name)) {
                alert("Invalid Last Name");

                is_input_valid=false;
            }
            if(! /[A-Z]{2}[0-9]{2}[A-Z]{3,5}[0-9]{5}/i.test(participant.roll)){
                alert("Enter a valid roll number");
                is_input_valid=false;
            }
            if(! /[A-Z]{2}[0-9]{2}[A-Z]{3,5}[0-9]{5}@iith\.ac\.in/i.test(participant.email)){
                alert("Enter a valid college mail address");
                is_input_valid=false;
            }
            if(! /[0-9]{10}/.test(participant.contact)){
                alert("Enter a valid mobile number");
                is_input_valid=false;
            }
            
            if(is_input_valid){

                const docRef=doc(db,data.name+"-"+data.id,participant.roll.toUpperCase())

                getDoc(docRef)
                    .then((docSnap)=>{
                        if(docSnap.exists()) isDataSubmitted=DATA.ALREADY_REGISTERED;
                        else{
                            setDoc(docRef, {
                                "name": participant.first_name +" "+ participant.last_name,
                                "contact": participant.contact,
                                "email": participant.email,
                                "gender":participant.gender })

                            isDataSubmitted=DATA.SUBMIT_OK;

                        }
                    })
                    .catch((err)=>{
                        throw new Error(err)
                    })

            }
        }
        catch(e){
            isDataSubmitted=DATA.SUBMIT_ERROR;
            console.error("Could not register you for the Event");
        }
    }
    
    let first_name_error=false;
    function check_first_name(){
        if(!/[a-z]+/i.test(participant.first_name)) first_name_error=true;
        else first_name_error=false;
    }

    
    let last_name_error=false;
    function check_last_name(){
        if(!/[a-z]+/i.test(participant.last_name)) last_name_error=true;
        else last_name_error=false;
    }    

    
    let email_error=false;
    function check_email(){
        if(! /[A-Z]{2}[0-9]{2}[A-Z]{3,5}[0-9]{5}@iith\.ac\.in/i.test(participant.email)) email_error=true;
        else email_error=false;
    }

    let contact_error=false;
    function check_contact(){
        if(! /[0-9]{10}/.test(participant.contact)) contact_error=true;
        else contact_error=false;
    }

    let roll_error=false;
    function check_roll(){
        if(! /[A-Z]{2}[0-9]{2}[A-Z]{3,5}[0-9]{5}/i.test(participant.roll)) roll_error=true;
        else roll_error=false;
    }
</script>

<div class="flex flex-col py-2 px-6 mx-auto w-full sm:w-4/5 xl:2/5  items-center">
    <p class="text-xl font-bold py-2 sm:text-2xl lg:text-4xl 2xl:text6xl">{data.name}</p>
    <p class="text-sm sm:text-md lg:text-lg 2xl:text-xl">{data.time}</p>
    <p class="text-sm sm:text-md lg:text-lg 2xl:text-xl">{data.location}</p>
    <p class="text-sm text-center py-1 sm:text-md lg:text-lg 2xl:text-xl">{data.description}</p>
</div>

{#if isDataSubmitted==DATA.NOT_SUBMIT}

<div transition:fade class="bg-blue-100 mt-4 mb-6 py-4 px-14 rounded-lg sm:mx-auto sm:w-4/5 md:w-3/5 lg:w-1/2 2xl:w-1/3 2xl:mx-auto">
    <p class="text-xl font-semibold mb-2 md:text-2xl ">Register</p> 
    <hr class="border-white ">
    <form>
        <p class="my-1 mt-6 md:text-lg">Name:</p>
        <div class="flex w-full">
            <div class="w-1/2 pr-2">
                <input type="text" bind:value={participant.first_name} required name="first_name" on:focusout={check_first_name} class:text-red-500={first_name_error} class="appearance-none w-full px-2 py-1 mr-4 rounded-md bg-white focus:outline-none">
                <p class="text-sm font-light text-gray-500">First Name</p>
            </div>
            <div class="w-1/2">
                <input type="text" bind:value={participant.last_name} required class="appearance-none w-full bg-white px-2 py-1 rounded-md focus:outline-none" on:focusout={check_last_name} class:text-red-500={last_name_error}>

                <p class="text-sm font-light text-gray-500">Last Name</p>    
            </div>
        </div> 


        <p class="mt-2 mb-1 md:text-lg">Student Email:</p>
        <input type="email" required bind:value={participant.email} class="appearance-none w-full bg-white px-2 py-1 rounded-md focus:outline-none" on:focusout={check_email} class:text-red-500={email_error}>
        <p class="text-sm font-light text-gray-500">eg: xxxxxx@iith.ac.in </p>


        <p class="mt-2 mb-1 md:text-lg">Student Roll No.:</p>
        <input type="email" required bind:value={participant.roll} class="appearance-none w-full bg-white px-2 py-1 rounded-md focus:outline-none" on:focusout={check_roll} class:text-red-500={roll_error}>
        <p class="text-sm font-light text-gray-500">eg: AI24BTECH11XXX </p>

        <div class="flex mt-2">
            <div class="pr-2">
                <p class="mb-1 md:text-lg">Gender:</p>
                <select  class="appearance-none w-20 rounded-md px-2 py-1 bg-white focus:outline-none">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                    <option value="undisclosed">Prefer not to say</option>
                </select>
            </div>
            <div class="flex w-full flex-col">
                <p class="mb-1 md:text-lg">Contact No.:</p>
                <input type="tel" bind:value={participant.contact} required maxlength=10 minlength=10 class="appearance-none w-full rounded-md bg-white px-2 py-1 focus:outline-none" on:focusout={check_contact} class:text-red-500={contact_error}>
            </div>
        </div>
        <div class="flex w-full items-end">
            <input type="submit" on:click|preventDefault={submitForm} class="appearance-none w-24 ml-auto mt-6 rounded-md bg-white px-2 py-1 focus:outline-none md:text-lg">

        </div>
    </form>
</div>

{:else if isDataSubmitted == DATA.SUBMIT_OK}

    <div transition:slide={{delay:500}} class="flex flex-col w-full px-12 items-center mt-6 ">
        <p class="px-6 py-4 bg-orange-300 rounded-2xl text-center">THANK YOU FOR PARTICIPATING</p>
    </div>

{:else if isDataSubmitted == DATA.SUBMIT_ERROR}
    
    <div class="flex flex-col items-center w-full mt-6 px-12 " transition:slide={{delay:500}}>
        <p class="px-6 py-4 bg-orange-300 rounded-2xl text-center">COULD NOT REGISTER YOU FOR THE EVENT.<br>SORRY :(</p>
    </div>

{:else if isDataSubmitted == DATA.ALREADY_REGISTERED}

    <div transition:slide={{delay:500}} class="flex flex-col w-full px-12 items-center mt-6 ">
        <p class="px-6 py-4 bg-orange-300 rounded-2xl text-center">You have already registered for this event. '^'</p>
    </div>


{/if}
