<template lang="jade">
    .row.page
        app-header(path='/') Ayat Jurnal
        .col-md-12
            h4 Journal
</template>

<script>
	import AppHeader from './AppHeader.vue'

	export default {
		components: {
			AppHeader
		}
	}
</script>
