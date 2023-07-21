<template>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 place-content-center place-items-center">

        <div class="text-white text-sm font-Inter flex flex-col space-y-5">
            <h1 class="font-semibold font-Inter text-2xl">Contact Us</h1>
    
            <p class="font-Poppins">Thank you for your interest in our services! We would love to hear from you and address any inquiries or feedback you may have. Please feel free to reach out to us using the contact information provided below:</p>
    
            <!-- Company Info -->
            <div class="flex flex-col space-y-2 py-4">
                <span>[Company Name]</span>
                <span>[Company Address]</span>
                <span>[City, State and Zip Code]</span>
                <span>[Phone]</span>
                <span>[Company Email]</span>
            </div>
    
            <p>Our dedicated team is available during regular business hours to assist you. Whether you have questions about our products, need assistance with an order, or simply want to provide feedback, we are here to help.</p>
    
            <p>If you prefer, you can fill out the contact form below with your details and message, and we will get back to you as soon as possible.</p>
    
            <p>We value your input and look forward to serving you. Thank you for choosing [Company Name].</p>
        </div>
    
        <!-- Contact Form  -->
    
        <section class="block relative pt-20 lg:pt-0 w-full">
            <FormComponent containerClass="w-full p-4 py-0">                    
                <template v-slot:formData>
                    <!-- Message -->
                    <div class="font-semibold text-sm text-center text-red-600 pt-0 pb-5" v-if="this.errorMessage !== '' ">{{ this.errorMessage }}</div>
                    <div class="font-semibold text-sm text-center text-green-600 pt-0 pb-5" v-if="this.successMessage !== '' && this.errorMessage === ''">{{ this.successMessage }}</div>

                    <InputComponent @inputData="setName" label="name" type="text" placeholder="Enter full name" />
                    <InputComponent @inputData="setEmail" label="email" type="email" placeholder="Enter a valid email address" />
                    <InputComponent @inputData="setPhone" label="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Enter your phone number" />
                    <InputComponent @inputData="setMessage" label="message" type="textarea" textarea="true" cols="10" rows="5" />
    
                    <div class="text-center mt-6">
                        <ButtonComponent @click.prevent="submitForm()" type="submit"> Send Message </ButtonComponent>
                    </div>
                </template>
            </FormComponent>
        </section>
    </div>
</template>

<script>
import FormComponent from './Auth/FormComponent.vue'
import InputComponent from './Auth/InputComponent.vue'
import ButtonComponent from './Auth/ButtonComponent.vue'
import axios from 'axios'

export default {
    name: "ContactComponent",
    components: { FormComponent, InputComponent, ButtonComponent },
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: '',
                phone: ''
            },
            errorMessage: '',
            successMessage: ''
        }
    },
    methods: {
        setName(value) {
            this.form.name = value
        },
        setEmail(value) {
            this.form.email = value
        },
        setMessage(value) {
            this.form.message = value
        },
        setPhone(value) {
            this.form.phone = value
        },

        async submitForm() {
            await axios.post('/contact', this.form)
                .then((response) => {
                    if ( response.status === 200 && response.statusText !== 'error' ) {
                        this.successMessage = response.data.message
                        this.form.name = this.form.email = this.form.message = this.form.phone = ''
                    }
                }).catch((error) => {
                    if ( error.response.data.message !== undefined ) {
                        this.errorMessage = error.response.data.message
                    }
                    else {
                        this.errorMessage = 'An Error Occurred'
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>