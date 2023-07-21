<template>
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
                <div class="flex flex-wrap items-center">
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 class="font-semibold text-base text-slate-700"> Page visits </h3>
                    </div>
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"><button
                            class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"> See all </button></div>
                </div>
            </div>
            <div class="block w-full overflow-x-auto">
                <table class="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            <th
                                class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Page name </th>
                            <th
                                class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Visitors </th>
                            <th
                                class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Unique users </th>
                            <th
                                class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Click rate </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="page in pageVisits" :key="page.id" >
                            <th
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                {{ page.page }} </th>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {{ page.visitors }} </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {{ page.uniqueUsers }} </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <i class="fas fa-arrow-up text-emerald-500 mr-4"></i> {{ page.clickRate }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
export default {
    name: 'PageVisits',
    data() {
        return  {
            pageVisits: []
        }
    },
     props: {
        limit: {
            type: String,
            default: '20'
        }
    },
    
    methods: {
        async getPageVisits() {
            try {
                let __response = await axios.get('/page/visits?limit='+this.limit)
                if ( __response.statusText !== 'error' && __response.status === 200 ) {
                    this.pageVisits = __response.data.data
                }
            } catch(error) {
            }
        }
    },
    mounted() {
        this.getPageVisits()
        setInterval(() => {
            this.getPageVisits()
        }, (1000) * 60);
    }
}
</script>

<style lang="scss" scoped></style>