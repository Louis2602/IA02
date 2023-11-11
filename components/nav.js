export default {
	data() {
		return {
			form: {
				searchInput: '',
			},
		};
	},
	template: `
		<nav class="navbar navbar-light rounded" style="background-color: var(--blue-color)">
		<div class="container-fluid">
			<a href="index.html">
				<i class="fa-solid fa-house"></i>
			</a>
			<form class="d-flex">
				<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
				<button class="btn btn-outline-success" type="submit">Search</button>
			</form>
			</div>
		</nav>
    `,
	methods: {
		async submit() {
			this.$emit('submit', this.form);
		},
	},
};
