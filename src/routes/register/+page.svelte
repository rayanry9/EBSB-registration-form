<script lang="ts">
	import type { PageData } from './$types';

    export let data:PageData;
</script>

<div class="flex flex-col py-2 px-6 items-center">
    <p class="text-xl font-bold py-2">{data.name}</p>
    <p class="text-sm">{data.time}</p>
    <p class="text-sm">{data.location}</p>
    <p class="text-sm text-center py-1">{data.description}</p>
</div>

<div class="bg-blue-100 mt-4 mb-6 mx-8 py-4 px-6 rounded-lg">
    <p class="text-xl font-semibold  mb-2">Register</p> 
    <hr class="border-white ">
    <form method="POST">
        <p class="my-1 mt-6">Name:</p>
        <div class="flex w-full">
            <div class="w-1/2 pr-2">
                <input type="text" required name="first_name" class="appearance-none w-full px-2 py-1 mr-4 rounded-md bg-white focus:outline-none">
                <p class="text-sm font-light text-gray-500">First Name</p>
            </div>
            <div class="w-1/2">
                <input type="text" required class="appearance-none w-full bg-white px-2 py-1 rounded-md focus:outline-none">

                <p class="text-sm font-light text-gray-500">Last Name</p>    
            </div>
        </div> 


        <p class="mt-2 mb-1">Student Email:</p>
        <input type="email" required class="appearance-none w-full bg-white px-2 py-1 rounded-md focus:outline-none">
        <p class="text-sm font-light text-gray-500">eg: xxxxxx@iith.ac.in </p>

        <div class="flex mt-2">
            <div class="pr-2">
                <p class="mb-1">Gender:</p>
                <select name="gender" class="appearance-none w-20 rounded-md px-2 py-1 bg-white focus:outline-none">
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="o">Others</option>
                    <option value="n">Prefer not to say</option>
                </select>
            </div>
            <div class="flex w-full flex-col">
                <p class="mb-1">Contact No.:</p>
                <input type="tel" required maxlength=10 minlength=10 class="appearance-none w-full rounded-md bg-white px-2 py-1 focus:outline-none">
            </div>
        </div>
        <div class="flex w-full items-end">
        <input type="submit" class="appearance-none w-24 ml-auto mt-6 rounded-md bg-white px-2 py-1 focus:outline-none">
        </div>
    </form>
</div>
