<template lang="jade">
    .row.page
        app-header(path='/') Master Akun
        .col-md-12
            table.table.table-striped
                thead
                    tr
                        th Nama
                        th
                tbody
                    tr(v-for='account in accounts')
                        td {{ account.name }}
                        td.text-right
                            button.btn.btn-primary.button__edit(@click="go('/account/' + account.rowid)")
                                i.fa.fa-pencil
                            button.btn.btn-danger(@click="remove(account.rowid)")
                                i.fa.fa-trash
</template>

<script>
	import AppHeader from './AppHeader.vue'

	export default {
        data() {
            return {
                accounts: []
            }
        },

        methods: {
            remove(id) {
                let self = this

                this.alert.confirm('Apakah anda yakin?', 'Seluruh transaksi yang bersangkutan dengan akun ini akan dihapus', 'warning', () => {
                    this.accountsTable.remove(id)
                    this.transactionsTable.removeAccount(id)

                    this.alert.info('Data berhasil dihapus', () => {
                        this.accounts = this.accountsTable.getAll()
                    })
                })
            }
        },

        mounted() {
            this.accounts = this.accountsTable.getAll()
        },

		components: {
			AppHeader
		}
	}
</script>
