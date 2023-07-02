<template>
    <EmailListsComponent />
</template>

<script>
import EmailListsComponent from '../../components/lists/EmailListsComponent.vue';

export default {
    name: "EmailListView",
    components: { EmailListsComponent },
    mounted() {
        this.$emit('getTitle', 'Email Lists')
        this.$emit('getActive', 'lists')
        this.$emit('loadLayouts', true)
    },
}
</script>

<style lang="scss" scoped></style>