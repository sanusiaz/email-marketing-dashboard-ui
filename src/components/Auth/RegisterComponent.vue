<template>
    <div class="flex content-center items-center justify-center h-full">
        <FormComponent>
            <template v-slot:title>
                <h6 class="text-slate-500 text-sm font-bold">{{ title }}</h6>
            </template>

            <template v-slot:formData>

                <!-- Message -->
                <div class="font-semibold text-sm text-center text-red-600 pt-0 pb-5" v-if="this.errorMessage !== '' ">{{ this.errorMessage }}</div>
                <div class="font-semibold text-sm text-center text-green-600 pt-0 pb-5" v-if="this.successMessage !== '' && this.errorMessage === ''">{{ this.successMessage }}</div>

                <InputComponent @inputData="setName" label="username" type="text" placeholder="Choose a username" />
                <InputComponent @inputData="setEmail" label="email" type="email" placeholder="Enter a valid email address" />
                <InputComponent @inputData="setPassword" label="password" type="password" placeholder="Choose a password" />
                <InputComponent @inputData="setConfirmPassword" label="Confirm Password" type="password" placeholder="Re-Enter Your Password" />

                <div class="text-center mt-6">
                    <ButtonComponent  @click.prevent="submitForm()" type="submit">
                        <div class="flex align-center justify-center align-middle space-x-343,143,0.8)] w-full h-full relative top-0 left-0 right-0">
                            <svg v-if="this.processingForm" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg> {{  ( this.processingForm  ) ? 'Processing' : 'Register'  }}
                        </div>
                    </ButtonComponent>
                </div>
            </template>

            <template v-slot:auth-navigations>
                <div class="flex flex-wrap mt-6 relative">
                    <div class="w-1/2">
                        <router-link to="/forget-password" class="text-slate-200 text-sm">Forget Password</router-link>
                    </div>
                    <div class="w-1/2 text-right">
                        <router-link to="/login" class="text-slate-200 text-sm">Already have an account</router-link>
                    </div>
                </div>
            </template>
        </FormComponent>
    </div>
</template>

<script>

// Where to redirect when users account has been verified
// Test 
// const REDIRECTURL = 'http://localhost:5173/login'

// Live
// const REDIRECTURL = 'https://app.regnotradesmailer.com/login'
const REDIRECTURL = 'https://mailer.jobscarriers.com'


import axios from 'axios'
import ButtonComponent from './ButtonComponent.vue';
import FormComponent from './FormComponent.vue';
import InputComponent from './InputComponent.vue';

export default {
    name: "RegisterComponent",
    data() {
        return {
            title: "Create An Account",
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                redirectURL: REDIRECTURL
            },
            processingForm: false,
            errorMessage: '',
            successMessage: '',
        };
    },


    methods: {
        setName(value) {
            this.form.name = value
        }, 

        setEmail(value) {
            this.form.email = value
        },

        setPassword(value) {
            this.form.password = value
        },
        setConfirmPassword(value) {
            this.form.password_confirmation = value
        },

        /**
         * Submit Register Request and process all form data
         */
        async submitForm() {
            this.errorMessage = ''
            this.successMessage = ''
            if ( this.form.password !== "" && this.form.email !== "" && this.form.name ) {
                this.processingForm = true
                try {
                    let __response = await axios.post('/auth/register', this.form)
                    let message = __response.data.message;
                    this.successMessage = message

                    this.processingForm = false
                } catch( error ) {
                    this.processingForm = false
                    if ( error.response.data.message !== '' ) {
                        this.errorMessage = error.response.data.message
                    }
                }
            }
            else {
                this.errorMessage = 'Please Fill all Inputs'
            }

        }
    },
    components: { InputComponent, ButtonComponent, FormComponent }
}
</script>