<template>
    <div>

        <Sidebar active="lists" />

        <!-- Content Area -->
        <div class="relative md:ml-64 bg-slate-100">
            <Header :title="title"></Header>

            <div class="main_contents p-4 relative pt-0 pl-0 pr-0">
                <div class="main_contents pt-32 px-10">
                    <h2 class="text-black text-3xl font-Poppins font-semibold">All Folders</h2>

                </div>

                <!-- Folders Lists -->
               <EmailListsTableComponents />

            </div>
           
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Sidebar from '../Dashboard/Includes/Sidebar.vue'
import Header from '../Dashboard/Includes/Header.vue'
import Footer from '../Dashboard/Includes/Footer.vue'
import EmailListsTableComponents from './EmailListsTableComponents.vue'

export default {
    name: "EmailListsComponent",
    data() {
        return {
            title: 'Email Lists / Folders',
            errorMessage: ''
        }
    },
    components: { Sidebar, Header, Footer, EmailListsTableComponents }
}
</script>

<style lang="scss" scoped></style>