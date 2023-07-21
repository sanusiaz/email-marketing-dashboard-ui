<template>
    <div class="flex flex-wrap">
        <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-700">
                <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full max-w-full flex-grow flex-1">
                            <h6 class="uppercase text-gray-100 mb-1 text-xs font-semibold">  Overview ( Since last 7 days )
                            </h6>
                            <h2 class="text-white text-xl font-semibold"> Bounced Emails  </h2>
                        </div>
                    </div>
                </div>
                <div class="p-4 flex-auto">
                    <div class="relative h-350-px text-white font-semibold">
                        <div class="chartjs-size-monitor">
                            <div class="chartjs-size-monitor-expand">
                                <div class=""></div>
                            </div>
                            <div class="chartjs-size-monitor-shrink">
                                <div class=""></div>
                            </div>
                        </div>

                        <LineChart />

                    </div>
                </div>
            </div>
        </div>
        <div class="w-full xl:w-4/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full max-w-full flex-grow flex-1">
                            <h6 class="uppercase text-slate-400 mb-1 text-xs font-semibold"> Performance
                            </h6>
                            <h2 class="text-slate-700 text-xl font-semibold"> Sent Emails </h2>
                        </div>
                    </div>
                </div>
                <div class="p-4 flex-auto">
                    <div class="relative h-350-px">
                        <div class="chartjs-size-monitor">
                            <div class="chartjs-size-monitor-expand">
                                <div class=""></div>
                            </div>
                            <div class="chartjs-size-monitor-shrink">
                                <div class=""></div>
                            </div>
                        </div>


                        <PerformanceChart />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import LineChart from './LineChart.vue'
import PerformanceChart from './PerformanceChart.vue'

export default {
    name: 'CombinedCharts',
    components: {LineChart, PerformanceChart},
}
</script>

<style lang="scss" scoped></style>