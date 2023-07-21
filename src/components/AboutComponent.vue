<template>

    <div class="grid grid-cols-1 gap-8 place-content-center place-items-center">

        <div class="text-white text-sm font-Inter flex flex-col space-y-10">
            <h1 class="font-semibold font-Inter text-2xl">About Us</h1>
    
            <p class="font-Poppins">Welcome to [Your Company Name]! We are dedicated to providing [description of your products/services] to [target audience]. With [number] years of experience in the industry, we have built a reputation for delivering [quality/innovation/excellence] that exceeds our customers' expectations.</p>
    
            <h3 class="font-semibold text-white capitalize ">Our Mission: </h3>
            <ul class="flex flex-col gap-2 list-disc p-0 m-0 mt-1">
                <li>
                    At [Your Company Name], our mission is to [mission statement]. We strive to [goal 1], [goal 2], and [goal 3] to ensure that our customers receive [benefits of your products/services]. We are committed to [core value 1], [core value 2], and [core value 3], which form the foundation of our business.
                </li>
            </ul>

            <h3 class="font-semibold text-white capitalize">Our Products/Services:</h3>
            <ul class="flex flex-col gap-2 list-disc p-0 m-0 mt-1">
                <li>
                    We offer a wide range of [products/services] designed to [address customer needs/solve specific problems]. Whether you are looking for [specific product/service], [specific product/service], or [specific product/service], we have you covered. Our team works tirelessly to [describe unique selling points of your products/services].
                </li>
            </ul>

            <h3 class="font-semibold text-white capitalize">Customer Satisfaction:</h3>
            <ul class="flex flex-col gap-2 list-disc p-0 m-0 mt-1">
                <li>At [Your Company Name], customer satisfaction is our top priority. We believe in building long-lasting relationships with our customers by providing exceptional support and addressing their concerns promptly. We value your feedback and continuously strive to improve our products and services to better serve you.</li>
            </ul>

            <h3 class="font-semibold text-white capitalize">Expert Team:</h3>
            <ul class="flex flex-col gap-2 list-disc p-0 m-0 mt-1">
                <li>Our team consists of highly skilled professionals who are passionate about what they do. From our [department/team 1] to [department/team 2], each member brings their expertise and dedication to ensure that we deliver the best possible experience to our customers.</li>
            </ul>

            <h3 class="font-semibold text-white capitalize">Community Engagement:</h3>
            <ul class="flex flex-col gap-2 list-disc p-0 m-0 mt-1">
                <li>We are proud to be an active member of the community. We actively participate in [community involvement activities/initiatives] to give back and make a positive impact. We believe in creating a sustainable future by [describe any environmentally friendly practices/initiatives].</li>
            </ul>

            <h3 class="font-semibold text-white capitalize">Contact Us:</h3>
            <ul class="flex flex-col gap-2 list-disc p-0 m-0 mt-1">
                <li>We would love to hear from you! If you have any questions, feedback, or inquiries, please don't hesitate to reach out to our team. You can contact us through [phone number], [email address], or by filling out the contact form on our website.</li>
            </ul>

            <p>Thank you for choosing [Your Company Name]. We appreciate the opportunity to serve you and look forward to exceeding your expectations.</p>
        </div>
    
    
    </div>
</template>

<script>
import FormComponent from './Auth/FormComponent.vue'
import InputComponent from './Auth/InputComponent.vue'
import ButtonComponent from './Auth/ButtonComponent.vue'

export default {
    name: "AboutComponent",
    components: { FormComponent, InputComponent, ButtonComponent }
}
</script>

<style lang="scss" scoped>

</style>