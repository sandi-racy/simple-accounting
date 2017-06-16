<template lang="jade">
    .row.page
        app-header(path='/transaction') {{ title }}
        .col-md-12
            form(@submit.prevent='submit')
                ul.alert.alert-danger(v-show='isError')
                    li(v-for="error in messages.errors") {{ error }}
                .form-group
                    label From Account
                    vue-awesomplete.form-control(:setting='accounts', v-model='account.from', :value.sync='account.from', ref='accountFrom')
                .form-group
                    label To Account
                    vue-awesomplete.form-control(:setting='accounts', v-model='account.to', :value.sync='account.to', ref='accountTo')
                .form-group
                    label Nominal
                    .input-group
                        .input-group-addon Rp
                        vue-numeric.form-control(v-model='value', format-input=true, precision=2, separator=',')
                button.btn.btn-primary.btn-block(:disabled='disabled') Save
</template>

<script>
    import AppHeader from './AppHeader.vue'
    import VueAwesomplete from 'vue-awesomplete'
    import VueNumeric from 'vue-numeric'

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
                title: null,
                value: 0
            }
        },

        methods: {
            submit() {
                let self = this
                let type = this.$route.path.split('/')[2]
                let id = this.$route.params.id

                this.disabled = true

                if (this.validate()) {
                    this.isError = false

                    this.alert.confirm('Are you sure?', null, 'warning', async () => {
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

                        if (type == 'create') {
                            this.transactionsTable.insert(accountFromId, accountToId, this.value)
                        } else {
                            this.transactionsTable.update(id, accountFromId, accountToId, this.value)
                        }

                        this.alert.info('Data has been saved', () => {
                            self.$router.push('/transaction')
                        })
                    })
                } else {
                    this.isError = true
                }

                this.disabled = false
            },

            validate() {
                this.messages.errors = [];

                if (this.account.from.trim() == '') {
                    this.messages.errors.push('The from account field is requred')
                }

                if (this.account.to.trim() == '') {
                    this.messages.errors.push('The to account field is requred')
                }

                if (this.account.from.trim() == this.account.to.trim()) {
                    this.messages.errors.push('The from account field and the to account field must be different')
                }

                if (this.value <= 0) {
                    this.messages.errors.push('The nominal field must be greater than 0')
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

        async mounted() {
            let type = this.$route.path.split('/')[2]
            let id = this.$route.params.id

            if (type == 'create') {
                this.title = 'Create Transaction'
            } else {
                this.title = 'Edit Transaction'
                let account = await this.transactionsTable.find(id)
                this.account.from = account.account_from
                this.account.to = account.account_to
                this.value = account.value
            }

            let accounts = []
            let accountsTable = await this.accountsTable.getAll()
            for (let i = 0; i < accountsTable.length; i++) {
                accounts.push(accountsTable[i].name)
            }
            this.$refs.accountFrom.list(accounts)
            this.$refs.accountTo.list(accounts)
        }
    }
</script>
