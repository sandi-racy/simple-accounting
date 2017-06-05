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

                removeAccount(accountId) {
                    db.transaction((tx) => {
                        tx.executeSql('DELETE FROM transactions WHERE account_from = ? OR account_to = ?', [accountId, accountId])
                    }, this.transactionError)
                }
            }
        }
    }
}

export default {
    install (Vue, options) {
        Vue.mixin(mixin)
    }
}
