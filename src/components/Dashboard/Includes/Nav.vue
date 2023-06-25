<template>
    <nav
        class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
            <div class="h-full overflow-auto" data-simplebar data-simplebar-auto-hide="false">
                <div
                    class="md:flex-col space-y-5 md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">

                    <button class="cursor-pointer text-black md:hidden px-3 py-1 text-xl leading-none  rounded border border-solid border-transparent" type="button">
                        <i class="fas fa-bars"></i>
                    </button>

                    <span class="flex-none py-2">
                        <Logo  type="text"/>
                    </span>
                    
            
                    <ul  class="md:flex-col  md:min-w-full flex flex-col list-none md:mb-4">
                        <li class="block w-full" v-for="list in navigation" :key="list.name">
                            <router-link v-if="list.toName !== ''" :class="(list.name === active) ? 'active' : ''" class="text-slate-700 hover:text-slate-500 text-sm block mb-4 no-underline font-normal capitalize" :to="{name: list.toName}"><i :class="list.icon" class="mr-2 text-slate-300 text-base"></i>{{ list.name }}</router-link>
                        </li>
                    </ul>


                    <router-link :to="{name: 'logout'}" class="text-gray-100 space-x-3 font-Inter text-sm transition-all duration-150 hover:duration-150 hover:bg-red-700 rounded-lg w-full p-3 py-2 bg-red-500 ">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </router-link>
                    <a href="" class="text-gray-100 space-x-3 font-Inter text-sm transition-all duration-150 hover:duration-150 hover:bg-green-700 rounded-lg w-full p-3 py-2 bg-green-500 ">
                        <i class="fas fa-donate"></i>
                        <span>Donate</span>
                    </a>

                </div>
            </div>
    </nav>
</template>

<script>
import Logo from './Logo.vue'

import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'

// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;

export default {
    name: "Nav",
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
    components: { Logo }
}
</script>

<style lang="scss" scoped>
.active {
    color: #076f4f;
    border-left: 3px solid #044504;
    padding-left: 10px;
}
</style>