<template>
    <div id="create_news_email_config"> 
        <div class="w-full px-2">
            <div class="relative w-full mb-3">
                <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-password"> From Name:
                </label>
                <input type="text" v-model="this.config.fromName"
                    class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="From Name">
            </div>
        </div>

        <div class="w-full px-2">
            <div class="relative w-full mb-3">
                <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-password"> From Email:
                </label>
                <input type="email" v-model="this.config.fromEmail"
                    class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="From Email">
            </div>
        </div>

        <div class="w-full px-2">
            <div class="relative w-full mb-3">
                <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-password"> Reply To Email:
                </label>
                <input type="email" v-model="this.config.replyToEmail"
                    class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Reply To Email Address">
            </div>
        </div>

        <div class="w-full px-2">
            <div class="relative w-full mb-3">
                <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-password"> Mail Server ( SMTP
                    ): </label>
                <input type="text" v-model="this.config.mailServer"
                    class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter SMTP Server">
            </div>
        </div>

        <div class="w-full px-2">
            <div class="relative w-full mb-3">
                <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-password"> Port ( 25 / 465 /
                    587 ): </label>
                <input type="number" v-model="this.config.port"
                    class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter SMTP Port">
            </div>
        </div>

        <div class="w-full px-2">
            <div class="relative w-full mb-3">
                <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-password"> Email Encryption(
                    SSL/TLS/STARTTLS ): </label>
                <input type="text" v-model="this.config.encryption"
                    class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Mail Server Encryption">
            </div>
        </div>

        <div class="w-full px-2">
            <div class="relative w-full mb-3">
                <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-password"> Username: </label>
                <input type="email" autocomplete="off" v-model="this.config.username"
                    class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Server's Username">
            </div>
        </div>

        <div class="w-full px-2">
            <div class="relative w-full mb-3">
                <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-password"> Password: </label>
                <input type="password" autocomplete="off" v-model="this.config.password"
                    class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Server's Password">
            </div>
        </div>
        <div class="w-full px-2">
            <div class="relative w-full mb-3">
                <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-number"> Daily Limits:
                </label>
                <input type="number" v-model="this.config.dailyLimits"
                    class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Set Daily Limits For This Mail Config ">
            </div>
        </div>

        <div class="p-2 pb-0 email_config_button">
            <!-- Submit Button -->
            <ButtonComponent @click.prevent="save()" title="Click to Update" type="submit"
                class="w-max bg-slate-700 transition-all duration-200 hover:duration-200 text-white font-Poppins hover:text-slate-700 border border-gray-700 hover:shadow-md p-4 py-2 rounded hover:bg-white text-sm">
                <div
                    class="flex align-center justify-center align-middle space-x-343,143,0.8)] w-max h-full relative top-0 left-0 right-0 place-content-center place-items-center">
                    <svg v-if="this.processingForm" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span class="text-center font-Inter">
                        {{ (this.processingForm) ? 'Processing...' : 'Test & Save Config' }}
                    </span>
                </div>
            </ButtonComponent>
        </div>
    </div>
</template>

<script>
import ButtonComponent from '../Auth/ButtonComponent.vue'
export default {
    name: 'CreateConfigComponent ',
    props: {
        config: {
            type: Object,
            default: {}
        },
        processingForm: {
            default: false
        }
    },
    components: {ButtonComponent},
    methods: {
        save() {
            this.$emit('getInputs', this.config)
        }
    }
}
</script>

<style lang="scss" scoped>
.email_config_button {
    button {
        font-weight: 400;
        letter-spacing: 2px;
    }
}
</style>