<template>
  <RouterView/>
</template>


<script>
  import { RouterView } from 'vue-router'
  import axios from 'axios'
  import { ref, reactive, computed, toRaw } from 'vue'


  export default {
      name: 'App',
      data() {
        return  {
          user: null
        }
      },
      

      async created() {
        // Run this only once
        if ( localStorage.getItem('user') === null ) {
          try {
            let __response = await axios.get('/user')
              this.user = __response.data.data
    
              localStorage.setItem('user', JSON.stringify( this.user )) 

          } catch ( error ) {
            // if there is any error redirect the user to login page 
            this.$router.push('/login')
          }
            
        }
      },
      
  }

   
  

</script>



<style lang="scss">
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 10px;
  }
</style>