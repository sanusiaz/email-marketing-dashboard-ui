<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: 'LogoutComponent',
        created() {
            if ( localStorage.getItem('token') !== undefined ) {
                localStorage.removeItem('token');
            }

            localStorage.removeItem('user')
            localStorage.removeItem('loggedInTimeStamp')

            // redirect Users to login page 
            this.$router.push('/login');
        }
    }
</script>

<style lang="scss" scoped>

</style>