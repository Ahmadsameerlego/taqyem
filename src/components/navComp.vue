<template>
    <header id="header" class="px-5 pt-3 pb-3">
        <div class="d-flex justify-content-end">
            <!-- alert  -->
            <div class="not "> 
                <router-link to="/notification" class="flex_center h-100">
                    <i class="fa-solid fa-bell"></i>
                    <span class="counter">
                        {{ count }}
                    </span>
                </router-link>
            </div>

            <!-- user  -->
            <div class="user d-flex align-items-center mx-3">
                <i class="fa-regular fa-circle-user"></i>
                <span class="mx-1">
                    {{ user_name }}
                </span>
            </div>



            <button class="btn toggle_btn" @click="toggleBar">
                <i class="fa-solid fa-bars-staggered"></i>
            </button>
        </div>
    </header>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            user_name : '',
            count : ''
        }
    },
    methods:{
        toggleBar(){
            document.querySelector('#sidebar').classList.toggle('active');
            document.querySelector('#header').classList.toggle('active');
            document.querySelector('#content').classList.toggle('active');
        },
        async getNotCount(){
            await axios.get('notifications-count', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.count = res.data.data.count ;
            } )
        }
    },
    mounted(){
        this.user_name = JSON.parse(localStorage.getItem('user')).name;

        this.getNotCount()
    }
}
</script>

<style lang="scss">
    .toggle_btn{
        display: none !important;
    }
    .flex_center{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #header{
        width: calc(100% - 300px);
        position: fixed;
        top: 0;
        left: 0;
        height: 80px;
        background-color: #fff;
        z-index: 11;
        box-shadow: 0 0 10px rgba(51,51,51,.149);
        .user{
            svg{
                font-size: 23px;
            }
        }
        .not{
            position:relative;
            width:40px;
            height:40px;
            background-color: #F8F9FD;
            border-radius: 3px;
            .counter{
                position: absolute;
                background-color: red;
                color: #fff;
                text-align: center;
                width: 20px;
                height: 20px;
                font-size: 14px;
                border-radius: 50%;
                left: -4px;
                top: -5px;
            }
        }
    }
</style>