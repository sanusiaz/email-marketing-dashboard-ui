<template>
    <nav
        class="absolute bg-[#f97316] top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"><a
                class="text-white text-sm uppercase hidden lg:inline-block font-semibold" href="javascript:void(0)">
                {{ title }} </a>
            <form class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                <div class="relative flex w-full flex-wrap items-stretch"><span
                        class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"><i
                            class="fas fa-search"></i></span><input type="text" placeholder="Search here..."
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10">
                </div>
            </form>
            <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
                <div>
                    <a @click="this.showProfileNav = !this.showProfileNav" class="text-blueGray-500 block" href="#">
                        <div class="items-center flex">
                            <span
                                class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                                <img
                                    alt="..." class="w-full h-full rounded-full align-middle border-none shadow-lg"
                                    :src="this.profilePicsUrl">
                            </span>
                        </div>
                    </a>
                    <div
                        class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" :class="{'hidden': !showProfileNav}" style="    position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(1015px, 64px);">
                        <a href="javascript:void(0);"
                            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                            Action </a><a href="javascript:void(0);"
                            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                            Another action </a><a href="javascript:void(0);"
                            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                            Something else here </a>
                        <div class="h-0 my-2 border border-solid border-blueGray-100"></div><a href="javascript:void(0);"
                            class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                            Seprated link </a>
                    </div>
                </div>
            </ul>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Header',
    data() {
        return {
            showProfileNav: false,
            profilePicsUrl: ''
        }
    },
    props: {
        title: {
            type: String,
            default: 'Email Marketing Platform'
        }
    },

    async created() {
        // Get Users Profile Pics
        await axios.get('/profile-pics')
            .then(response => {
                if ( response.data.data !== undefined && response.status === 200 ) {
                    this.profilePicsUrl = response.data.data

                    this.$emit('profilePicsUrl', this.profilePicsUrl)
                }
            })
    },
}
</script>

<style lang="scss" scoped></style>