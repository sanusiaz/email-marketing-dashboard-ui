<template>
    <Overview />
    <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <div class="flex flex-wrap">
            <div class="w-full lg:w-8/12 px-4">
                <div
                    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
                    <div class="rounded-t bg-white mb-0 px-6 py-6">
                        <div class="text-center flex justify-between">
                            <h6 class="text-slate-700 text-xl font-bold">My account</h6><button
                                @click="this.showEmailConfig = true"
                                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"> View Email Config </button>
                        </div>
                    </div>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>


                            <h6 class="text-slate-400 text-sm mt-3 mb-6 font-semibold uppercase"> User Information
                            </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Username </label>
                                        <input type="text" v-model="formData.username"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3"><label
                                            class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Email address </label><input type="email"
                                            v-model="formData.email" disabled readonly
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                            </div>


                            <hr class="mt-6 border-b-1 border-slate-300">


                            <h6 class="text-slate-400 text-sm mt-3 mb-6 font-semibold uppercase"> Contact Information
                            </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-12/12 px-4">
                                    <div class="relative w-full mb-3"><label
                                            class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Address </label><input type="text"
                                            v-model="this.formData.address"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-4/12 px-4">
                                    <div class="relative w-full mb-3"><label
                                            class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> City </label><input type="text"
                                            v-model="this.formData.city"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-4/12 px-4">
                                    <div class="relative w-full mb-3"><label
                                            class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Country </label><input type="text"
                                            v-model="this.formData.country"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-4/12 px-4">
                                    <div class="relative w-full mb-3"><label
                                            class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Postal Code </label><input type="text"
                                            v-model="this.formData.postalCode"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                            </div>


                            <!-- About -->
                            <hr class="mt-6 border-b-1 border-slate-300">
                            <h6 class="text-slate-400 text-sm mt-3 mb-6 font-semibold uppercase"> About Information </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-12/12 px-4">
                                    <div class="relative w-full mb-3"><label
                                            class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> About </label><textarea type="text"
                                            v-model="this.formData.aboutMe"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            rows="4"> {{ this.formData.aboutMe }} </textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- Social Information -->
                            <hr class="mt-6 border-b-1 border-slate-300">
                            <h6 class="text-slate-400 text-sm mt-3 mb-6 font-semibold uppercase"> Social Information </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full flex flex-col space-y-5 lg:w-12/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Facebook Profile (URI) </label>
                                        <input type="text" v-model="this.formData.facebook"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>

                                    <div class="relative w-full mb-4">
                                        <label class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Twitter Profile (URI) </label>
                                        <input type="text" v-model="this.formData.twitter"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>


                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Instagram Profile (URI) </label>
                                        <input type="text" v-model="this.formData.instagram"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>

                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Contact Email </label>
                                        <input type="text" v-model="this.formData.contactEmail"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>

                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-slate-600 text-xs font-bold mb-2"
                                            for="grid-password"> Contact Phone Number </label>
                                        <input type="tel" v-model="this.formData.phoneNumber"
                                            class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>

                                    <div class="flex w-full justify-between py-3">
                                        <!-- Update Button -->

                                        <ButtonComponent @click.prevent="saveSettings()" title="Click to Update"
                                            type="submit"
                                            class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white">
                                            <div
                                                class="flex align-center justify-center align-middle space-x-343,143,0.8)] w-max h-full relative top-0 left-0 right-0">
                                                <svg v-if="this.processingForm"
                                                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                        stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                    </path>
                                                </svg> {{ (this.processingForm) ? 'Processing' : 'Update' }}
                                            </div>
                                        </ButtonComponent>

                                        <span @click="this.showEmailConfig = true" title="Visit Email Config"
                                            class="underline text-gray-700 text-sm font-Inter cursor-pointer hover:text-blue-600">View
                                            Email Config</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-4/12 px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div class="px-6">
                        <div class="flex flex-wrap justify-center">
                            <div class="w-full px-4 flex justify-center">
                                <div class="relative w-full">
                                    <UploadImage
                                        :defaultImage="(this.profilePicsUrl !== null) ? this.profilePicsUrl : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'" />
                                </div>
                            </div>
                            <div class="w-full px-4 pt-5 text-center mt-20 font-Poppins">
                                <div class="flex justify-center py-4 lg:pt-4 pt-8">
                                    <div class="mr-4 p-3 text-center"><span
                                            class="text-xl font-semibold block uppercase tracking-wide text-slate-600">
                                            Joined Date </span><span class="text-sm text-slate-400">{{
                                                this.userInfo.joinedDate }}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-12">
                            <h3 class="text-xl font-semibold leading-normal mb-2 text-slate-700 "> {{ this.userInfo.name }}
                            </h3>
                            <div class="text-sm leading-normal mt-0 mb-2 text-slate-400 font-semibold uppercase"><i
                                    class="fas fa-map-marker-alt mr-2 text-lg text-slate-400"></i> {{ (this.contactInfo !==
                                        null) ? this.contactInfo.country : '' }},
                                {{ (this.contactInfo !== null) ? this.contactInfo.city : '' }} </div>
                        </div>
                        <div class="mt-10 py-10 border-t border-slate-200 text-center">
                            <div class="flex flex-wrap justify-center space-x-3">
                                <!-- Social Media Links -->
                                <a :href="(this.socialInfo !== null) ? this.socialInfo.facebook : '#'" target="_blank"
                                    class="" title="facebook">
                                    <i class="lg:text-slate-800 text-slate-400 fab fa-facebook text-2xl leading-lg"></i>
                                </a>

                                <a :href="(this.socialInfo !== null) ? this.socialInfo.twitter : '#'" target="_blank"
                                    class="" title="twitter">
                                    <i class="lg:text-slate-800 text-slate-400 fab fa-twitter text-2xl leading-lg"></i>
                                </a>

                                <a :href="(this.socialInfo !== null) ? this.socialInfo.instagram : '#'" target="_blank"
                                    class="" title="instagram">
                                    <i class="lg:text-slate-800 text-slate-400 fab fa-instagram text-2xl leading-lg"></i>
                                </a>

                            </div>
                        </div>

                        <div class="py-3 pb-10">
                            {{ (this.contactInfo !== null) ? this.contactInfo.about : '' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Email Config Popup -->
    <div v-if="this.showEmailConfig"
        class="fixed flex top-0 right-0 left-0 w-full place-content-center place-items-ceter bg-[#49484891] z-50 h-screen rounded-md p-3 sm:p-0">
        <ConfigComponent @showComponent="toggleEmailComponent"/>
    </div>


    <!-- Popup Message -->
    <PopupMessageComponent :popupMessage="this.popupMessage" :statusText="this.statusText"
        v-if="this.popupMessage !== ''" />
</template>

<script>
import axios from 'axios'
import Overview from './Overview.vue'
import SocialTraffic from './SocialTraffic.vue'
import PageVisits from './PageVisits.vue'
import CombinedCharts from './CombinedCharts.vue'
import PopupMessageComponent from '../PopupMessageComponent.vue'
import ButtonComponent from '../Auth/ButtonComponent.vue'
import UploadImage from '../UploadImage.vue'

import ConfigComponent from './ConfigComponent.vue'

export default {
    name: "SettingsComponent",
    data() {
        return {
            title: 'Settings',
            contactInfo: {},
            processingForm: false,
            socialInfo: {},
            userInfo: {},
            importedComponent: '',
            profilePicsUrl: '',
            formData: {
                username: '',
                email: '',
                address: '',
                city: '',
                state: '',
                country: '',
                postalCode: '',
                aboutMe: null,
                phoneNumber: '',
                contactEmail: '',
                facebook: '',
                twitter: '',
                instagram: '',

            },

            showEmailConfig: false,
            statusText: '',
            popupMessage: ''
        }
    },

    watch: {
        profilePicsUrl(value) {
            if (value !== "" && value !== null) {
                this.$emit('profilePicsURI', value)
            }
        }

    },
    async created() {
        await axios.get('/settings')
            .then((response) => {
                if (response.data !== "" && response.status === 200 && response.statusText !== 'error') {
                    this.contactInfo = response.data.contactInfo
                    this.socialInfo = response.data.socialInfo
                    this.userInfo = response.data.user

                    this.formData.username = this.userInfo.name
                    this.formData.email = this.userInfo.email

                    // Set Profile Pics URL
                    this.profilePicsUrl = response.data.user.profilePicsURI


                    if (response.data.contactInfo !== null) {

                        this.formData.address = response.data.contactInfo.address
                        this.formData.city = response.data.contactInfo.city
                        this.formData.state = response.data.contactInfo.state
                        this.formData.country = response.data.contactInfo.country
                        this.formData.postalCode = response.data.contactInfo.postalCode
                        this.formData.aboutMe = response.data.contactInfo.about

                        this.formData.phoneNumber = this.contactInfo.phoneNumber
                        this.formData.contactEmail = this.contactInfo.email
                    }


                    if (response.data.socialInfo !== null) {

                        this.formData.facebook = this.socialInfo.facebook
                        this.formData.instagram = this.socialInfo.instagram
                        this.formData.twitter = this.socialInfo.twitter
                    }

                }
            })
            .catch((error) => {
                this.statusText = 'error'
                let serverErrorMessage = (error.request.response !== undefined && error.request.response !== "") ? JSON.parse(error.request.response).message : 'Internal Server Error'
                this.popupMessage = (serverErrorMessage !== undefined) ? serverErrorMessage : error.message
            })
    },
    components: { Overview, SocialTraffic, PageVisits, CombinedCharts, PopupMessageComponent, ButtonComponent, UploadImage, ConfigComponent },

    methods: {

        async saveSettings() {
            this.processingForm = true
            this.popupMessage = this.statusText = ''
            await axios.put('/settings', this.formData)
                .then(response => {
                    if (response.statusText !== 'error' && response.status === 201) {
                        this.statusText = 'success'
                        let serverSuccessMessage = response.data.message
                        this.popupMessage = (serverSuccessMessage !== undefined) ? serverSuccessMessage : 'Updated Successfully'
                    }

                    this.processingForm = false
                })
                .catch(error => {
                    this.processingForm = false
                    this.statusText = 'error'
                    let serverErrorMessage = (error.response.data.message !== "" && error.response.data.message !== undefined) ? error.response.data.message : 'Internal Server Error'
                    this.popupMessage = (serverErrorMessage !== undefined) ? serverErrorMessage : 'Error: Please Contact Site Admin'
                })

        },

        toggleEmailComponent(value) {
            this.showEmailConfig = value
        }
    }
}
</script>