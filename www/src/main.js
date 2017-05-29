import Vue from 'vue'
import App from './components/App.vue'

var Phonegap = {
	initialize() {
		this.setupVue()
	},

	setupVue() {
		new Vue({
			el: '#app',
			render: h => h(App)
		});
	}
}


Phonegap.initialize()
