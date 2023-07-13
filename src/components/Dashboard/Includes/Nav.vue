<template>
    <nav
        class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 md:py-4 px-6">
        <div class="h-full w-full overflow-auto" data-simplebar data-simplebar-auto-hide="false">
            <div
                class="md:flex-col space-y-5 md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">

                <button @click="showSideNav()"
                    class="cursor-pointer text-black md:hidden px-3 py-1 text-xl leading-none  rounded border border-solid border-transparent"
                    type="button">
                    <i class="fas fa-bars" v-if="!isSidebarActive"></i>
                    <i class="fas fa-times" v-if="isSidebarActive"></i>
                </button>

                <div class="flex items-center align-middle" style="margin-top: 0px; padding: 7px 0px;">
                    <span class="flex-none m-0 p-0 md:py-2" style="margin: 0px;">
                        <Logo class="p-0 m-0" type="text" />
                    </span>

                    <div class="block md:hidden">
                        <!-- Profile Pics Components  -->
                        <ProfilePicsComponent />
                    </div>
                </div>

                <component @closeSideNav="triggerCloseSidenav" :is="this.sidebarComponent" :navigation="this.navigation"
                    :active="this.active"></component>



            </div>
        </div>
    </nav>
</template>

<script>

import ProfilePicsComponent from './ProfilePicsComponent.vue'
import Logo from './Logo.vue'
import DesktopSidebar from './DesktopSidebar.vue'
import PhoneSidebar from './PhoneSidebar.vue'

import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;

export default {
    name: "Nav",
    data() {
        return {
            isSidebarActive: false,
            sidebarComponent: 'DesktopSidebar'
        }
    },
    props: {
        navigation: {
            type: Object,
            required: true
        },
        active: {
            type: String,
            default: ''
        }
    },

    methods: {
        showSideNav() {
            this.isSidebarActive = !this.isSidebarActive
            this.sidebarComponent = 'PhoneSidebar'
        },
        triggerCloseSidenav(value) {
            if (value) {
                this.isSidebarActive = false
                this.sidebarComponent = ''
            }
        }
    },
    components: { Logo, DesktopSidebar, PhoneSidebar, ProfilePicsComponent }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px) {
    nav {
        // width:  100px;
    }
}

@media screen and (min-width: 0px) and (max-width: 800px) {
    nav {
        position: fixed;
        top: 0px;
        background: white;
        left: 0px;
        right: 0px;
        width: 100%;
        margin: 0px;
        z-index: 99;
    }
}
</style>