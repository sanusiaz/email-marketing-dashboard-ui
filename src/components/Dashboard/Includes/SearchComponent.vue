<template>
    <form class="flex-row flex-wrap items-center lg:ml-auto mr-3">
        <div class="relative flex w-full flex-wrap items-stretch"><span
                class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"><i
                    class="fas fa-search"></i></span>
                    <input @keydown="trigerButtonPressed" type="text" placeholder="Type K to search"
                class="border border-gray-800 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10">
        </div>
    </form>


    <!-- Search Results -->
    <div v-if="showSearchResults" class="fixed flex top-0 right-0 left-0 w-full place-content-center place-items-ceter bg-[#49484891] z-50 h-screen m-0 p-3 sm:p-0" style="z-index: 9999999;">
        <div class="m-auto w-[500px] h-[400px] overflow-y-auto bg-white rounded-md p-2" data-simplebar>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quidem a exercitationem earum voluptatum cumque rerum labore amet, quod explicabo dolor odio voluptatem odit fugit, maiores ab mollitia aliquid porro.
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'SearchComponent',

        data() {
            return  {
                showSearchResults: false
            }
        },
        methods: {
            async getResults() {
                try {
                    // let __response = await axios.get()

                } catch(error) {
                    console.error(error)
                }
            },
            trigerButtonPressed(e) {

                if ( e.key === '/' || e.keycode === 191 ) {
                    // trigger search component
                    this.showSearchResults = true
                }
            }
        },
        mounted() {
            let __showsearchResults = false
            let __that = this
            $('body').keypress(function (e) {
                if ( e.originalEvent.key !== '/' ) {
                    console.log(e.originalEvent )
                }
                else {
                    __showsearchResults = 'skksksksk'
                    this.showSearchResults = true
                }
                console.log(this)
            });

            console.log(__showsearchResults)

        }
    }
</script>

<style lang="scss" scoped>

</style>