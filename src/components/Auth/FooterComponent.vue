<template>
    <footer class="pb-6 relative w-full bottom-0">
        <div class="container mx-auto px-4">
            <hr class="mb-6 border-b-1 border-slate-600">
            <div class="flex flex-wrap items-center md:justify-between justify-center">
                <div class="w-full md:w-4/12 px-4">
                    <div
                        class="text-sm flex space-x-3 items-center align-middle text-slate-200 font-semibold py-1 text-center md:text-left">
                        <span>Copyright © 2023</span>
                        <a href="https://pixatech.io" target="_blank"
                            class="text-white hover:text-slate-300 text-sm font-semibold py-1">
                            PixaTech </a>
                    </div>
                </div>
                <div class="w-full md:w-8/12 px-4">
                    <ul class="flex flex-wrap list-none md:justify-end justify-center">
                        <li>
                            <router-link to="/contact" class="text-white hover:text-slate-300 text-sm font-semibold block py-1 px-3">Contact Us</router-link>
                        </li>
                        <li>
                            <router-link to="/about" class="text-white hover:text-slate-300 text-sm font-semibold block py-1 px-3">About Us</router-link>
                        </li>
                        <li><a href="https://pixatech.io/blog" target="_blank"
                                class="text-white hover:text-slate-300 text-sm font-semibold block py-1 px-3">
                                Blog </a></li>
                        <li>
                            <router-link to="/api/v1" class="text-white hover:text-slate-300 text-sm font-semibold block py-1 px-3">API Resources</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent'
}
</script>

<style lang="scss" scoped></style>