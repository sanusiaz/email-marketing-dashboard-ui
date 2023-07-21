<template>


    <!-- Content Area -->
    <Overview />
    <div class="px-1 sm:px-4 md:px-10 mx-auto w-full -m-24">
        <CombinedCharts />
        <div class="flex flex-wrap mt-4">
            <PageVisits />
            <SocialTraffic />
            
        </div>
    </div>
</template>

<script>
import Overview from './Overview.vue'
import SocialTraffic from './SocialTraffic.vue'
import PageVisits from './PageVisits.vue'
import CombinedCharts from './CombinedCharts.vue'


export default {
    name: "HomeComponent",
    data() {
        return {
            title: 'Dashboard',
        }
    },

    props: {
        // activeSidebar:
    },
    components: { Overview, SocialTraffic, PageVisits, CombinedCharts }
}
</script>

<style lang="scss" scoped></style>