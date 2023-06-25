<template>
    <form :method="method" :enctype="enctype" :action="action" :class="formClasses">
        <slot name="title"></slot>

        <slot name="main_form"></slot>

        <slot name="button"></slot>
        
    </form>
</template>

<script>


export default {
    name: "FormComponent",
    data() {
        return {
            title: {
                type: String,
                required: true
            },
            buttonText:{
                type: String 
            }
        };
    },
    props: {
        method: {
            type: String,
            default: ''
        },
        action: {
            type: String,
            default: ''
        },
        formClasses: {
            type: String,
            default: ''
        },
        enctype: {
            type: String,
            default:''
        }
    }
}
</script>

<style lang="scss" scoped></style>