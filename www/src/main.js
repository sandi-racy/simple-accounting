import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import Dashboard from './components/Dashboard.vue'
import Transaction from './components/Transaction.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/dashboard', component: Dashboard },
	{ path: '/transaction', component: Transaction }
]

const router = new VueRouter({
  	routes
})

var Phonegap = {
	initialize() {
		this.setupVue()
	},

	setupVue() {
		new Vue({
		  	router,
		  	render: h => h(App)
		}).$mount('#app')
	}
}

Phonegap.initialize()
