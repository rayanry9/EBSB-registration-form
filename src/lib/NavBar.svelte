<script lang="ts">
	import { fade } from 'svelte/transition';
	import logo from '$lib/images/ebsb-logo.png';
	import wording from '$lib/images/wording.png';
	import menuBtn from '$lib/icons/menu-outline.svg';
	import closeBtn from '$lib/icons/close-outline.svg';
	import { goto } from '$app/navigation';

	let menuBtnClicked = false;
</script>

<div class="w-full flex flex-row p-2 items-center justify-start">
	<img src={logo} on:click={()=>goto("/")} class="h-14 peer" alt="logo" />
	<img src={wording} on:click={()=>goto("/")} class="h-8 w-fit pl-4 peer-hover:visible sm:invisible" alt="wording" />

	{#if !menuBtnClicked}
		<img
			src={menuBtn}
			on:click={() => (menuBtnClicked = true)}
			class="h-6 ml-auto justify-self-end"
			alt="menuBtn"
			in:fade|local
		/>
	{:else}
		<img
			src={closeBtn}
			on:click={() => (menuBtnClicked = false)}
			in:fade|local
			class:hidden={!menuBtnClicked}
			class="h-6 justify-self-end ml-auto"
			alt="close"
		/>
	{/if}
</div>
