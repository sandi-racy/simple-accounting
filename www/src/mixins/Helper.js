import moment from 'moment'

const mixin = {
    data() {
        return {
            alert: {
                confirm(title, text, type, callback) {
                    swal({
                        title: title,
                        text: text,
                        type: type,
                        showCancelButton: true,
                        cancelButtonColor: '#DBDFEA',
                        cancelButtonText: 'Tidak',
                        confirmButtonColor: '#54B0F3',
                        confirmButtonText: "Ya",
                        closeOnConfirm: false
                    }, callback)
                },

                info(title, callback) {
                    swal({
                        title: title,
                        confirmButtonColor: '#54B0F3',
                        confirmButtonText: 'Ok'
                    }, callback);
                }
            }
        }
    },

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
