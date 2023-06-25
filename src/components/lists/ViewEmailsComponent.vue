<template>
     <div class="overflow-y-auto  mt-3 mb-2" > 

        <span class="font-semibold capitalize block relative py-3  border-b border-gray-400">Emails in {{ folderName }}
            <router-link :to="{name: 'admin-campaign'}" class="inline-block w-max bg-blue-700 text-sm font-NotoSans text-white px-3 py-2 rounded ml-2">Create Campaign</router-link>
        </span>
        <ul class="flex flex-col max-h-[300px] space-y-2 p-2 px-5 pl-0 overflow-y-auto" data-simplebar data-simplebar-auto-hide="false">
            <li class="border-b text-sm border-gray-200 p-3 pl-0" v-for="( email, index ) in emailLists">{{ email }}</li>
        </ul>

        <!-- Edit Button -->    
        <ButtonComponent @click="this.$emit('triggerEdit', this.folderRef)" class="w-max block bg-green-500 transition-all duration-200 hover:duration-200 hover:bg-green-700 text-white font-semibold font-Poppins text-sm capitalize py-2 px-5 mt-2 rounded-md">Edit</ButtonComponent>
    </div>
</template>

<script>
import ButtonComponent from '../Auth/ButtonComponent.vue';

    export default {
    name: "ViewEmailsComponent",
    data() {
        return {};
    },
    props: {
        emailLists: {
            type: Array,
            default: []
        },
        folderName: {
            type: String,
            default: ""
        },
        folderRef: {
            type: String,
            default: ''
        }
    },
    components: { ButtonComponent }
}
</script>

<style lang="scss" scoped>

</style>