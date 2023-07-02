<template>
    <div class="main_contents p-4 relative pt-0 pl-0 pr-0">
        <NewsLetterComponent />
    </div>
</template>

<script>
import NewsLetterComponent from '../../components/Newsletter/NewsLetterComponent.vue';

export default {
    name: "NewsLetterView",
    components: { NewsLetterComponent },
    mounted() {
        this.$emit('getTitle', 'Newsletter')
        this.$emit('getActive', 'newsletter')
        this.$emit('loadLayouts', true)
    },
}
</script>

<style lang="scss" scoped>

</style>