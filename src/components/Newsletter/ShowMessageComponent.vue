<template>
    <div class="main_contents pt-5 px-10 pb-5 bg-gray-400 h-screen overflow-auto ">

        <div class="m-auto md:max-w-[700px] bg-white p-2 rounded">
            <router-link :to="{ name: 'admin-news   letter-show', params: { id: this.newsletterId } }"
                class="font-semibold font-OpenSans py-2 relative w-max text-sm text-white bg-blue-600 rounded p-1 px-4 flex gap-2 align-middle items-center duration-200 hover:duration-200 hover:bg-white border border-blue-700 hover:shadow-md hover:text-blue-700 mb-3">
                <i class="fas fa-chevron-left"></i>
                <span>Back</span>
            </router-link>  
            <div v-html="this.message" class="overflow-auto block relative"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ShowMessageComponent',
    data() {
        return {
            message: '',
            newsletterId: null
        }
    },

    methods: {
        /**
         * Get Newsletter Message
         */
        async getMessage(id) {
            try {
                let __response = await axios.get(`/newsletters/${id}/message`)
                this.message = __response.data.message
                let __uuid = __response.data.uuid;

                if (this.message === null) {
                    try {
                        let response = await axios.get(`/templates/${__uuid}`)
                        if (response.status === 200) {
                            this.message = response.data
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
    },

    created() {
        let __newsletterId = this.$route.params.id;
        if (__newsletterId !== undefined) {
            this.newsletterId = __newsletterId
        }
    },

    async mounted() {
        this.getMessage(this.newsletterId)
    }
}
</script>

<style lang="scss" scoped></style>