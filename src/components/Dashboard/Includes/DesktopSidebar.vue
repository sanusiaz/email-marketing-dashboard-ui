<template>
    <ul class="md:flex-col hidden md:flex md:min-w-full  flex-col list-none md:mb-4">
        <li class="block w-full" v-for="list in navigation" :key="list.name">
            <router-link v-if="list.toName !== ''" :class="(list.name === this.active) ? 'active' : ''"
                class="text-slate-700 hover:text-slate-500 text-sm block md:mb-4 no-underline font-normal capitalize p-0"
                :to="{ name: list.toName }"><i :class="list.icon" class="mr-2 text-slate-300 text-base"></i>{{ list.name
                }}</router-link>


        </li>
    </ul>

    <router-link :to="{ name: 'logout' }"
        class="text-gray-100 space-x-3 font-Inter text-sm transition-all duration-150 hidden md:block hover:duration-150 hover:bg-red-700 rounded-lg w-full p-3 py-2 bg-red-500 ">
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
    </router-link>
    <a href="https://buymeacoffee.com/sanusiaz" target="_blank"
        class="text-gray-100 space-x-3 font-Inter text-sm transition-all duration-150 hover:duration-150 hover:bg-green-700 rounded-lg w-full p-3 py-2 bg-green-500 hidden md:block">
        <i class="fas fa-donate"></i>
        <span>Donate</span>
    </a>
</template>

<script>
export default {
    name: 'DesktopSidebar',
    props: ['navigation', 'active'],
    mounted() {
        this.$emit('closeSideNav', false)
    }
}
</script>

<style lang="scss" scoped>
.active {
    color: #076f4f;
    border-left: 3px solid #044504;
    padding-left: 10px;
}
</style>