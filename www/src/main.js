import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

import Helper from './mixins/Helper.js'
import AccountsTable from './mixins/AccountsTable.js'
import TransactionsTable from './mixins/TransactionsTable.js'

Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(Helper)
Vue.use(AccountsTable)
Vue.use(TransactionsTable)

import App from './components/App.vue'
import Dashboard from './components/Dashboard.vue'
import Account from './components/Account.vue'
import AccountEdit from './components/AccountEdit.vue'
import Transaction from './components/Transaction.vue'
import Journal from './components/Journal.vue'

const routes = [
	{ path: '/', component: Dashboard },
	{ path: '/account', component: Account },
	{ path: '/account/:id', component: AccountEdit },
	{ path: '/transaction', component: Transaction },
	{ path: '/journal', component: Journal }
]

const router = new VueRouter({
  	routes
})

window.db = null

var Phonegap = {
	initialize() {
		this.bindEvents()
		this.onDeviceReady()
		this.setupVue()
	},

	bindEvents() {
		document.addEventListener('deviceready', this.onDeviceReady, false)
	},

	onDeviceReady() {
		db = window.openDatabase('accounting', '1.0', 'Simple Accounting', 2 * 1024 * 1024)
		db.transaction(this.database.populate, this.database.error, this.database.success)
	},

	database: {
		error(tx, err) {
	        alert('Transaksi ke database gagal')
	    },

		async populate(tx) {
			let isAccountsTableExist = await Phonegap.database.table.isExist(tx, 'accounts')
			if (!isAccountsTableExist) {
	            tx.executeSql('CREATE TABLE accounts (name, date)')
				tx.executeSql('INSERT INTO accounts (name, date) VALUES (?, ?)', ['Kas', '2017-06-04'])
				tx.executeSql('INSERT INTO accounts (name, date) VALUES (?, ?)', ['Telcomate', '2017-06-04'])
			}

			let isTransactionsTableExist = await Phonegap.database.table.isExist(tx, 'transactions')
			if (!isTransactionsTableExist) {
	            tx.executeSql('CREATE TABLE transactions (account_from, account_to, value, date)')
			}
	    },

		success(tx, err) {
	        //alert('Berhasil membuat database')
	    },

		table: {
			isExist(tx, tableName) {
				return new Promise((resolve, reject) => {
					tx.executeSql('SELECT name FROM sqlite_master WHERE type = ? AND name = ?', ['table', tableName], (tx, results) => {
						let isExist = false
						if (results.rows.length == 1) {
							isExist = true
						}
						resolve(isExist)
					})
				})
			}
		}
	},

	setupVue() {
		new Vue({
		  	router,
			mixins: [Helper, AccountsTable, TransactionsTable],
		  	render: h => h(App)
		}).$mount('#app')
	}
}

Phonegap.initialize()
