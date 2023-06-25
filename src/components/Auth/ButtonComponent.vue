<template>
   <button :disabled="disabled" :type="type" :class="class"> <slot></slot> </button>
</template>

<script>
    export default {
        name: 'ButtonComponent',
        props: {
            class: {
                type: String,
                default: 'bg-slate-800 relative text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
            },
            type: {
                type: String,
                default: 'submit'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>