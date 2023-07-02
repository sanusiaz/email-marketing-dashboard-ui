<template>
    <SubscribersComponent />
</template>

<script>
import SubscribersComponent from '../../components/Subscriber/IndexComponent.vue'
export default {
    name: 'SubscribersView',
    components: { SubscribersComponent },
    mounted() {
        this.$emit('getTitle', 'Subscribers')
        this.$emit('getActive', 'subscribers')
        this.$emit('loadLayouts', true)

    },
}
</script>

<style lang="scss" scoped></style>