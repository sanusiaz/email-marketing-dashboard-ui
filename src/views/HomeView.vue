<template>
    <!-- <div>
        This is the home page of the application We are still under test phase 

        <router-link :to="{name: 'admin-dashboard'}" class="text-blue-700 underline">Visit Dashboard</router-link>
    </div> -->
</template>

<script>
    export default {
        name: 'HomeView',
        mounted() {
            this.$router.push('/login')
        }
    }
</script>

<style lang="scss" scoped>

</style>