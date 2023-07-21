<template>
    <div class="w-full xl:w-4/12 px-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">

            <div class="rounded-t mb-0 px-4 py-3 border-0">
                <div class="flex flex-wrap items-center">
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 class="font-semibold text-base text-slate-700"> Social traffic </h3>
                    </div>
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"><button
                            class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"> See all </button></div>
                </div>
            </div>
            <div class="block w-full overflow-x-auto">
                <table class="items-center w-full bg-transparent border-collapse">
                    <thead class="thead-light">
                        <tr>
                            <th
                                class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Referral </th>
                            <th
                                class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Visitors </th>
                            <th
                                class="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                            </th>
                        </tr>
                    </thead>
                    <tbody>                        
                        <tr v-for="socialTraffic in socialTraffic" :key="socialTraffic.id">
                            <th
                                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                {{ socialTraffic.parsedUrl.host.split("www.")[1].split('.com').shift() }} </th>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {{ socialTraffic.visitors }} </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div class="flex items-center"><span class="mr-2">{{ socialTraffic.clickRate }}%</span>
                                    <div class="relative w-full">
                                        <div class="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                                            <div style="width:80%;"
                                                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from  'axios'
export default {
    name: 'SocialTraffic',
    data() {
        return  {
            socialTraffic: []
        }
    },
    props: {
        limit: {
            type: String,
            default: '20'
        }
    },
     methods: {
        async getSocialTraffic() {
            try {
                let __response = await axios.get('/social/visits?limit='+this.limit)
                if ( __response.statusText !== 'error' && __response.status === 200 ) {
                    this.socialTraffic = __response.data.data
                }
            } catch(error) {
                console.log(error)
            }
        }
    },
    mounted() {
        // Run This Request every 4sec
        this.getSocialTraffic()
        setInterval(() => {
            this.getSocialTraffic()
        }, (1000) * 60);
    }
}
</script>

<style lang="scss" scoped></style>