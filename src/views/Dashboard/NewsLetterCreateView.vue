<template>
    <div class="main_contents p-4 relative pt-0 pl-0 pr-0">
        <CreateNewNewsLetterComponent />
    </div>
</template>

<script>
import CreateNewNewsLetterComponent from '../../components/Newsletter/CreateNewNewsLetterComponent.vue';

export default {
    name: "NewsLetterCreateView",
    components: { CreateNewNewsLetterComponent },
    mounted() {
        this.$emit('getTitle', 'Create New Newsletter')
        this.$emit('getActive', 'newsletter')
        this.$emit('loadLayouts', true)
    },
}
</script>

<style lang="scss" scoped></style>