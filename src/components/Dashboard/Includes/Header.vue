<template>
    <nav
        class="absolute bg-[#f97316] top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"><a
                class="text-white text-sm uppercase inline-block font-semibold" href="javascript:void(0)">
                {{ title }} </a>

            <div class="hidden md:flex space-x-2 items-center align-middle">
                <SearchComponent />
                <ul class="flex-col md:flex-row list-none items-center hidden md:flex">

                    <!-- Profile Pics Components  -->
                    <ProfilePicsComponent />
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import ProfilePicsComponent from './ProfilePicsComponent.vue'
import axios from 'axios'
import SearchComponent from './SearchComponent.vue'

export default {
    name: "Header",
    data() {
        return {
            showProfileNav: false,
        };
    },
    props: {
        title: {
            type: String,
            default: "Email Marketing Platform"
        }
    },
   
    components: {
    ProfilePicsComponent, SearchComponent }
}
</script>

<style lang="scss" scoped></style>