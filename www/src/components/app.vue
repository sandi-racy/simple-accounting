<template lang="jade">
    .container
        transition(v-on:enter='enter', v-on:leave='leave', :css='false')
            router-view
</template>

<script>
    import swal from 'sweetalert'

    import Boostrap from 'bootstrap/dist/css/bootstrap.min.css'
    import SweetAlertCss from 'sweetalert/dist/sweetalert.css'

    export default {
        methods: {
            enter(el, done) {
    			const tl = new TimelineMax({
    				onComplete: done
    			})

    			tl.set(el, {
    				x: window.innerWidth * 1.5,
    				transformOrigin: '50% 50%'
    			})

    			tl.to(el, 0.5, {
    				x: 0,
    				ease: Power4.easeOut
    			})

    			tl.to(el, 1, {
    				ease: Power4.easeOut
    			})
            },

    		leave(el, done) {
    			TweenMax.fromTo(el, 1, {
    				autoAlpha: 1
    			}, {
    				autoAlpha: 0,
    				ease: Power4.easeOut,
    				onComplete: done
    			})
    		}
        }
    }
</script>

<style lang="stylus">
    *
        box-sizing: border-box
        outline: none !important

    ul
        list-style: none
        margin: 0px
        padding: 0px

        li
            list-style: none
            margin: 0px
            padding: 0px

    .action__choose
        button.cancel
            background-color: #54B0F3

    .awesomplete
        display: block !important

    .cov-vue-date
        display: block !important
        font-family: 'bariol' !important
        margin-bottom: 5px

    .sweet-alert
        font-family: 'bariol' !important

    .btn-primary
        background-color: #54B0F3
        border-color: #54B0F3

        &:active, &:hover
            background-color: #54B0F3
            border-color: #54B0F3

    .html
        background: #F3F6FB

    .container
        font-family: 'bariol' !important
        font-size: 16px
        padding-bottom: 20px

    .page
        position: absolute
        top: 0px
        width: 100%

    .filter
        padding-bottom: 10px
        padding-top: 10px

    .input-group
        .form-control
            z-index: 0

    .button__option, .button__edit
        margin-right: 5px
</style>
