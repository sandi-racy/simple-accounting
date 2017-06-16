<template lang="jade">
    .row.page
        app-header(path='/') Accounts
        .col-md-12
            table.table.table-striped
                thead
                    tr
                        th Name
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

                this.alert.confirm('Are you sure?', 'All transactions of this account will be deleted', 'warning', () => {
                    this.accountsTable.remove(id)
                    this.transactionsTable.removeAccount(id)

                    this.alert.info('Data has been deleted', () => {
                        this.accounts = this.accountsTable.getAll()
                    })
                })
            }
        },

        async mounted() {
            this.accounts = await this.accountsTable.getAll()
        },

		components: {
			AppHeader
		}
	}
</script>
