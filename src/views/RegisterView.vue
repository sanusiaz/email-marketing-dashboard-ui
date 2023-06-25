<template>
    <Template >
        <template v-slot:form-components>
            <RegisterComponent />
        </template>
    </Template>
</template>

<script>
import Template from '../components/Auth/Template.vue'
import RegisterComponent from '../components/Auth/RegisterComponent.vue'

export default {
    name: "RegisterView",
    components: { RegisterComponent, Template }
}
</script>

<style lang="scss" scoped></style>