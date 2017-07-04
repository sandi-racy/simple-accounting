<template lang="jade">
    .row.page
        app-header(path='/') Journal
        .col-md-12
            .row
                .col-md-12
                    table.table.table-striped
                        thead
                            tr
                                th Date
                                th Account
                                th Debit
                                th Credit
                        tbody
                            template(v-for='journal in journals')
                                tr
                                    td {{ isDatePrinted(journal.date) }}
                                    td {{ journal.account_from }}
                                    td.text-right 0
                                    td.text-right {{ journal.value | price }}
                                tr
                                    td {{ isDatePrinted(journal.date) }}
                                    td {{ journal.account_to }}
                                    td.text-right {{ journal.value | price }}
                                    td.text-right 0
                            tr
                                td.h3(colspan='2') Total
                                td.h3.text-right {{ total }}
                                td.h3.text-right {{ total }}
</template>

<script>
	import AppHeader from './AppHeader.vue'

	export default {
        data() {
            return {
                date: {
                    print: {
                        last: ''
                    }
                },
                journals: [],
                total: 0
            }
        },

        methods: {
            isDatePrinted(date) {
                if (date == this.date.print.last) {
                    return null
                }

                this.date.print.last = date
                return this.helper.date.format(date)
            }
        },

		components: {
			AppHeader
		},

        async mounted() {
            this.journals = await this.transactionsTable.journal.getAll()
            //this.total = await this.transactionsTable.journal.total()
        }
	}
</script>
