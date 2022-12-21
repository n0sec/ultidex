<script lang="ts">
	export let statName: string;
	export let baseStat: string | number;

	export let statTotal: number | string;

	let statMap = {
		hp: '#ce436a',
		attack: '#fb923c', // Orange-400
		defense: '#facc15', // Yellow-400
		'special-attack': '#4ade80', // Green-400
		'special-defense': '#38bdf8', // Sky-400
		speed: '#f472b6' // Pink-400
	};
</script>

<!-- Outside container for bar -->
<div class="grid grid-cols-6 w-full pl-4 align-middle justify-center items-center">
	<div class="col-start-1 col-span-2">
		<div class="uppercase font-bold text-sm">{statName.replace('-', ' ')}</div>
	</div>
	<div class="col-start-3 justify-self-end mr-6">
		{baseStat}
	</div>
	<div class="barContainer col-start-4 col-span-3 w-full h-4 flex-wrap">
		<!-- Stat Bar -->
		<div class="w-full h-4">
			<div
				class="statBar h-4"
				style:width="{(baseStat / 255) * 100}%"
				style:background={statMap[statName]}
			>
				<!-- <div class="font-medium mr-6 uppercase">{statName.replace('-', ' ')}</div>
                <div>{baseStat}</div> -->
			</div>
		</div>
	</div>
</div>

<style>
	:root {
		--statBorder: hsl(220, 20%, 40%);
	}
	.statBar {
		border-width: 0.5px;
	}

	.barContainer {
		box-shadow: inset 0 0 0 1px var(--statBorder);
	}
</style>
