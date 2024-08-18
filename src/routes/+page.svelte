<script lang="ts">
	import EventThumb from '$lib/EventThumb.svelte';
    import {event_data} from '$lib/store/eventData'

</script>

<div class="flex flex-col pb-2 pt-2 px-4">
	<p class="font-bold text-center text-xl md:text-2xl xl:text-4xl">Ethnic Night✨</p>
	<p class="text-sm text-center mt-1 md:text-md xl:text-lg">
		Celebrating Diversity, Connecting Cultures<br />
		Click on the event image to access the rules and details specific to that event.<br />
		Note: Additional insights into the games will be conveyed during the start of the respective games.
	</p>
</div>

<div class="flex flex-wrap mx-auto justify-center items-baseline ">
    {#each event_data as ev}
        <EventThumb event_data={
            {
                id:ev.id,
                name: ev.name,
                description: ev.description,
                time: ev.time,
                location: ev.location,
                thumbnail_src: ev.thumbnail_src
            }
        }/>
    {/each}
</div>
