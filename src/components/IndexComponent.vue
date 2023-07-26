<template>
    <div v-if="loadAllLayouts">

        <Sidebar :active="activeSidebar" />

        <!-- Content Area -->
        <div class="relative mt-16 md:mt-0 md:ml-64 bg-slate-100">
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


    <!-- Smtp Error Popup Message -->
    <div v-if="hasSmtp" class="fixed top-0 right-0 flex place-content-center place-items-center h-screen w-full" style="z-index: 99999; background: #cfc9c996;  backdrop-filter: blur(10px);
">
        <div class="lg:w-[500px] flex flex-col gap-3">
            <span class="text-black font-Inter font-semibold text-3xl text-center flex gap-2 items-center">
                <svg class="w-[40px] text-red-600 h-[40px]" fill="none" stroke="currentColor" stroke-width="1.5"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>Smtp Error..</span>
            </span>
            <p class="text-gray-800">Please Update Your Email Config In Settings </p>

            <router-link :to="{ name: 'admin-settings' }"
                class="text-white font-semibold font-Poppins transition-all duration-200 hover:duration-200 hover:bg-white border border-transparent hover:border-blue-700 hover:text-blue-700 hover:shadow-orange-50 hover:shadow-md bg-blue-700 rounded p-3  w-max relative py-2 text-sm flex items-center gap-2">
                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"  class="w-[30px] h-[30px]"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59">
                    </path>
                </svg>
                <span>Go To Settings</span>
            </router-link>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

import Sidebar from '@/components/Dashboard/Includes/Sidebar.vue'
import Header from '@/components/Dashboard/Includes/Header.vue'
import Footer from '@/components/Dashboard/Includes/Footer.vue'
import { RouterView, useRouter } from 'vue-router'


export default {
    name: 'IndexComponent',

    methods: {
        async checkSmtp(name) {
            if ( name !== "admin-settings" ) {
                // check if the user have smtp setup successfully
                this.hasSmtp = false
                let __response = await axios.get('/check/smtp')
                if ( __response.status === 200 && __response.statusText !== 'error' ) {
                    if ( __response.data.count !== null && __response.data.count > 0 ) {
                        this.hasSmtp = true
                    }
                }
            }
            else {
                this.hasSmtp = false
            }
        },
    },
    data() {
        return {
            title: 'Home',
            activeSidebar: '',
            profilePicsURL: '',
            loadAllLayouts: false,
            hasSmtp: false
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

            if ( to.name!== 'admin-settings' ) {
                this.checkSmtp(to.name)
            }
            else {
                this.hasSmtp = false
            }

            this.title = (to.meta.title !== undefined) ? to.meta.title : this.title
            this.activeSidebar = (to.meta.title !== undefined) ? to.meta.activeSidebar : this.title

            next();
        })
    },

    components: { Header, Footer, Sidebar, }
}
</script>

<style lang="scss" scoped></style>