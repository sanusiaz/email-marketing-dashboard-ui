<template>
    <!-- Sidebar -->
    <Nav :navigation="navigation" :active="active"> </Nav>
</template>

<script>
import Nav from './Nav.vue'
    export default {
        name: 'Sidebar',
        data() {
            return {
                navigation: [
                    {name: 'dashboard', icon: 'fas fa-home', toName:'admin-dashboard'},
                    // {name: 'analytics', icon: 'fas fa-chart-bar', toName:'admin-analytics'},
                    // {name: 'surveys', icon: 'fas fa-poll-h', toName:'admin-surveys'},
                    {name: 'campaign', icon: 'fas fa-funnel-dollar', toName:'admin-campaign'},
                    {name: 'subscribers', icon: 'fas fa-users', toName: 'admin-subscribers'},
                    {name: 'lists', icon: 'fas fa-folder', toName:'admin-lists'},
                    {name: 'newsletter', icon: 'fas fa-envelope-open-text', toName: "admin-newsletter"},
                    {name: 'schedule', icon: 'fas fa-stopwatch', toName: 'admin-schedule'},
                    {name: 'settings', icon: 'fas fa-wrench', toName: 'admin-settings'},
                ]
            }
        },
        components: { Nav },
        props: {
            active: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>