<template lang="jade">
    .col-md-12.header
        h3.header__title
            i.fa.fa-chevron-left.header__back(@click="go(path)")
            slot
</template>

<script>
    export default {
        props: ['path']
    }
</script>

<style lang="stylus" scoped>
    .header
        background: #54B0F3
        margin-bottom: 10px
        padding: 10px

    .header__title
        color: #FFFFFF
        margin: 0px

    .header__back
        font-size: 20px
        margin-right: 10px
</style>
