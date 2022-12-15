<script>
	import '$lib/app.css';
</script>

<svelte:head>
	<title>Ultidex</title>
</svelte:head>

<header>
	<nav
		class="bg-gray-700 drop-shadow-md px-6 mb-6 items-center align-middle justify-between flex h-14 gap-5"
	>
		<h1 class="text-2xl heading-title"><a href="/">Ultidex</a></h1>
		<div class="space-x-5">
			<a href="about">About</a>
			<!-- TODO: Implement dark mode toggle-->
		</div>
	</nav>
</header>

<main>
	<slot />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
</style>
