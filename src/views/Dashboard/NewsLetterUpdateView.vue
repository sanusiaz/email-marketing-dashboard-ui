<template>
    <div class="main_contents p-4 relative pt-0 pl-0 pr-0">
        <UpdateNewsLetterComponent />
    </div>
</template>

<script>
import UpdateNewsLetterComponent from '@/components/Newsletter/UpdateNewsLetterComponent.vue';

export default {
    name: "NewsLetterUpdateView",
    components: { UpdateNewsLetterComponent },
    mounted() {
        this.$emit('getTitle', 'Create New Newsletter')
        this.$emit('getActive', 'newsletter')
        this.$emit('loadLayouts', true)
    },
}
</script>

<style lang="scss" scoped></style>