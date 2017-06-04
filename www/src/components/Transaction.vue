<template lang="jade">
    .row.transaction
        app-header Transaksi
        .col-md-12
            form(@submit.prevent='submit')
                ul.alert.alert-danger(v-show='isError')
                    li(v-for="error in messages.errors") {{ error }}
                .form-group
                    label Dari Akun
                    vue-awesomplete.form-control(:setting='accounts', v-model='account.from', ref='accountFrom')
                .form-group
                    label Ke Akun
                    vue-awesomplete.form-control(:setting='accounts', v-model='account.to', ref='accountTo')
                .form-group
                    label Nilai
                    .input-group
                        .input-group-addon Rp
                        vue-numeric.form-control(v-model='value')
                button.btn.btn-primary.btn-block(:disabled='disabled') Simpan
</template>

<script>
    import AppHeader from './AppHeader.vue'
    import swal from 'sweetalert'
    import VueAwesomplete from 'vue-awesomplete'
    import VueNumeric from 'vue-numeric'

    import SweetAlertCss from 'sweetalert/dist/sweetalert.css'
    import VueAwesompleteCss from 'awesomplete/awesomplete.css'

    export default {
        data() {
            return {
                account: {
                    from: '',
                    to: ''
                },
                accounts: {
                    list: [],
                    minChars: 0
                },
                disabled: false,
                isError: false,
                messages: {
                    errors: []
                },
                value: 0
            }
        },

        methods: {
            submit() {
                let self = this

                this.disabled = true

                if (this.validate()) {
                    this.isError = false

                    swal({
                        title: 'Apakah anda yakin?',
                        type: 'warning',
                        showCancelButton: true,
                        cancelButtonColor: '#DBDFEA',
                        cancelButtonText: 'Tidak',
                        confirmButtonColor: '#54B0F3',
                        confirmButtonText: "Ya",
                        closeOnConfirm: false
                    }, async () => {
                        let isAccountFromNameExist = await this.accountsTable.isNameExist(this.account.from)
                        let isAccountToNameExist = await this.accountsTable.isNameExist(this.account.to)

                        if (!isAccountFromNameExist) {
                            this.accountsTable.insert(this.account.from)
                        }

                        if (!isAccountToNameExist) {
                            this.accountsTable.insert(this.account.to)
                        }

                        let accountFromId = await this.accountsTable.getId(this.account.from)
                        let accountToId = await this.accountsTable.getId(this.account.to)

                        this.transactionsTable.insert(accountFromId, accountToId, this.value)

                        swal({
                            title: 'Data berhasil disimpan',
                            confirmButtonColor: '#54B0F3',
                            confirmButtonText: 'Ok'
                        }, () => {
                            self.$router.push('/')
                        });
                    })
                } else {
                    this.isError = true
                }

                this.disabled = false
            },

            validate() {
                this.messages.errors = [];

                if (this.account.from.trim() == '') {
                    this.messages.errors.push('Kotak isian dari Akun harus diisi')
                }

                if (this.account.to.trim() == '') {
                    this.messages.errors.push('Kotak isian ke Akun harus diisi')
                }

                if (this.account.from.trim() == this.account.to.trim()) {
                    this.messages.errors.push('Kotak isian dari Akun dan ke Akun tidak boleh sama')
                }

                if (this.value <= 0) {
                    this.messages.errors.push('Kotak isian nilai harus lebih besar dari 0')
                }

                if (this.messages.errors.length == 0) {
                    return true
                }

                return false
            }
        },

        components: {
            AppHeader, VueAwesomplete, VueNumeric
        },

        mounted() {
            this.$refs.accountFrom.list(this.accountsTable.getAll())
            this.$refs.accountTo.list(this.accountsTable.getAll())
        }
    }
</script>

<style lang="stylus" scoped>
    .transaction
        position: absolute
        top: 0px
        width: 100%
</style>
