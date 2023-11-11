export default {
	data() {
		return {
			isDarkTheme: false,
		};
	},

	methods: {
		toggleTheme() {
			this.$emit('dark-mode', this.isDarkTheme);
		},
	},
	template: `
    <div id="header" class="d-flex align-items-center justify-content-between rounded mb-3 p-2" style="height: 64px;"
    :style="{					
        backgroundColor: isDarkTheme ? 'var(--pink-color-dark)' : 'var(--pink-color)',
		color: isDarkTheme ? '#c9787a' : 'var(--text-dark-pink-color)',
        border: isDarkTheme ? '1px solid #47271a' : '1px solid #e9c8cd',
    }"
    
    >
        <div>21127337</div>
        <h2>Movies info</h2>
        <div class="form-check form-switch row">
            <input class="form-check-input" type="checkbox"  v-model="isDarkTheme" @change="toggleTheme">
            <i v-if="!isDarkTheme" class="fa-regular fa-sun"></i>
            <i v-else class="fa-solid fa-moon"></i>
        </div>
    </div>
    `,
};
