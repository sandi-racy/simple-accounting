<template lang="jade">
    .row.page
        app-header(path='/') Transactions
        .col-md-12
            .row.text-right
                .col-md-12
                    button.btn.btn-primary.button__option(@click='toggleFilter')
                        .fa.fa-filter
                    router-link.btn.btn-primary(to='/transaction/create')
                        .fa.fa-plus
            .row.filter(v-show='filter.active')
                .col-md-12
                    form.form-inline(@submit.prevent='doFilter')
                        .form-group
                            vue-date-picker(:date="{ startTime: { time: '' } }", :option='datePicker.option', @change='setDateStart')
                            vue-date-picker(:date="{ startTime: { time: '' } }", :option='datePicker.option', @change='setDateEnd')
                        button.btn.btn-primary.btn-block Filter
            .row
                .col-md-12
                    table.table.table-striped
                        thead
                            tr
                                th Date
                                th From
                                th To
                                th Nominal
                        tbody
                            v-touch(tag='tr', v-on:press='press(transaction.rowid)', v-for='transaction in transactions')
                                td {{ transaction.date | date }}
                                td {{ transaction.account_from }}
                                td {{ transaction.account_to }}
                                td.text-right {{ transaction.value | price }}
            .row
                .col-md-12
                    button.btn.btn-primary.btn-block(@click='loadTransaction', v-show='showLoadMore') Load more
</template>

<script>
    import moment from 'moment'
    import VueDatePicker from 'vue-datepicker'
    import AppHeader from './AppHeader.vue'

    export default {
        data() {
            return {
                datePicker: {
                    option: {
                        type: 'day',
                        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        format: 'DD-MM-YYYY',
                        color: {
                            header: '#54B0F3',
                            headerText: '#FFFFFF'
                        },
                        inputStyle: {
                            'padding': '6px',
                            'width': '100%'
                        },
                    }
                },
                filter: {
                    active: false,
                    date: {
                        start: '2010-01-01',
                        end: '2018-05-06'
                    }
                },
                page: {
                    count: 0,
                    skip: 0,
                    take: 1
                },
                transactions: []
            }
        },

        methods: {
            async doFilter() {
                this.filter.date.start = moment(this.filter.date.start, 'DD-MM-YYYY').format('YYYY-MM-DD')
                this.filter.date.end = moment(this.filter.date.end, 'DD-MM-YYYY').format('YYYY-MM-DD')

                this.page.count = await this.transactionsTable.countAll(this.filter)
                this.page.skip = 0
                this.transactions = await this.transactionsTable.getAll(this.page, this.filter)
                this.page.skip += this.page.take
            },

            async loadTransaction() {
                let transactions = await this.transactionsTable.getAll(this.page, this.filter)
                transactions.forEach((transaction) => {
                    this.transactions.push(transaction)
                })
                this.page.skip += this.page.take
            },

            press(rowid) {
                this.action.choose((isDeleted) => {
                    if (isDeleted) {
                        this.alert.confirm('Are you sure?', null, 'warning', () => {
                            this.transactionsTable.remove(rowid)

                            this.alert.info('Data has been deleted', async () => {
                                this.transactions = await this.transactionsTable.getAll(this.filter)
                            })
                        })
                    } else {
                        this.$router.push('/transaction/edit/' + rowid)
                    }
                })
            },

            setDateEnd(date) {
                this.filter.date.end = date
            },

            setDateStart(date) {
                this.filter.date.start = date
            },

            toggleFilter() {
                this.filter.active = this.filter.active ? false : true
            }
        },

        computed: {
            showLoadMore() {
                if (this.page.skip >= this.page.count) {
                    return false
                } else {
                    return true
                }
            }
        },

        components: {
            AppHeader, VueDatePicker
        },

        async mounted() {
            this.page.count = await this.transactionsTable.countAll(this.filter)
            this.loadTransaction()
        }
    }
</script>
