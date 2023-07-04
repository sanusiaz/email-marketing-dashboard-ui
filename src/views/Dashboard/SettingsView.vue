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
                alert('Profile Pics has been changed')
                alert(value)
                this.$emit('profilePics', value)
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>