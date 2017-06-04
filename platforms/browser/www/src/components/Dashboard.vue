<template lang="jade">
    .row.dashboard
        .col-md-12
            main-menu
            h4 Dashboard
</template>

<script>
	import MainMenu from './MainMenu.vue'

	export default {
		components: {
			MainMenu
		}
	}
</script>

<style lang="stylus" scoped>
    .dashboard
        padding-top: 60px
</style>
