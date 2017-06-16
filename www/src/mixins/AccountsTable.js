import moment from 'moment'

const mixin = {
    data() {
        return {
            accountsTable: {
                getAll() {
                    let self = this
                    let accounts = []

                    return new Promise((resolve, reject) => {
                        db.transaction((tx) => {
                            tx.executeSql('SELECT rowid, name FROM accounts ORDER BY name', [], (tx, results) => {
                                for (let i = 0; i < results.rows.length; i++) {
                                    accounts.push(results.rows.item(i))
                                }
                                resolve(accounts)
                            })
                        }, this.transactionError)
                    })
                },

                getId(accountName) {
                    let self = this
                    return new Promise((resolve, reject) => {
                        db.transaction((tx) => {
                            tx.executeSql('SELECT rowid FROM accounts WHERE name = ?', [accountName], (tx, results) => {
                                resolve(results.rows.item(0).rowid)
                            })
                        }, self.transactionError)
                    })
                },

                getName(accountId) {
                    let self = this
                    return new Promise((resolve, reject) => {
                        db.transaction((tx) => {
                            tx.executeSql('SELECT name FROM accounts WHERE rowid = ?', [accountId], (tx, results) => {
                                resolve(results.rows.item(0))
                            })
                        }, self.transactionError)
                    })
                },

                insert(accountName) {
                    db.transaction((tx) => {
                        tx.executeSql('INSERT INTO accounts (name, date) VALUES (?, ?)', [accountName, moment().format('YYYY-MM-DD')])
                    }, this.transactionError)
                },

                isNameExist(accountName) {
                    let self = this
                    return new Promise((resolve, reject) => {
                        db.transaction((tx) => {
                            tx.executeSql('SELECT name FROM accounts WHERE name = ?', [accountName], (tx, results) => {
                                let isExist
                                if (results.rows.length == 0) {
                                    isExist = false
                                } else {
                                    isExist = true
                                }
                                resolve(isExist)
                            })
                        }, self.transactionError)
                    })
                },

                remove(id) {
                    db.transaction((tx) => {
                        tx.executeSql('DELETE FROM accounts WHERE rowid = ?', [id])
                    }, this.transactionError)
                },

                update(account) {
                    db.transaction((tx) => {
                        tx.executeSql('UPDATE accounts SET name = ? WHERE rowid = ?', [account.name, account.id])
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
