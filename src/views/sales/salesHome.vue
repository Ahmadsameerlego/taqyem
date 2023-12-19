<template>
    <!-- user  -->
    <user />
    <!-- navbar  -->
    <section class="nav_bar d-flex justify-content-between align-items-center">
        <div>
            <router-link to="/sales/home">
                الرئيسية
            </router-link>
        </div>
        <div>
            <router-link to="/sales/orders">
                الطلبات
            </router-link>
        </div>
        <div>
            <router-link class="add_order" to="/sales/create">
                <span class="fas fa-plus"></span>
                <span class="mx-2"> انشاء طلب جديد </span>
            </router-link>
        </div>
    </section>

    <!-- cards  -->
    <section class="cards mt-5">
        <div class="container">
            <div class="row">

                <div class="col-md-4 mb-5">
                    <div class="single_card d-flex align-items-center">
                        <span class="card_icon">
                            <img :src="require('@/assets/imgs/Group 5.svg')" alt="">
                        </span>

                        <div class="d-flex flex-column mx-3">
                            <span class="card_title">الطلبات المكتملة</span>
                            <span class="card_details"> {{ data.completed_order }} طلب </span>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-5">
                    <div class="single_card d-flex align-items-center">
                        <span class="card_icon">
                            <img :src="require('@/assets/imgs/Group 2609432.svg')" alt="">
                        </span>

                        <div class="d-flex flex-column mx-3">
                            <span class="card_title">الطلبات المرفوضة</span>
                            <span class="card_details"> {{ data.refused_order }} طلب </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-5">
                    <div class="single_card d-flex align-items-center">
                        <span class="card_icon">
                            <img :src="require('@/assets/imgs/Group 2609433.svg')" alt="">
                        </span>

                        <div class="d-flex flex-column mx-3">
                            <span class="card_title">الطلبات تحت التنفيذ</span>
                            <span class="card_details"> {{ data.in_progress_order }} طلب </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-5">
                    <div class="single_card d-flex align-items-center">
                        <span class="card_icon">
                            <img :src="require('@/assets/imgs/coins 1.png')" alt="">
                        </span>

                        <div class="d-flex flex-column mx-3">
                            <span class="card_title">ربح الشهر</span>
                            <span class="card_details"> {{ data.current_month_profit }} ريال </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-5">
                    <div class="single_card d-flex align-items-center">
                        <span class="card_icon">
                            <img :src="require('@/assets/imgs/dollar 1.png')" alt="">
                        </span>

                        <div class="d-flex flex-column mx-3">
                            <span class="card_title">ربح اليوم</span>
                            <span class="card_details"> {{ data.today_profit }} ريال </span>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 mb-5">
                    <div class="single_card d-flex align-items-center">
                        <span class="card_icon">
                            <img :src="require('@/assets/imgs/money-bag 1.png')" alt="">
                        </span>

                        <div class="d-flex flex-column mx-3">
                            <span class="card_title">اجمالي الربح</span>
                            <span class="card_details"> {{ data.total_profit }} ريال </span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        
    </section>

    <!-- table  -->
    <div class="container">
        <section class="home_table">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">م</th>
                    <th scope="col">السنة</th>
                    <th scope="col">الشهر</th>
                    <th scope="col">عدد الطلبات</th>
                    <th scope="col">اجمالي الربح</th>
                    </tr>
                </thead>
                <tbody v-if="order_summery.length>0">
                    <tr v-for="(order, index) in order_summery" :key="index">
                        <th scope="row"> {{ index+1 }} </th>
                        <td> {{ order.year }} </td>
                        <td> {{  order.month}} </td>
                        <td> {{ order.count_orders }} </td>
                        <td> {{ order.total_profit }} ريال </td>
                    </tr>
                    
                </tbody>
                <div v-else class="text-center d-flex justify-content-center text-danger">
                   <div>
                    لا توجد طلبات إلى الان
                   </div>
                </div>
            </table>
        </section>
    </div>
   
</template>

<script>
import axios from 'axios';
import user from '@/components/sharedUser.vue'
export default {
    data(){
        return{
            data : {},
            order_summery : [],
            userName : ''
        }
    },
    components:{
        user
    },
    methods:{
        async getDashboard(){
            await axios.get('sales/dashboard', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.data = res.data.data ;
                this.order_summery = res.data.data.order_summery  ;
            } )
        }
    },
    mounted(){
        this.getDashboard();
        this.userName = JSON.parse(localStorage.getItem('user')).name ;

        localStorage.setItem('owner_name', '');
        localStorage.setItem('receiver_name', '');
        localStorage.setItem('receiver_phone', '');
        localStorage.setItem('category_id', '');
        localStorage.setItem('products', []);
        localStorage.setItem('default_products', []);
        localStorage.setItem('city_id', '');
        localStorage.setItem('map_url', '');
        localStorage.setItem('address', '');

    }
}
</script>

<style scoped>
    a{
        color:#fff;
    }
</style>
<style lang="scss">
    .home_table{
        width: 80%;
        margin: auto;
        border: 15px solid #35BFBF;
        border-radius: 15px;
        thead{
            tr{
                th{
                    background-color: #2D6191;
                    color:#fff;
                }
            }
        }
        .table>:not(caption)>*>*{
            text-align: center;
        }
    }
    .single_card{
        background-color: #fff;
        border-radius: 25px;
        height: 130px;
        width: 300px;
        padding-left: 20px;
        padding-right: 20px;
        .card_title{
            color: #6386B9;
            font-size: 15px;
        }
        .card_details{
            font-size: 15px;
            font-weight: bold;
        }
        .card_icon{
            width: 70px;
            img{
                width:100%;
                height:100%;
            }
        }
    }
    .user_icon{
        background-color: #bdbdbd30;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #BDBDBD;
        svg{
            font-size: 15px;
        }
    }
    .nav_bar{
        background-color: #2D6191;
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        padding-left: 30px;
        width: 40%;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 100px;
        a{
            color:#fff !important;
            text-decoration: none;
            font-size: 18px;
            font-weight: 600;
            position: relative;
            
        }
        .add_order{
            font-size: 15px;
        }
        .router-link-active::before{
                content: '';
                position: absolute;
                width: 40px;
                height: 2px;
                background-color: #fff;
                bottom: -2px;
                left: 15%;
        }
        .add_order.router-link-active::before{
            width: 100% !important;
            left: 0% !important;
        }
    }
</style>