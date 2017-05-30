<template lang="jade">
    .container
        main-menu
        .row.body
            .col-md-12
                router-view
</template>

<script>
	import MainMenu from './MainMenu.vue'

	export default {
		components: {
			MainMenu
		}
	}
</script>

<style lang="stylus">
    *
        box-sizing: border-box

    ul
        list-style: none
        margin: 0px
        padding: 0px

        li
            list-style: none
            margin: 0px
            padding: 0px

    .html
        background: #F3F6FB

    .container
        font-family: 'bariol'
        padding-top: 60px
</style>
