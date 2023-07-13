<template>
    <div class="fixed phone_sidebar z-50 bg-white h-screen w-full top-0 right-0 left-0 overflow-y-auto bottom-0" :class="( this.closeSideNav ) ? 'slide_out' : 'slide_in'" style="margin-top: 0px; padding-top: 12px;">

        <nav class="pb-10">

            <!-- close button -->
           <button @click="closeSideNavFc()" class="cursor-pointer text-black md:hidden px-3 py-1 text-xl leading-none top-3 absolute right-1 rounded border border-solid border-transparent" type="button">
                <i class="fas fa-times"></i>
            </button>

            <div class="p-1 mt-8">
                <!-- Search Component -->
                <SearchComponent />
            </div>
            <ul class="pt-5">
                <li v-for="list in navigation">
                    <router-link class="flex align-center items-center space-x-4 capitalize p-3 border-b border-gray-200"
                        :to="{ name: list.toName }">
                        <i :class="list.icon"></i>
                        <span class="font-Inter">{{ list.name }}</span>
                    </router-link>
                </li>

            </ul>
            
           <div class="flex flex-col p-2 pt-4 gap-4">
             <router-link :to="{ name: 'logout' }"
                class="text-gray-100 space-x-3 font-Inter text-sm transition-all duration-150 block hover:duration-150 hover:bg-red-700 rounded-lg w-full p-3 py-2 bg-red-500 ">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
            </router-link>
            <a href=""
                class="text-gray-100 block space-x-3 font-Inter text-sm transition-all duration-150 hover:duration-150 hover:bg-green-700 rounded-lg w-full p-3 py-2 bg-green-500 ">
                <i class="fas fa-donate"></i>
                <span>Donate</span>
            </a>
           </div>
        </nav>
    </div>
</template>

<script>

import SearchComponent from './SearchComponent.vue'
export default {
    name: 'PhoneSidebar',
    props: ['navigation', 'active'],
    data() {
        return  {
            closeSideNav: false
        }
    },
    components: {SearchComponent},
    methods: {
        closeSideNavFc() {
            this.closeSideNav = true
            this.$emit('closeSideNav', true)
        }
    }
}
</script>

<style lang="scss" scoped>

.phone_sidebar.slide_in {
    animation: slide_toggle .3s ease-in-out;
}

.phone_sidebar.slide_out {
    animation: slide_out_toggle .3s ease-in-out;
}

@keyframes slide_toggle{
    from {
        width: 0px;
    }
    to {
        width: 100%;
    }
}

@keyframes slide_out_toggle{
    from {
        width: 100%;
    }
    to {
        width: 0px;
    }
}
.active {
    color: #076f4f;
    border-left: 3px solid #044504;
    padding-left: 10px;
}
</style>