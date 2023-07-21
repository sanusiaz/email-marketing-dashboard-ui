<template>
     <div style="background-blend-mode: overlay; background-color: #3f3b3b;" class="min-h-screen text-slate-700 antialiased bg-[url('./img/bg_1.jpg')] bg-cover bg-center">
        <NavComponent />
        <main>
            <section class="relative w-full h-full py-24 md:py-32 lg:py-36">
                <div class="container mx-auto px-4 h-full">
                    <slot name="form-components"></slot>
                </div>
                
            </section>
        </main>

        <FooterComponent />
    </div>
</template>

<script>
import NavComponent from './NavComponent.vue'
import FooterComponent from './FooterComponent.vue'

    export default {
    name: "Template",
    components: { NavComponent, FooterComponent }
}
</script>

<style lang="scss" scoped>

</style>