<template>
	<IndexComponent :user="user" />
</template>


<script>

import axios from 'axios'

import IndexComponent from '@/components/IndexComponent.vue'


export default {
	name: 'App',

	data() {
		return {
			user: null
		}
	},

	async created() {
		// this.$router.push(window.location.pathname)

		// Run this only once
		if (localStorage.getItem('user') === null) {
			try {
				let __response = await axios.get('/user')
				this.user = __response.data.data
				localStorage.setItem('user', JSON.stringify(this.user))

			} catch (error) {

				localStorage.removeItem('user')
				localStorage.removeItem('token')
				localStorage.removeItem('loggedInTimeStamp')
				// if there is any error redirect the user to login page 

				if (this.$router.currentRoute._value.meta.requiresAuth !== undefined) {
					this.$router.push('/login')
				}
			}

		}
		else {
			// Check to see if user is still logged in 
		}
	},


	components: { IndexComponent }
}




</script>



<style lang="scss">
.container {
	max-width: 1100px;
	margin: 0 auto;
	padding: 10px;
}
</style>