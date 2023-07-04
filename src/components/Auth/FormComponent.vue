<template>
    <div :class="containerClass">
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
            <div class="rounded-t mb-0 px-6 py-6">
                <div class="text-center mb-3">

                    <slot name="title"></slot>
                    
                </div>

                <hr class="mt-6 border-b-1 border-slate-300">
            </div>
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form :action="action" :method="method">
                    <slot name="formData"></slot>
                </form>
            </div>
        </div>

        <slot name="auth-navigations"></slot>
        
    </div>
</template>

<script>
export default {
    name: 'FormComponent',
    props: {
        containerClass: {
            type: String,
            default: 'w-full lg:w-[600px] px-6'
        },
        action: {
            type: String,
            default: '/'
        },
        method: {
            type: String,
            default: 'POST'
        }
    }
}
</script>

<style lang="scss" scoped></style>