<template>
    <div class="p-5 pb-0">

       <div class="block p-3 px-2 pb-0">
        <ButtonComponent 
        v-if="!this.isOnCreateComponent" 
        @click="this.importedComponent ='ScheduleCreateComponent'; this.isOnCreateComponent = !this.isOnCreateComponent" class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white" >Schedule New Email</ButtonComponent>


        <ButtonComponent 
         v-if="this.isOnCreateComponent"
         @click="this.importedComponent ='SchedulesAllComponents'; this.isOnCreateComponent = !this.isOnCreateComponent" class="px-5 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:duration-300 shadow-lg hover:bg-white border border-transparent right-1 w-max text-sm py-3 cursor-pointer rounded-md border-gray-100 bg-blue-600 text-white" >View all Scheduled Email</ButtonComponent>
       </div>

        <div class="md:p-3 md:pb-0">
            <component @getMessage="setMessage" @getStatusText="setStatusText" @removeComponent="removeExtraComponent" :is="this.importedComponent"></component>
        </div>
    </div>
</template>

<script>

import ButtonComponent from '../Auth/ButtonComponent.vue'
import SchedulesAllComponents from './SchedulesAllComponents.vue'
import ScheduleCreateComponent from './ScheduleCreateComponent.vue'

window.ResizeObserver = ResizeObserver;
export default {
    name: 'ScheduleTableComponent',
    data() {
        return {
            importedComponent: 'SchedulesAllComponents',
            isOnCreateComponent: false
        }
    },
    methods: {
        setStatusText(value) {
            this.$emit('getStatusText', value);
        },

        setMessage(value) {
            this.$emit('getMessage', value);
        },
        removeExtraComponent() {
            this.importedComponent = 'SchedulesAllComponents'
        }
    },
    components: { ButtonComponent, SchedulesAllComponents, ScheduleCreateComponent }
}
</script>

<style lang="scss">.popup_container {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    background: #808080ab;
    width: 100%;
    height: 100vh;
    z-index: 999;
}</style>