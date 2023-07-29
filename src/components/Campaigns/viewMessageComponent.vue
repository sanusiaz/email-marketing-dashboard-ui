<template>
    <form @submit.prevent="submitForm()" class="py-3">
        <span class="font-medium text-xl text-center font-Poppins">Campaign Message</span>
        <hr class="my-2">

        <small>Please Note: Changing this message will only update message for new processes. All Sent/Queued Message cannot be changed.</small>

        <!-- Message Area -->
        <div class="overflow-y-auto max-h-[300px] mt-3 mb-2" style="z-index: 9999;" data-simplebar data-simplebar-auto-hide="false">
            <label for="message" class="flex flex-col mb-3 w-full space-y-3 pr-4">
                <span class="text-sm font-semibold text-left font-Poppins">Message: </span>
                <textarea style="height: 500px;" v-model="this.formData.message" name="message" id="message"
                    class="rounded-md bg-white p-3 w-full text-sm placeholder:text-gray-400"
                    placeholder="Enter Message Here">{{ this.formData.message }}</textarea>
            </label>
        </div>
        <!-- Edit Button -->
        <ButtonComponent @click.prevent="submitForm()" type="submit" class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
            <div class="flex align-center justify-center align-middle space-x-343,143,0.8)] w-max h-full relative top-0 left-0 right-0">
                <svg v-if="this.processingForm" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> {{  ( this.processingForm  ) ? 'Processing' : 'Update Message'  }}
            </div>
        </ButtonComponent>
    </form>

     <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>

    import axios from 'axios'
    import ButtonComponent from '@/components/Auth/ButtonComponent.vue'
    import PopupMessageComponent from '@/components/PopupMessageComponent.vue'

    import InitTinyMce from '../../services/InitTinyMce'

    export default {
        name: 'viewMessageComponent',
        data() {
            return {
                formData: {
                    message: ''
                },
                processingForm: false,
                statusText: '',
                popupMessage: ''
            }
        },

        props: {
            id: {
                default: null
            }
        },
        
        components: {ButtonComponent, PopupMessageComponent},

        methods: {

            // Update Campaign Message
            async submitForm() {

                this.statusText = this.popupMessage = ''
                this.processingForm = true
                try {
                    let __response = await axios.post(`/campaigns/${this.id}/message`, this.formData)

                    if ( __response.status === 201 ) {

                        alert('Updated Successfully')
                        this.statusText = 'success'
                        this.popupMessage = __response.data.message
                    }
                    else {
                        this.statusText = 'error'
                        this.popupMessage = 'An Error Occurred. Please Try Again'
                    }
                } catch( error ) {
                    this.statusText = 'error'
                    let serverErrorMessage = (error.request.response !== undefined
                    && error.request.response !== '') 
                    ? JSON.parse(error.request.response).message 
                    : 'Internal Server Error'
                    
                    this.popupMessage = ( serverErrorMessage !== undefined ) ? serverErrorMessage : error.message
                }
                this.processingForm = false
                InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);
            },



        },

        async mounted() {
            InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);


            // get campaign message
            this.popupMessage = this.statusText = ''
            if ( this.id !== "" && this.id !== undefined ) {
                try {
                    let __response = await axios.get(`/campaigns/${this.id}/message`)

                    if ( __response.status === 200 && __response.statusText !== 'error' ) {
                        this.formData.message = __response.data;
                        this.statusText = 'success'
                        this.popupMessage = 'Parsing Contents'
                        InitTinyMce.initTinyMce('textarea#message', this.formData, this.$el);
                    }
                    else {
                        this.statusText = 'error'
                        this.popupMessage = 'Cannot Get Message At The Moment'
                    }
                }catch( error ) {
                    this.statusText = 'error'
                    let serverErrorMessage = (error.request.response !== undefined
                        && error.request.response !== '') 
                            ? JSON.parse(error.request.response).message 
                            : 'Internal Server Error'

                    this.popupMessage = ( serverErrorMessage !== undefined ) ? serverErrorMessage : error.message
                }
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>