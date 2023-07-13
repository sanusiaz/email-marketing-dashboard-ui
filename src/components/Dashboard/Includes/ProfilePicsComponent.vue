<template>
    <div>
        <a @click="this.showProfileNav = !this.showProfileNav" class="text-blueGray-500 ml-3 block" href="#">
            <div class="items-center flex">
                <span
                    class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                    <img alt="..." class="w-full h-full rounded-full align-middle border-none shadow-lg"
                        :src="this.profilePicsUrl">
                </span>
            </div>
        </a>
        <div class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
            :class="{ 'hidden': !showProfileNav }"
            style="    position: absolute; inset: 0px auto auto 0px; margin: 0px; left: -102%; top: 108%;;">
            <a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Action </a><a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Another action </a><a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Something else here </a>
            <div class="h-0 my-2 border border-solid border-blueGray-100"></div><a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Seprated link </a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ProfilePicsComponent',
    data() {
        return {
            showProfileNav: false,
            profilePicsUrl: ""
        }
    },
    props: {
        profilePicsUrl: {
            type: String
        }
    },
    async created() {
        // Get Users Profile Pics
        await axios.get("/profile-pics")
            .then(response => {
            if (response.data.data !== undefined && response.status === 200) {

                console.log(response.data.data)
                this.profilePicsUrl = response.data.data;
                this.$emit("profilePicsUrl", this.profilePicsUrl);
            }
        }).catch(error => {
            // redirect users to login page 
            this.$router.push("/login");
        });
    },
}
</script>

<style lang="scss" scoped></style>