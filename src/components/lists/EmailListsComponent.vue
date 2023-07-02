<template>
   
    <div class="main_contents pt-32 px-10">
        <h2 class="text-black text-3xl font-Poppins font-semibold">All Folders</h2>

    </div>

    <!-- Folders Lists -->
    <EmailListsTableComponents />

</template>

<script>
import EmailListsTableComponents from './EmailListsTableComponents.vue'
export default {
    name: "EmailListsComponent",
    data() {
        return {
            title: 'Email Lists / Folders',
            errorMessage: ''
        }
    },
    components: { EmailListsTableComponents }
}
</script>

<style lang="scss" scoped></style>