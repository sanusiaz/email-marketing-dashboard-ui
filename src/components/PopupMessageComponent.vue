<template>
    <!-- Popup Messages -->
    <div 
        v-if="this.showPopup === true && this.message !== ''"
        class="rounded-md z-50 max-w-[300px] popup_message text-xs font-semibold font-Poppins p-4 px-5 text-center border  fixed overflow-hidden top-10 md:top-16 lg:top-28 right-10" :class="( this.statusText === 'error' ) ? 'border-red-700 bg-red-200' : 'border-green-700 bg-green-200'">
        <div class="relative">
            {{ this.message }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PopupMessageComponent',
        props: {
            statusText: {
                type: String,
                default: 'error'
            },

            popupMessage: {
                default: '',
                required: true
            }
        },

        data() {
            return {
                showPopup: true,
                status: '',
                message: '',
                timeOut: 5000
            }
        },

        mounted() {
            this.status = this.statusText
            this.message = this.popupMessage
            setTimeout(() => {
                this.showPopup = false
                this.status = ''
                this.message = ''
            }, this.timeOut)

        },
    }
</script>

<style lang="scss" scoped>
    .popup_message .relative::after {
        position: absolute;
        content: "";
        border-top: 3px solid rgb(102, 102, 102);
        top: -100%;
        width:125%;
        left: -19px;
        animation: 5s progressbar ease-in;
    }

    @keyframes progressbar {
        from {
            width: 0%;
        }
        to {
            width: 125%;
        }
    }
</style>