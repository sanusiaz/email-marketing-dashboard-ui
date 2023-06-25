<template>
    <Template >
        <template v-slot:form-components>
            <AboutComponent />
        </template>
    </Template>
</template>

<script>
import AboutComponent from '../components/AboutComponent.vue'
import Template from '../components/Auth/Template.vue'

export default {
    name: "AboutView",
    components: { AboutComponent, Template }
}
</script>

<style lang="scss" scoped></style>