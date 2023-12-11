<template>
  <section id="sidebar">
        <!-- side header  -->
        <div class="side_header">
            <img :src="require('@/assets/imgs/logo.png')" alt="">
        </div>
        <!-- nav bar  -->
        <nav class="nav mt-3 mx-4">
            <!-- single nav  -->
            <router-link to="/admin/home" class="single_nav mb-4 w-100">

                <div class="d-flex align-items-center">
                    <div class="icon flex_center">
                        <img :src="require('@/assets/imgs/home.png')" width="20" alt="">
                    </div>
                    <span class="nav_title mx-3"> الرئيسية </span>
                </div>

                
            </router-link>

            <!-- single nav  -->
            <router-link to="/admin/orders" class="single_nav mb-4 w-100">

                <div class="d-flex align-items-center">
                    <div class="icon flex_center">
                        <img :src="require('@/assets/imgs/curr.png')" width="20" alt="">
                    </div>
                    <span class="nav_title mx-3"> الطلبات </span>
                </div>

                
            </router-link>

            <!-- single nav  -->
            <router-link to="/admin/clients" class="single_nav mb-4 w-100">

                <div class="d-flex align-items-center">
                    <div class="icon flex_center">
                        <img :src="require('@/assets/imgs/clients.png')" width="20" alt="">
                    </div>
                    <span class="nav_title mx-3"> العملاء </span>
                </div>

                
            </router-link>

            <!-- single nav  -->
            <router-link to="/admin/products" class="single_nav mb-4 w-100">

                <div class="d-flex align-items-center">
                    <div class="icon flex_center">
                        <img :src="require('@/assets/imgs/clients.png')" width="20" alt="">
                    </div>
                    <span class="nav_title mx-3"> المنتجات </span>
                </div>

                
            </router-link>

            <!-- single nav  -->
            <router-link to="/admin/settlments" class="single_nav mb-4 w-100">

                <div class="d-flex align-items-center">
                    <div class="icon flex_center">
                        <img :src="require('@/assets/imgs/profit.png')" width="20" alt="">
                    </div>
                    <span class="nav_title mx-3"> التسويات</span>
                </div>

                
            </router-link>

            <!-- single nav  -->
            <router-link to="/admin/setting" class="single_nav mb-4 w-100">

                <div class="d-flex align-items-center">
                    <div class="icon flex_center">
                        <img :src="require('@/assets/imgs/setting.png')" width="20" alt="">
                        <span class="nav_title mx-3"> الاعدادات </span>
                    </div>
                </div>    

                
            </router-link>

            <!-- single nav  -->
            <button @click.prevent="logOut" class="btn single_nav mb-4 w-100" :disabled="disabled">

                <div class="d-flex align-items-center">
                    <div class="icon flex_center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="37" viewBox="0 0 40 37" fill="none">
                            <path opacity="0.8" d="M32 0H8C3.58172 0 0 3.31309 0 7.4V29.6C0 33.6869 3.58172 37 8 37H32C36.4183 37 40 33.6869 40 29.6V7.4C40 3.31309 36.4183 0 32 0Z" fill="#F5F5F5"/>
                            <path d="M15.9899 24.1751C16.2262 24.1751 16.4529 24.269 16.6199 24.4361C16.787 24.6032 16.8809 24.8298 16.8809 25.0661V27.7401H21.3379V15.2611H16.8809V17.9351C16.8809 18.1716 16.787 18.3983 16.6198 18.5655C16.4526 18.7327 16.2259 18.8266 15.9894 18.8266C15.753 18.8266 15.5262 18.7327 15.359 18.5655C15.1918 18.3983 15.0979 18.1716 15.0979 17.9351V15.2611C15.0979 14.7883 15.2858 14.3348 15.6201 14.0004C15.9545 13.666 16.408 13.4781 16.8809 13.4781H21.3379C21.3389 13.203 21.4038 12.9317 21.5275 12.6859C21.6511 12.4401 21.8302 12.2263 22.0506 12.0615C22.271 11.8967 22.5266 11.7853 22.7974 11.7361C23.0682 11.6869 23.3467 11.7013 23.6109 11.7781L28.0689 13.0941C28.4438 13.2015 28.7732 13.4289 29.0066 13.7413C29.2399 14.0538 29.3644 14.4342 29.3609 14.8241V28.1941C29.3767 28.592 29.2589 28.9838 29.0262 29.3069C28.7935 29.6301 28.4593 29.866 28.0769 29.9771L23.6209 31.2941C23.3503 31.372 23.0652 31.3849 22.7887 31.3318C22.5122 31.2787 22.2521 31.1611 22.0296 30.9885C21.8072 30.8159 21.6286 30.5932 21.5084 30.3386C21.3882 30.084 21.3298 29.8046 21.3379 29.5231H16.8809C16.4082 29.5231 15.9548 29.3354 15.6205 29.0013C15.2862 28.6671 15.0982 28.2139 15.0979 27.7411V25.0661C15.0979 24.9491 15.121 24.8331 15.1658 24.7249C15.2107 24.6168 15.2764 24.5185 15.3592 24.4358C15.4421 24.353 15.5404 24.2874 15.6486 24.2427C15.7569 24.198 15.8728 24.175 15.9899 24.1751ZM27.5789 28.1751V14.8061L23.1209 13.4781V29.5231L27.5789 28.1751ZM10.7039 21.1941C10.7502 21.0837 10.8182 20.9837 10.9039 20.9001L12.6869 19.1171C12.858 18.9727 13.0773 18.8979 13.301 18.9078C13.5247 18.9177 13.7365 19.0114 13.8943 19.1704C14.052 19.3294 14.144 19.542 14.1521 19.7658C14.1602 19.9896 14.0837 20.2082 13.9379 20.3781L13.6789 20.6371H17.7709C18.0074 20.6371 18.2341 20.7311 18.4013 20.8983C18.5685 21.0655 18.6624 21.2922 18.6624 21.5286C18.6624 21.7651 18.5685 21.9918 18.4013 22.159C18.2341 22.3262 18.0074 22.4201 17.7709 22.4201H13.6809L13.9399 22.6791C14.0336 22.759 14.1096 22.8573 14.1634 22.968C14.2172 23.0786 14.2474 23.1992 14.2522 23.3222C14.2571 23.4451 14.2364 23.5677 14.1915 23.6823C14.1467 23.7968 14.0785 23.9009 13.9915 23.9878C13.9044 24.0747 13.8003 24.1427 13.6856 24.1874C13.571 24.2321 13.4484 24.2525 13.3254 24.2475C13.2025 24.2425 13.082 24.212 12.9714 24.1581C12.8608 24.1042 12.7626 24.0279 12.6829 23.9341L10.8999 22.1511C10.774 22.0272 10.6877 21.8686 10.6521 21.6956C10.6165 21.5225 10.6331 21.3427 10.6999 21.1791L10.7039 21.1941Z" fill="#D81A1A"/>
                        </svg>
                    </div>
                    <span class="nav_title mx-3">تسجيل الخروج</span>
                    <div class="spinner-border" role="status" v-if="disabled">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                
            </button>

        </nav>
  </section>
  <Toast />
