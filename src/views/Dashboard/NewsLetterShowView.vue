<template>
    <div class="main_contents p-4 relative pt-0 pl-0 pr-0">
        <ShowNewsLetterComponent />
    </div>
</template>

<script>
import ShowNewsLetterComponent from '@/components/Newsletter/ShowNewsLetterComponent.vue';

export default {
    name: "NewsLetterShowView",
    components: { ShowNewsLetterComponent }
}
</script>

<style lang="scss" scoped></style>