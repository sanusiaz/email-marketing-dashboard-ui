<template>
    <div>
        <HomeComponent />
    </div>
</template>

<script>
import HomeComponent from '../../components/Dashboard/HomeComponent.vue'
export default {
    name: 'AdminDashboardView',
    components: { HomeComponent },
    mounted() {
        this.$emit('getTitle', 'Dashboard')
        this.$emit('getActive', 'dashboard')
        this.$emit('loadLayouts', true)
    },
}
</script>

<style lang="scss" scoped></style>