<template>
    <nav class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <a href="/"
                    class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
                    Home</a><button
                    class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"><i class="text-white fas fa-bars"></i></button>
            </div>
            <div class="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden"
                id="example-navbar-warning">
                <ul class="flex flex-col lg:flex-row list-none mr-auto">
                    <li class="flex items-center"><a
                            class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus?ref=vn-auth-navbar"><i
                                class="lg:text-slate-200 text-slate-400 far fa-file-alt text-lg leading-lg mr-2"></i>
                            Docs </a></li>
                </ul>
                <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li class="flex items-center">
                        <div>
                            <router-link class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold" :to="{name: 'login'}">Login / Register</router-link>
                        
                        </div>
                    </li>
                   
                    <li class="flex items-center"><a
                            class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            href="https://twitter.com/sanusiaz1234"
                            target="_blank"><i
                                class="lg:text-slate-200 text-slate-400 fab fa-twitter text-lg leading-lg"></i><span
                                class="lg:hidden inline-block ml-2">Tweet</span></a></li>
                    <li class="flex items-center"><a
                            class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            href="https://github.com/sanusiaz/email-marketing-dashboard-ui" target="_blank"><i
                                class="lg:text-slate-200 text-slate-400 fab fa-github text-lg leading-lg"></i><span
                                class="lg:hidden inline-block ml-2">Star</span></a></li>
                    <li class="flex items-center">
                        <a
                            class="bg-white text-slate-700 active:bg-slate-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                            href="https://buymeacoffee.com/sanusiaz" target="_blank"><i
                                class="fas fa-donate"></i> Donate </a>
                            </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavComponent'
}
</script>

<style lang="scss" scoped></style>