<template>
    <div v-if="loadAllLayouts">

        <Sidebar :active="activeSidebar" />

        <!-- Content Area -->
        <div class="relative md:ml-64 bg-slate-100">
            <Header :title="title" :profilePicsURI="this.profilePicsURL"></Header>
            <div class="mb-0 sm:mb-10 md:mb-20">
                <RouterView />
            </div>
            <Footer class="relative "></Footer>
        </div>
    </div>
    <div v-else>
        <RouterView />
    </div>
</template>

<script>

import Sidebar from '@/components/Dashboard/Includes/Sidebar.vue'
import Header from '@/components/Dashboard/Includes/Header.vue'
import Footer from '@/components/Dashboard/Includes/Footer.vue'
import { RouterView, useRouter } from 'vue-router'


export default {
    name: 'IndexComponent',

    data() {
        return {
            title: 'Home',
            activeSidebar: '',
            profilePicsURL: '',
            loadAllLayouts: false
        }
    },

    props: ['user'],

    created() {
        const router = new useRouter();

        router.beforeEach((to, from, next) => {
            if (to.meta.Applayouts !== undefined && to.meta.Applayouts) {
                this.loadAllLayouts = true
            }
            else {
                this.loadAllLayouts = false
            }

            this.title = ( to.meta.title !== undefined ) ? to.meta.title : this.title
            this.activeSidebar = ( to.meta.title !== undefined ) ? to.meta.activeSidebar : this.title

            next();
        })
    },

    components: { Header, Footer, Sidebar, }
}
</script>

<style lang="scss" scoped></style>