<script lang="ts">
	export let pokemonType: string;

	let typeMap = {
		normal: {
			bg: '#6b7280', // Gray-500
			border: '#9ca3af' // Gray-400
		},
		fire: {
			bg: '#c2410c', // Orange-700
			border: '#ea580c' // Orange-600
		},
		water: {
			bg: '#0369a1', // Sky-700
			border: '#0284c7' // Sky-600
		},
		electric: {
			bg: '#ca8a04', // Yellow-600
			border: '#facc15' // Yellow-400
		},
		grass: {
			bg: '#16a34a', // Green-600
			border: '#4ade80' // Green-400
		},
		ice: {
			bg: '#0f766e', // Teal-700
			border: '#14b8a6' // Teal-500
		},
		fighting: {
			bg: '#7f1d1d', // Red-900
			border: '#991b1b' // Red-800
		},
		poison: {
			bg: '#6b21a8', // Purple-800
			border: '#9333ea' // Purple-600
		},
		ground: {
			bg: '#92400e', // Amber-800
			border: '#b45309' // Amber-700
		},
		flying: {
			bg: '#5776A5', // Custom RGB(87, 118, 165)
			border: '#78A3E3' // Custom RGB(120, 163, 227)
		},
		psychic: {
			bg: '#be123c', // Rose-700
			border: '#e11d48' // Rose-600
		},
		bug: {
			bg: '#4d7c0f', // Lime-700
			border: '#65a30d' // Lime-600
		},
		rock: {
			bg: '#827649', // Custom RGB(130, 118, 73)
			border: '#A6965D' // Custom RGB(166, 150, 93)
		},
		ghost: {
			bg: '#33548F', // Custom RGB(51, 84, 143)
			border: '#406AB3' // Custom RGB(55, 91, 153)
		},
		dragon: {
			bg: '#1e3a8a', // Blue-900
			border: '#1e40af' // Blue-800
		},
		dark: {
			bg: '#332D42', // Custom RGB(51, 45, 66)
			border: '#473E5C' // Custom RGB(71, 62, 92)
		},
		steel: {
			bg: '#545C82', // Custom RGB(84, 92, 130)
			border: '#636C99' // Custom RGB(99, 108, 153)
		},
		fairy: {
			bg: '#A6639B', // Custom RGB(166, 99, 155)
			border: '#BF73B3' // Custom RGB(191, 115, 179)
		}
	};
</script>

<div class="flex items-center align-middle">
	<div
		class="pokemon-type rounded-md py-1 shadow-md border-[2.5px]"
		style:background={typeMap[pokemonType].bg}
		style:border-color={typeMap[pokemonType].border}
	>
		<div class="px-3 text-center font-bold text-sm capitalize">
			{pokemonType}
		</div>
	</div>
</div>
