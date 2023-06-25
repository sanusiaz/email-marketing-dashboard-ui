<template>
    <section data-simplebar class="flex flex-col h-[500px] overflow-auto spaxe-x-3 py-4">
        <div class="w-full overflow-x-auto">


            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr
                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">Id</th>
                        <th class="px-4 py-3">Subject</th>
                        <th class="px-4 py-3">Sent to</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Schedule At</th>
                        <th class="px-4 py-3">Template</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr v-for="(schedue, index) in schedules" :key="schedue.id" class="text-gray-700 dark:text-gray-400">
                        <td class="px-4 py-3">{{ index+1 }}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                                <p class="font-semibold text-left">{{ schedue.subject }}</p>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm capitalize">
                            {{ schedue.sendTo }}
                        </td>
                        <td class="px-4 py-3 text-xs">
                            <span
                                class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100 single_mail">&nbsp;
                                {{ (schedue.isQueued) ? 'Queued...' : 'Created...' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            {{ schedue.updatedAt }}
                        </td>

                        <td class="px-4 py-3 text-left text-xs">
                            <!-- View Template Button -->
                            <a :href="schedue.templateLink" title="click to view template used"
                                class="px-2 py-1 font-semibold cursor-pointer hover:underline leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100 single_mail"><i
                                    class="fas fa-eye"></i>&nbsp; View Template </a>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SchedulesAllComponents',

    data() {

        return  {

            schedules: [
                { id: 1, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 2, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 3, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 4, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 5, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 6, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 7, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 8, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 9, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 10, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 11, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 12, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 13, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 14, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' },
                { id: 15, name: 'Some schedue name', totalEmails: 3004, folderViewLink: 'https://google.com', sentEmail: 200, queuedEmail: 200, type: 'Newsletter', templateLink: 'https://google.com', createdAt: '12 january, 2023' }
            ],
        }
    },

    async created() {
        await axios.get('/schedule')
            .then(res => {
                if ( res.status === 200 ) {
                    this.schedules = res.data.data
                    console.log(res.data.data)
                }
            })
            .catch( error => {
                this.$emit('getMessage', error.response.data.message)
                this.$emit('getStatusText', 'error')
            })
    }
}
</script>

<style lang="scss" scoped></style>