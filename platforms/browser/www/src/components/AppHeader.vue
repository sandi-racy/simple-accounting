<template lang="jade">
    .header
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
        left: 0px
        overflow: hidden
        padding: 10px
        position: fixed
        top: 0px
        width: 100%
        z-index: 100
</style>
