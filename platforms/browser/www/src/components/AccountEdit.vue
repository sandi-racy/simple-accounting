<template lang="jade">
    .row.page
        app-header(path='/account') Edit Akun
        .col-md-12
            form(@submit.prevent='submit')
                ul.alert.alert-danger(v-show='isError')
                    li {{ error }}
                .form-group
                    label Akun
                    input.form-control(type='text', v-model='account.name')
                button.btn.btn-primary.btn-block(:disabled='disabled') Simpan
</template>

<script>
	import AppHeader from './AppHeader.vue'

	export default {
        data() {
            return {
                account: {},
                disabled: false,
                error: '',
                isError: false
            }
        },

        methods: {
            submit() {
                let self = this
                this.disabled = true
                this.error = ''

                if (this.validate()) {
                    this.accountsTable.update(this.account)
                    this.alert.info('Data berhasil disimpan', () => {
                        self.$router.push('/account')
                    })
                } else {
                    this.isError = true
                }

                this.disabled = false
            },

            validate() {
                if (this.account.name.trim() == '') {
                    this.error = 'Nama akun harus diisi'
                }

                if (this.error == '') {
                    return true
                } else {
                    return false
                }
            }
        },

        async mounted() {
            this.account = await this.accountsTable.getName(this.$route.params.id)
            this.account.id = this.$route.params.id
        },

		components: {
			AppHeader
		}
	}
</script>
