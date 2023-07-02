<template>
    <ScheduleComponent />
</template>

<script>
import ScheduleComponent from '../../components/Schedule/IndexComponent.vue'
export default {
    name: 'ScheduleView',
    components: { ScheduleComponent },
    mounted() {
        this.$emit('getTitle', 'Schedule')
        this.$emit('getActive', 'schedule')
        this.$emit('loadLayouts', true)
    },
}
</script>

<style lang="scss" scoped></style>