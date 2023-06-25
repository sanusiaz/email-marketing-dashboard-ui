<template>
    <Template >
        <template v-slot:form-components>
            <ContactComponent />
        </template>
    </Template>
</template>

<script>
import ContactComponent from '../components/ContactComponent.vue'
import Template from '../components/Auth/Template.vue'

export default {
    name: "ContactView",
    components: { ContactComponent, Template }
}
</script>

<style lang="scss" scoped></style>