<template>
    <div>

        <Sidebar active="dashboard"/>

        <!-- Content Area -->
        <div class="relative md:ml-64 bg-slate-100">
            <Header :title="title" ></Header>
            <Overview />
            <div class="px-4 md:px-10 mx-auto w-full -m-24">
                <div>
                    <CombinedCharts />
                    <div class="flex flex-wrap mt-4">
                        <PageVisits />
                        <SocialTraffic />
                       
                    </div>
                </div>
                
                <Footer ></Footer>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './Includes/Sidebar.vue'
import Header from './Includes/Header.vue'
import Footer from './Includes/Footer.vue'
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
    components: { Sidebar, Header, Footer, Overview, SocialTraffic, PageVisits, CombinedCharts }
}
</script>

<style lang="scss" scoped></style>