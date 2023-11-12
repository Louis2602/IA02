export default {
	template: `
    <ul class="pagination justify-content-end">
        <li v-for="page in pages" :key="page" @click="changePage(page)" class="page-item" :class="{ active: page === currentPage }" id="pagi-number">
            <a class="page-link" href="javascript:void(0)">{{ page }}</a>
        </li>
    </ul>
    `,
	props: ['pages', 'currentPage'],
	methods: {
		changePage(page) {
			this.$emit('page-change', page);
		},
	},
};
