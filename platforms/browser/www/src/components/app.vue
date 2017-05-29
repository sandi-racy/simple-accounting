<template lang="jade">
    .container
        app-header
        router-view
</template>

<script>
	import AppHeader from './AppHeader.vue'

	export default {
		components: {
			AppHeader
		}
	}
</script>

<style lang="stylus">
    ul
        list-style: none
        margin: 0px
        padding: 0px

        li
            list-style: none
            margin: 0px
            padding: 0px
</style>