</template>

<script>
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
    data(){
        return{
            disabled : false
        }
    },
    methods:{
        async logOut(){
            const fd = new FormData();
            await axios.post('logout', fd,{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res) =>{
                if( res.data.key === 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 2000);
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                }
            } )
        }
    },
    components:{
        Toast
    },
} 
</script>

<style lang="scss">
    #sidebar {
        position: fixed;
        overflow-y: auto;
        height: 100%;
        width: 300px;
        z-index: 99;
        background: #EFF0F4;
        .side_header{
            padding: 10px 20px;
            img{
                width: 131px;
                -o-object-fit: contain;
                object-fit: contain;
                margin: auto;
                display: flex;
            }
        }
        .single_nav{
            position: relative;
            padding: 6px;
            border-radius: 3px;
           
            .nav_title{
                color:#8A8A8A;
                font-size: 15px;
                font-weight: 500;
                text-decoration: none !important;
            }
            .arrow{
                position: absolute;
                left: 16px;
                top: 10px;
            }


        }
        .router-link-active{
            color:#3C649F;
            // &::before{
            //     content: '';
            //     position: absolute;
            //     right: -12%;
            //     top: 0;
            //     height: 100%;
            //     width: 7px;
            //     background-color: #293255;
            // }
            .nav_title{
                color:#3C649F;
            }
            svg{
                color:#3C649F;
            }
            // .icon{
            //     background-color: #fff;
            // }
        }
    }
    a{
        text-decoration: none !important;
        color: inherit !important;
    }
</style>