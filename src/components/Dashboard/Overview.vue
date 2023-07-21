<template>
    <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">
        <div class="px-1 sm:px-2 md:px-10 mx-auto w-full">
            <div>
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-6/12 xl:w-3/12 px-2 md:px-4" v-if="this.overviews !== null">
                        <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div class="flex-auto p-4">
                                <div class="flex flex-wrap">
                                    <div class="relative w-full pr-0 max-w-full flex-grow flex-1">
                                        <h5 class="text-blueGray-400 uppercase font-bold text-xs">TRAFFIC</h5><span
                                            class="font-semibold text-xl text-blueGray-700">{{ this.overviews.traffic.format }}</span>
                                    </div>
                                    <div class="relative w-auto pl-4 flex-initial">
                                        <div
                                            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                            <i class="far fa-chart-bar"></i>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm text-blueGray-400 mt-4"><span class="mr-2 text-emerald-500"><i
                                            class="fas fa-arrow-up"></i> {{ this.overviews.traffic.lastMonthTraffic }}% </span><span class="whitespace-nowrap">Since
                                        last month</span></p>
                            </div>
                        </div>
                    </div>
                    <div  v-if="this.overviews !== null" class="w-full lg:w-6/12 xl:w-3/12 px-2 md:px-4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div class="flex-auto p-4">
                                <div class="flex flex-wrap">
                                    <div class="relative w-full pr-0 max-w-full flex-grow flex-1">
                                        <h5 class="text-blueGray-400 uppercase font-bold text-xs">NEW SUBSCRIBERS</h5>
                                        <span class="font-semibold text-xl text-blueGray-700">{{ this.overviews.subscribers.format }}</span>
                                    </div>
                                    <div class="relative w-auto pl-4 flex-initial">
                                        <div
                                            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                                            <i class="fas fa-chart-pie"></i>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm text-blueGray-400 mt-4"><span class="mr-2 " :class="( this.overviews.subscribers.lastMonthSubscribers < 0 ) ? 'text-red-500' : 'text-emerald-500'"><i
                                            class="fas " :class="( this.overviews.subscribers.lastMonthSubscribers < 0 ) ? 'fa-arrow-down' : 'fa-arrow-up'"></i> {{ this.overviews.subscribers.lastMonthSubscribers }}% </span><span
                                        class="whitespace-nowrap">Since Last Month</span></p>
                            </div>
                        </div>
                    </div>
                    <div  v-if="this.overviews !== null" class="w-full lg:w-6/12 xl:w-3/12 px-2 md:px-4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div class="flex-auto p-4">
                                <div class="flex flex-wrap">
                                    <div class="relative w-full pr-0 max-w-full flex-grow flex-1">
                                        <h5 class="text-blueGray-400 uppercase font-bold text-xs">SENT EMAIS</h5><span
                                            class="font-semibold text-xl text-blueGray-700">{{ this.overviews.sentEmails.format }}</span>
                                    </div>
                                    <div class="relative w-auto pl-4 flex-initial">
                                        <div
                                            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                                            <i class="fas fa-users"></i>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm text-blueGray-400 mt-4"><span class="mr-2 " :class="( this.overviews.sentEmails.lastMonthSentEmails < 0 ) ? 'text-red-500' : 'text-emerald-500'"><i
                                            class="fas " :class="( this.overviews.sentEmails.lastMonthSentEmails < 0 ) ? 'fa-arrow-down' : 'fa-arrow-up'"></i> {{ this.overviews.sentEmails.lastMonthSentEmails }}% </span><span
                                        class="whitespace-nowrap">Since Last Month</span></p>
                            </div>
                        </div>
                    </div>
                    <div  v-if="this.overviews !== null" class="w-full lg:w-6/12 xl:w-3/12 px-2 md:px-4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div class="flex-auto p-4">
                                <div class="flex flex-wrap">
                                    <div class="relative w-full pr-0 max-w-full flex-grow flex-1">
                                        <h5 class="text-blueGray-400 uppercase font-bold text-xs">PERFORMANCE</h5>
                                        <span class="font-semibold text-xl text-blueGray-700">{{ this.overviews.performance.format }}%</span>
                                    </div>
                                    <div class="relative w-auto pl-4 flex-initial">
                                        <div
                                            class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-emerald-500">
                                            <i class="fas fa-percent"></i>
                                        </div>
                                    </div>
                                </div>
                                  <p class="text-sm text-blueGray-400 mt-4"><span class="mr-2 " :class="( this.overviews.performance.lastMonthPerformance < 0 ) ? 'text-red-500' : 'text-emerald-500'"><i
                                            class="fas " :class="( this.overviews.performance.lastMonthPerformance < 0 ) ? 'fa-arrow-down' : 'fa-arrow-up'"></i> {{ this.overviews.performance.lastMonthPerformance}}% </span><span
                                        class="whitespace-nowrap">Since Last Month</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Overview',
    data() {
        return {
            overviews: null
        }
    },

    methods: {
        async getTrafficData() {
            await axios.get('/overview/dashboard')
                .then( res => {
                    if ( res.status === 200 ) {
                        this.overviews = res.data.data
                    }
                } )
        }
    },
    mounted() {
        this.getTrafficData()
        setInterval(() => {
            this.getTrafficData()
        }, ( 1000 ) * 60);
    }   
}
</script>

<style lang="scss" scoped></style>