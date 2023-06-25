<template>
   <Template >
        <template v-slot:form-components>
            <LoginComponent />
        </template>
    </Template>
</template>

<script>
import LoginComponent from '../components/Auth/LoginComponent.vue'
import Template from '../components/Auth/Template.vue'
export default {
    name: 'LoginView',
    data() {
        return {

        }
    },
    components: { LoginComponent, Template }
}
</script>

<style lang="scss" scoped>
body {
    background-blend-mode: overlay;
    background-color: #3f3b3b;
}
</style>