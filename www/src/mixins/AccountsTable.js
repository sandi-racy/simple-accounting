import moment from 'moment'

const mixin = {
    data() {
        return {
            accountsTable: {
                getAll() {
                    let accounts = []
                    db.transaction((tx) => {
                        tx.executeSql('SELECT name FROM accounts', [], (tx, results) => {
                            for (let i = 0; i < results.rows.length; i++) {
                                accounts.push(results.rows.item(i).name)
                            }
                        })
                    }, this.transactionError)
                    return accounts
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
