<template>
    <div>

        <Sidebar active="campaign" />

        <!-- Content Area -->
        <div class="relative md:ml-64 bg-slate-100">
            <Header :title="title"></Header>

            <div class="main_contents p-4 relative pt-0 pl-0 pr-0">
                <div class="main_contents pt-32 px-10">
                    <h2 class="text-black text-3xl font-Poppins font-semibold">All Campaigns</h2>

                </div>

                <!-- Campaigns -->
               <CampaignTableComponent />

            </div>
           
            <!-- Campaign filtering -->
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Sidebar from '../Dashboard/Includes/Sidebar.vue'
import Header from '../Dashboard/Includes/Header.vue'
import Footer from '../Dashboard/Includes/Footer.vue'
import CampaignTableComponent from './CampaignTableComponent.vue'


export default {
    name: "CampaignComponent",
    data() {
        return {
            title: 'Campaign',
        }
    },
    components: { Sidebar, Header, Footer, CampaignTableComponent }
}
</script>

<style lang="scss" scoped></style>