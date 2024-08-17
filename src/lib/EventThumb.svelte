<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import type { Event_Data } from '$lib/types';

	export let event_data: Event_Data = {
		id: '2024001',
		name: 'Event Name',
		time: 'XX:XX AP to XX::XX PA',
		location: 'Location',
		thumbnail_src: '/src/lib/images/placeholder.webp',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan nunc risus, bibendum vulputate justo interdum et. Praesent ut mi lectus. Integer eleifend quis magna in dapibus. Maecenas scelerisque enim eu quam sollicitudin, euismod tristique justo accumsan. Vivamus auctor lectus vel tellus maximus ultrices. Fusce posuere risus id arcu lobortis tincidunt nec et augue. Duis purus dolor, lobortis eget efficitur.'
	};
	let event_clicked = false;
</script>

<div on:click={() => (event_clicked = !event_clicked)} class="flex flex-col w-4/6 mb-2 mt-4 mx-4 md:w-2/5 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
	<img src={event_data.thumbnail_src} class="w-full h-72 rounded-lg" />
	<div class="flex flex-col items-center py-1">
		<p class="text-lg font-bold mb-1 md:text-xl xl:text2xl">{event_data.name}</p>
		{#if event_clicked}
			<div
				class="flex flex-col px-2 text-center"
				transition:slide={{ duration: 600, easing: cubicInOut }} >
				<p class="text-sm pb-2 md:text-md xl:text-lg">{event_data.description}</p>
				<button class="bg-blue-400 text-white px-4 py-1 rounded-md ml-auto justify-self-end mb-3 md:text-md xl:text-lg" on:click|stopPropagation ><a href="/register?id={event_data.id}">Register ></a></button>
			</div>
		{/if}
		<p class="text-sm md:text-md xl:text-lg">{event_data.time}</p>
		<p class="text-sm md:text-md xl:text-lg">{event_data.location}</p>
	</div>
</div>
