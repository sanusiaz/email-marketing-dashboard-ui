<template>
    <form class="flex-row flex-wrap items-center lg:ml-auto mr-3">
        <div class="relative flex w-full flex-wrap items-stretch"><span
                class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"><i
                    class="fas fa-search"></i></span>
            <input 
                @input="getSearchResults"
                @keydown="trigerButtonPressed" type="text" placeholder="Type K to search"
                class="border border-gray-800 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10 search_input" ref="search">
        </div>
    </form>


    <!-- Search Results -->
    <div 
        v-if="this.showSearchResults"
        class="fixed flex top-0 right-0 left-0 w-full place-content-center place-items-center bg-[#49484891] z-50 h-screen m-0 p-3 sm:p-0"
        style="z-index: 9999999; margin: 0px;">
        <div class="m-auto w-[500px] h-[400px] pt-10 relative overflow-y-auto bg-white rounded-md p-2" data-simplebar>           

            <!-- Input Search Components -->
            <input
                focused
                @input="getSearchResults"
                class="rounded border border-gray-400 placeholde:text-gray-400 text-sm font-Inter w-full p-2 focus:border-slate-500 outline-none focus:outline focus:outline-amber-400 search_input"
                @keydown="trigerButtonPressed" type="text" ref="search" placeholder="Type K to search">


            <div class="flex justify-between items-center align-middle">
                <span class="text gray-300 mt-5 py-2 block relative overflow-hidden">Total Results( 30 )</span>

                 <span class="flex relative right-4 top-3  align-middle items-center justify-center" @click="this.showSearchResults = false">
                <svg aria-hidden="true" class="w-[20px] h-[20px]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
            </span>

               
            </div>

            <!-- Results -->
            <ul class="text-sm flex flex-col gap-2 w-full border-t border-gray-300 ">
                <li>
                    <a href="#">This is an anchor link here</a>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SearchComponent',

    data() {
        return {
            showSearchResults: false
        }
    },
    methods: {
        async getResults() {
            try {
                // let __response = await axios.get()

            } catch (error) {
                // console.error(error)
            }
        },
        trigerButtonPressed(e) {
            
            if (e.key === 'k' || e.keycode === 191) {
                this.showSearchResults = true
            }
        },

        getSearchResults() {
            let __searchQuery = this.$refs.search.value;
            console.log(__searchQuery)
        }
    },
    mounted() {
        let __that = this;
    
    }
}
</script>

<style lang="scss" scoped></style>