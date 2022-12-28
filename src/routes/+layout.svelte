<script>
	import '$lib/app.css';
	import logo from '$lib/assets/pokeball_logo.png';
	import { page } from '$app/stores';

	function toTop() {
		document.body.scrollIntoView({
			behavior: 'smooth'
		});
	}
</script>

<svelte:head>
	<title>Ultidex</title>
</svelte:head>

<header>
	<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-red-600 mb-6">
		<div class="container flex flex-wrap items-center justify-between mx-auto">
			<a href="/" class="flex items-center">
				<img src={logo} class="h-6 mr-4 sm:h-9" alt="Ultidex Logo" />
				<span class="self-center text-2xl font-bold whitespace-nowrap">Ultidex</span>
			</a>
			<button
				data-collapse-toggle="navbar-default"
				type="button"
				class="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-red-700 dark:focus:ring-red-800"
				aria-controls="navbar-default"
				aria-expanded="false"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
			<div class="hidden w-full md:block md:w-auto" id="navbar-default">
				<ul
					class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 "
				>
					<li>
						<a
							href="/"
							class="block py-2 pl-3 pr-4"
							class:active={$page.url.pathname == '/'}
							aria-current="page">Pokédex</a
						>
					</li>
					<li>
						<a
							href="team-builder"
							class="block py-2 pl-3 pr-4"
							class:active={$page.url.pathname == 'team-builder'}
							aria-current="page">Team Builder</a
						>
					</li>

					<li>
						<a
							href="type-chart"
							class="block py-2 pl-3 pr-4"
							class:active={$page.url.pathname == 'type-chart'}
							aria-current="page">Type Chart</a
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>

<main>
	<button
		class="fixed bottom-10 right-10 rounded-full bg-gradient-to-t from-red-600 to-red-700 h-12 w-12"
		type="button"
		on:click={toTop}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			class="h-6 w-full text-center fill-neutral-100"
			><path
				d="M3.47 7.78a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L9 4.81v7.44a.75.75 0 01-1.5 0V4.81L4.53 7.78a.75.75 0 01-1.06 0z"
			/></svg
		></button
	>
	<slot />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

	.active {
		@apply text-neutral-200;
	}
</style>
