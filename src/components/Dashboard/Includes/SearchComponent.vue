<template>
    <form class=" flex-row flex-wrap items-center lg:ml-auto mr-3">
        <div class="relative flex w-full flex-wrap items-stretch"><span
                class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"><i
                    class="fas fa-search"></i></span>
                    <input type="text" placeholder="Search here..."
                class="border border-gray-800 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10">
        </div>
    </form>
</template>

<script>
    export default {
        name: 'SearchComponent'
    }
</script>

<style lang="scss" scoped>

</style>