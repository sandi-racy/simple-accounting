import moment from 'moment'

const mixin = {
    data() {
        return {
            transactionsTable: {
                insert(accountFromId, accountToId, value) {
                    db.transaction((tx) => {
                        tx.executeSql('INSERT INTO transactions (account_from, account_to, value, date) VALUES (?, ?, ?, ?)', [accountFromId, accountToId, value, moment().format('YYYY-MM-DD')])
                    }, this.transactionError)
                },
            }
        }
    }
}

export default {
    install (Vue, options) {
        Vue.mixin(mixin)
    }
}
