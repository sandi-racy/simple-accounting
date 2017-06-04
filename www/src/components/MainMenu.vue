<template lang="jade">
    .main-menu__wrapper
        h3.main-menu__title Dashboard
        img.pull-right(src='img/main-menu.png', @click='open')
        ul.main-menu(:class='{ active: active }')
            li.main-menu__item(@click="go('/')")
                i.fa.fa-tachometer
                span.main-menu__item__text Dashboard
            li.main-menu__item(@click="go('/transaction')")
                i.fa.fa-pencil-square-o
                span.main-menu__item__text Transaksi
            li.main-menu__item(@click="go('/journal')")
                i.fa.fa-list
                span.main-menu__item__text Ayat Jurnal
            li.main-menu__item
                i.fa.fa-book
                span.main-menu__item__text Buku Besar
            li.main-menu__item
                i.fa.fa-balance-scale
                span.main-menu__item__text Neraca Saldo
        .main-menu__overlay(:class='{ active: active }', @click='close')
</template>

<script>
    export default {
        data() {
            return {
                active: false
            }
        },

        methods: {
            close() {
                this.active = false
            },

            go(page, title) {
                this.active = false
                this.$router.push(page)
            },

            open() {
                this.active = true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .main-menu__wrapper
        background: #54B0F3
        left: 0px
        overflow: hidden
        padding: 10px
        position: fixed
        top: 0px
        width: 100%
        z-index: 100

    .main-menu__title
        color: #FFFFFF
        float: left
        margin: 0px
        position: relative
        top: 3px

    .main-menu
        background: #F3F6FB
        height: 1000%
        font-size: 18px
        position: fixed
        top: 0px
        right: -80%
        transition: all 0.5s
        width: 70%
        z-index: 100

        &.active
            right: 0px
            transition: all 0.5s

    .main-menu__item
        padding: 10px

    .main-menu__item__text
        margin-left: 10px

    .main-menu__overlay
        background: #DBDFEA
        display: none
        height: 1000%
        opacity: 0.9
        position: fixed
        right: 0px
        top: 0px
        width: 100%

        &.active
            display: block
</style>
