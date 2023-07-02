<template>
  <div v-if="loadAllLayouts">

    <Sidebar :active="activeSidebar" />

    <!-- Content Area -->
    <div class="relative md:ml-64 bg-slate-100">
      <Header :title="title" :profilePicsURI="this.profilePicsURL"></Header>
      <div>
        <RouterView @getTitle="setTitle" @getActive="setActive" @loadLayouts="setLayouts"/>
      </div>
      <Footer></Footer>
    </div>
  </div>
  <div v-else>
      <RouterView  @loadLayouts="setLayouts"/>
  </div>
</template>


<script>
import Sidebar from './components/Dashboard/Includes/Sidebar.vue'
import Header from './components/Dashboard/Includes/Header.vue'
import Footer from './components/Dashboard/Includes/Footer.vue'
import { RouterView } from 'vue-router'
import axios from 'axios'


export default {
  name: 'App',
  data() {
    return {
      user: null,
      title: 'Home',
      activeSidebar: '',
      profilePicsURL: '',
      loadAllLayouts: false
    }
  },

  methods: {
    setTitle(value) {
      if (value !== "") {
        this.title = value
      }
    },
    setActive(value) {
      if (value !== "") {
        this.activeSidebar = value
      }
    },

    setLayouts(value) {
        this.loadAllLayouts = value
    }
  },

  async created() {
    
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


  components: { Header, Footer, Sidebar }
}




</script>



<style lang="scss">
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px;
}
</style>