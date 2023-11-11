export default {
	props: ['darkMode'],
	template: `
        <div class="p-3 border d-flex align-items-center justify-content-center rounded" :style="{backgroundColor: darkMode ? '#333' : '#ccc', border: darkMode ? '1px solid #aaa' : '1px solid #111' }">
            <p class='m-0'>Copyright &copy; Trần Tùng Lâm - 21127337</p>
        </div>
    `,
};
