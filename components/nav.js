export default {
	props: ['darkMode'],
	data() {
		return {
			searchInput: '',
		};
	},
	template: `
		<nav id="navbar" class="navbar navbar-light rounded" :style="{ backgroundColor: darkMode ? 'var(--blue-color-dark)' : 'var(--blue-color)', border: darkMode ? '1px solid #283655' : '1px solid #b6c8d6' }">
		<div class="container-fluid">
			<a href="index.html">
				<i class="fa-solid fa-house" :class="{ 'text-light': darkMode, 'text-dark': !darkMode }"></i>
			</a>
			<form class="d-flex" @submit.prevent="search">
				<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" :style="{backgroundColor: darkMode ? 'var(--dark-background-color)' : '#fff', border: darkMode ? '1px solid #aaa' : '1px solid #ccc', color: darkMode ? '#fff' : '#000' }" v-model="searchInput" id="searchInput" v-on:keydown.enter.prevent>
				<button class="btn btn-outline-success" type="submit">Search</button>
			</form>
			</div>
		</nav>
    `,
	methods: {
		search() {
			this.$emit('search', this.searchInput, 'search');
			this.searchInput = '';
		},
	},
};
