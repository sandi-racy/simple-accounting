<template lang="jade">
    .row.journal
        app-header Ayat Jurnal
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

<style lang="stylus" scoped>
    .journal
        position: absolute
        top: 0px
        width: 100%
</style>
