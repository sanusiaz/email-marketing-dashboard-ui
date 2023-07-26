<template>
    <section v-if="this.schedules.length > 0" data-simplebar class="flex flex-col h-[500px] overflow-auto spaxe-x-3 py-4">
        <div class="w-full overflow-x-auto">


            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr
                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 ">
                        <th class="px-4 py-3">Id</th>
                        <th class="px-4 py-3">Subject</th>
                        <th class="px-4 py-3">Sent to</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Schedule At</th>
                        <th class="px-4 py-3">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y">
                    <tr v-for="(schedule, index) in schedules" :key="schedule.id" class="text-gray-700 ">
                        <td class="px-4 py-3">{{ index+1 }}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                                <p class="font-semibold text-left">{{ schedule.subject }}</p>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm capitalize">
                            {{ schedule.sendTo }}
                        </td>
                        <td class="px-4 py-3 text-xs">
                            <span
                                class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full  single_mail">&nbsp;
                                {{ (schedule.isQueued) ? 'Queued...' : 'Created...' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            {{ schedule.updatedAt }}
                        </td>

                        <td class="px-4 py-3 text-left text-xs flex  gap-1">

                            <router-link title="Edit Schedule" :to="{ name: 'admin-schedule-show', params: {id: schedule.id} }" class="w-[28px] h-[28px] flex align-middle items-center justify-center font-semibold cursor-pointer leading-tight text-yellow-700 bg-yellow-100 rounded-full hover:bg-yellow-700 hover:text-yellow-100"><i class="fas fa-pen"></i></router-link>
                            
                            <span 
                                @click="deleteSchedule(schedule.id)" title="Delete Selected Schedule"
                                class="w-[28px] h-[28px] flex align-middle items-center justify-center font-semibold cursor-pointer leading-tight text-red-700 bg-red-100 rounded-full duration-200 hover:duration-200 hover:bg-red-700 hover:text-red-100 "><i
                                    class="fas fa-trash"></i></span>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </section>

     <div v-else class="text-gray-600 text-2xl h-[200px] flex place-content-center place-items-center">
        No Record Found
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SchedulesAllComponents',

    data() {
        return  {
            schedules: [],
        }
    },

    methods: {
        async deleteSchedule(id) {
            this.$emit('getMessage', '')
            this.$emit('getStatusText', '')
            try {
                let __response = await axios.delete(`/schedule/${id}/delete`)
                if ( __response.status === 201 ) {
                    this.$emit('getMessage', 'Schedule Has Been Deleted Successfully')
                    this.$emit('getStatusText', 'success')

                    this.schedules = this.schedules.filter(function (__element) {
                        return __element.id !== id
                    })
                }
            } catch( error ) {
                console.error(error)
                this.$emit('getMessage', error.response.data.message)
                this.$emit('getStatusText', 'error')
            }
        }
    },

    async created() {
        await axios.get('/schedule')
            .then(res => {
                console.log(res)
                if ( res.status === 200 ) {
                    this.schedules = res.data.data
                    console.log(res.data.data)
                }
            })
            .catch( error => {
                console.error(error)
                this.$emit('getMessage', error.response.data.message)
                this.$emit('getStatusText', 'error')
            })
    },

    mounted() {
        
    }
}
</script>

<style lang="scss" scoped></style>