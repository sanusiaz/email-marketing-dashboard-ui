<template>
    <Template >
        <template v-slot:form-components>
            <ForgetPasswordComponent />
        </template>
    </Template>
</template>

<script>
import Template from '../components/Auth/Template.vue'
import ForgetPasswordComponent from '../components/Auth/ForgetPasswordComponent.vue'
export default {
    name: 'ForgetPasswordView',
    data() {
        return {

        }
    },
    components: { ForgetPasswordComponent, Template }
}
</script>

<style lang="scss" scoped>
body {
    background-blend-mode: overlay;
    background-color: #3f3b3b;
}
</style>