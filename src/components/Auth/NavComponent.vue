<template>
    <nav class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <a href="#/"
                    class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
                    PixaTech</a><button
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
                         
                            <div
                                class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 hidden">
                                <span
                                    class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-slate-400">
                                    Admin Layout </span><a href="#/admin/dashboard"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                                    Dashboard </a><a href="#/admin/settings"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                                    Settings </a><a href="#/admin/tables"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                                    Tables </a><a href="#/admin/maps"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                                    Maps </a>
                                <div class="h-0 mx-4 my-2 border border-solid border-slate-100"></div>
                                <span
                                    class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-slate-400">
                                    Auth Layout </span><a aria-current="page" href="#/auth/login"
                                    class="router-link-active router-link-exact-active text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                                    Login </a><a href="#/auth/register"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                                    Register </a>
                                <div class="h-0 mx-4 my-2 border border-solid border-slate-100"></div>
                                <span
                                    class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-slate-400">
                                    No Layout </span><a href="#/landing"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                                    Landing </a><a href="#/profile"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
                                    Profile </a>
                            </div>
                        </div>
                    </li>
                    <li class="flex items-center"><a
                            class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fvue-notus%2F%23%2F"
                            target="_blank"><i
                                class="lg:text-slate-200 text-slate-400 fab fa-facebook text-lg leading-lg"></i><span
                                class="lg:hidden inline-block ml-2">Share</span></a></li>
                    <li class="flex items-center"><a
                            class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fvue-notus%2F%23%2F&amp;text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20VueJS%20UI%20Kit%20and%20Admin.%20Let%20Vue%20Notus%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                            target="_blank"><i
                                class="lg:text-slate-200 text-slate-400 fab fa-twitter text-lg leading-lg"></i><span
                                class="lg:hidden inline-block ml-2">Tweet</span></a></li>
                    <li class="flex items-center"><a
                            class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            href="https://github.com/creativetimofficial/vue-notus?ref=vn-auth-navbar" target="_blank"><i
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