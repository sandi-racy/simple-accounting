<template lang="jade">
    .container
        transition(v-on:enter='enter', v-on:leave='leave', v-bind:css='false')
            router-view
</template>

<script>
    import Boostrap from 'bootstrap/dist/css/bootstrap.min.css'

    export default {
        methods: {
            enter(el, done) {
    			const tl = new TimelineMax({
    				onComplete: done
    			})

    			tl.set(el, {
    				x: window.innerWidth * 1.5,
    				scale: 0.8,
    				transformOrigin: '50% 50%'
    			})

    			tl.to(el, 0.5, {
    				x: 0,
    				ease: Power4.easeOut
    			});

    			tl.to(el, 1, {
    				scale: 1,
    				ease: Power4.easeOut
    			});
            },

    		leave(el, done) {
    			TweenMax.fromTo(el, 1, {
    				autoAlpha: 1
    			}, {
    				autoAlpha: 0,
    				ease: Power4.easeOut,
    				onComplete: done
    			});
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

    .awesomplete
        display: block !important

    .sweet-alert
        font-family: 'bariol' !important

    .btn-primary
        background-color: #54B0F3
        border-color: #54B0F3

    .html
        background: #F3F6FB

    .container
        font-family: 'bariol' !important
        font-size: 16px
        padding-bottom: 20px

    .input-group
        .form-control
            z-index: 0
</style>
