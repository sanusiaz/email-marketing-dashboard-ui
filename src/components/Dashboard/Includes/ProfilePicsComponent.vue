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
        <div class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 pic_cont"
            :class="{ 'hidden': !showProfileNav }" style=" position: absolute;  margin: 0px;">

            <router-link class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:underline" :to="{name: 'admin-settings'}">Settings</router-link>
                
            <a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:underline">
                Payments & Account </a>
            <a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:underline">
                API </a>
            <a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:underline">
                Status Page </a>
            <div class="h-0 my-2 border border-solid border-blueGray-100"></div><a href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">

                <router-link :to="{ name: 'logout' }"
                    class=" space-x-3 font-Inter text-sm transition-all duration-150 block hover:duration-150  rounded-lg w-full hover:underline  ">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </router-link> </a>
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

<style lang="scss" scoped>
.pic_cont {
    right: 10px;
    top: 89%;
    width: max-content;
}
</style>