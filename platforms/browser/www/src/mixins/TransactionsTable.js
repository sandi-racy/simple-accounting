import moment from 'moment'

const mixin = {
    data() {
        return {
            transactionsTable: {
                countAll(filterData) {
                    return new Promise((resolve, reject) => {
                        db.transaction((tx) => {
                            tx.executeSql('SELECT count(rowid) AS total FROM transactions WHERE date BETWEEN ? AND ?', [filterData.date.start, filterData.date.end], (tx, results) => {
                                resolve(results.rows.item(0).total)
                            })
                        }, this.transactionError)
                    })
                },

                find(id) {
                    return new Promise((resolve, reject) => {
                        db.transaction((tx) => {
                            tx.executeSql('SELECT rowid, date, (SELECT name FROM accounts WHERE rowid = transactions.account_from) AS account_from, (SELECT name FROM accounts WHERE rowid = transactions.account_to) AS account_to, value FROM transactions WHERE rowid = ?', [id], (tx, results) => {
                                resolve(results.rows.item(0))
                            })
                        }, this.transactionError)
                    })
                },

                getAll(page, filterData) {
                    let self = this
                    let transactions = []

                    return new Promise((resolve, reject) => {
                        db.transaction((tx) => {
                            tx.executeSql('SELECT rowid, date, (SELECT name FROM accounts WHERE rowid = transactions.account_from) AS account_from, (SELECT name FROM accounts WHERE rowid = transactions.account_to) AS account_to, value FROM transactions WHERE date BETWEEN ? AND ? ORDER BY rowid DESC LIMIT ?, ?', [filterData.date.start, filterData.date.end, page.skip, page.take], (tx, results) => {
                                for (let i = 0; i < results.rows.length; i++) {
                                    transactions.push(results.rows.item(i))
                                }
                                resolve(transactions)
                            })
                        }, this.transactionError)
                    })
                },

                insert(accountFromId, accountToId, value) {
                    db.transaction((tx) => {
                        tx.executeSql('INSERT INTO transactions (account_from, account_to, value, date) VALUES (?, ?, ?, ?)', [accountFromId, accountToId, value, moment().format('YYYY-MM-DD')])
                    }, this.transactionError)
                },

                remove(id) {
                    db.transaction((tx) => {
                        tx.executeSql('DELETE FROM transactions WHERE rowid = ?', [id])
                    }, this.transactionError)
                },

                removeAccount(accountId) {
                    db.transaction((tx) => {
                        tx.executeSql('DELETE FROM transactions WHERE account_from = ? OR account_to = ?', [accountId, accountId])
                    }, this.transactionError)
                },

                update(id, accountFromId, accountToId, value) {
                    db.transaction((tx) => {
                        tx.executeSql('UPDATE transactions SET account_from = ?, account_to = ?, value = ? WHERE rowid = ?', [accountFromId, accountToId, value, id])
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
