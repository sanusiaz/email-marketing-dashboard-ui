<template>
    <div>
        <SettingsComponents  @profilePicsURI="setProfilePics"/>
    </div>
</template>

<script>
import SettingsComponents from '../../components/Dashboard/SettingsComponents.vue';

export default {
    name: "SettingsView",
    components: { SettingsComponents },
    methods: {
        setProfilePics(value) {
            if ( value !== "" ) {
                this.$emit('profilePics', value)
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>