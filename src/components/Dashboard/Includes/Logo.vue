<template>
    <router-link  v-if="type === 'text'" :to="{name: 'home'}" class="md:block text-left md:pb-2 truncate  text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-0 md:p-4 md:px-0"> {{ title }} </router-link>

    <!-- This for image -->
    <img :src="src" :alt="alt" :class="class">
</template>

<script>
    export default {
        name: 'Logo',
        data() {
            return {
                title: 'Site Title'
            }
        },
        props: {
            type: {
                type: String,
                default: 'text',
                required: ''
            },
            src: {
                type: String,
                default: ''
            },
            alt: {
                type: String,
                default: ''
            },
            class: {
                type: String,
                defult: 'md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>