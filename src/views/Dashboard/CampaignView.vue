<template>
    <div class="main_contents p-4 relative pt-0 pl-0 pr-0">
        <CampaignComponent />
    </div>
</template>

<script>
import CampaignComponent from '../../components/Campaigns/CampaignComponent.vue';

export default {
    name: "CampaignView",
    components: { CampaignComponent }
}
</script>

<style lang="scss" scoped></style>