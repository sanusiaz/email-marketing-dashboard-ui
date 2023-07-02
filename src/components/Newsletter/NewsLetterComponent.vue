<template>       
    <div class="main_contents pt-32 px-10">
        <h2 class="text-black text-3xl font-Poppins font-semibold">All Newsletter</h2>

    </div>

    <!-- Campaigns -->
    <NewsLetterTableComponent />

</template>

<script>
import NewsLetterTableComponent from './NewsLetterTableComponent.vue'

export default {
    name: "NewsLetterComponent",
    data() {
        return {
            title: 'Newsletter',
        }
    },
    components: {  NewsLetterTableComponent }
}
</script>

<style lang="scss" scoped></style>