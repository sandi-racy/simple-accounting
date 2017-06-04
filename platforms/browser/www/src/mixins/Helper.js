import moment from 'moment'

const mixin = {
    methods: {
        go(page) {
            this.$router.push(page)
        },

        transactionError() {
            alert('Transaksi gagal')
        }
    }
}

export default {
    install (Vue, options) {
        Vue.mixin(mixin)
    }
}
