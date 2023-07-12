<template>
    
    <div class="main_contents pt-32 px-10">
        <h2 class="text-black text-3xl font-Poppins font-semibold">All Campaigns</h2>

    </div>

    <!-- Campaigns -->
    <CampaignTableComponent />

</template>

<script>
import CampaignTableComponent from '@/components/Campaigns/CampaignTableComponent.vue'

export default {
    name: "CampaignComponent",
    data() {
        return {
            title: 'Campaign',
        }
    },
    components: { CampaignTableComponent }
}
</script>

<style lang="scss" scoped></style>