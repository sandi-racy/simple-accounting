<template lang="jade">
    .row.header
        main-menu
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
    .header
        background: #54B0F3
        overflow: hidden
        padding: 10px
</style>
