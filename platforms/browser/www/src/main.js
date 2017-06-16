import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import VeeValidate from 'vee-validate'

import Helper from './mixins/Helper.js'
import AccountsTable from './mixins/AccountsTable.js'
import TransactionsTable from './mixins/TransactionsTable.js'

Vue.use(VueRouter)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VeeValidate)
Vue.use(Helper)
Vue.use(AccountsTable)
Vue.use(TransactionsTable)

import moment from 'moment'
import number_format from 'locutus/php/strings/number_format'

import App from './components/App.vue'
import Dashboard from './components/Dashboard.vue'
import Account from './components/Account.vue'
import AccountEdit from './components/AccountEdit.vue'
import Transaction from './components/Transaction.vue'
import TransactionForm from './components/TransactionForm.vue'
import Journal from './components/Journal.vue'

const routes = [
	{ path: '/', component: Dashboard },
	{ path: '/account', component: Account },
	{ path: '/account/:id', component: AccountEdit },
	{ path: '/transaction', component: Transaction },
	{ path: '/transaction/create', component: TransactionForm },
	{ path: '/transaction/edit/:id', component: TransactionForm },
	{ path: '/journal', component: Journal }
]

const router = new VueRouter({
  	routes
})

Vue.filter('date', function (date) {
	return moment(date).format('DD-MM-YYYY')
})

Vue.filter('price', function (value) {
	return number_format(value, 0, '', '.')
})

window.db = null

var Phonegap = {
	initialize() {
		this.bindEvents()
		this.setupVue()
	},

	bindEvents() {
		document.addEventListener('deviceready', this.onDeviceReady, false)
	},

	onDeviceReady() {
		db = window.openDatabase('accounting', '1.0', 'Simple Accounting', 2 * 1024 * 1024)
		db.transaction(Phonegap.database.populate, Phonegap.database.error, Phonegap.database.success)
	},

	database: {
		error(tx, err) {
	        alert('Failed connect to database')
	    },

		async populate(tx) {
			let isAccountsTableExist = await Phonegap.database.table.isExist(tx, 'accounts')
			if (!isAccountsTableExist) {
	            tx.executeSql('CREATE TABLE accounts (name, date)')
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
