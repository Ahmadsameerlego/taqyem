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


    <div class="container m-5">
        <div class="card_order px-5 pt-3 pb-4" > 
            <h5 class="text-center"> تأكيد الطلب </h5>
            <div class="pill mt-4 px-4 pt-5 pb-5">
                <h4 class="text-center mb-3"> {{ owner_name }} </h4>

                <p class="address text-center fw-6"> {{ address }}  </p>

                <div class="confirm_dates d-flex justify-content-center align-items-center mx-auto">
                    <p class="fw-6">
                        تاريخ الطلب:  {{ currentDay }}                    
                    </p>

                    <p class="mx-3 fw-6">
                        توقيت الطلب:  {{ currentTime }} 
                    </p>
                </div>

                <p class="text-center fw-6">
                    رقم الجوال المستلم: {{ receiver_phone }}  966+
                </p>


                <!-- table  -->
                <table class="table mt-4 w-75 mx-auto confirm_table">
                    <thead>
                        <tr>
                        <th scope="col">المنتج</th>
                        <th scope="col">الكمية</th>
                        <th scope="col">السعر</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prod in products" :key="prod.id">
                            <td> {{ prod.name }} </td>
                            <td> {{ prod.qty }} </td>
                            <td> {{ prod.totalPrice }} ريال </td>
                        </tr>
                        
                        
                      
                    </tbody>
                </table>


                <div class="d-flex  w-75 mx-auto  justify-content-end">
                    <div>
                        <h6 class="fw-bold"> الاجمالي </h6>
                        <h6 class="fw-bold"> {{ totalPrice }} ريال </h6>
                    </div>
                </div>


                <div class="d-flex justify-content-center align-items-center mt-3">
                    <button class="third_btn  px-5 pt-2 pb-2  btn" @click="$router.push('/sales/orderDetails')" style="border-radius:3px !important"> السابق </button>

                    <button class="btn main_btn px-5 pt-2 pb-2 mx-3"  :disabled="disabled" @click.prevent="createOrder">
                         <span v-if="!disabled">تأكيد</span> 
                         <div class="spinner-border" role="status" v-if="disabled">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>


                </div>


                <Dialog v-model:visible="visible" modal  class="confirm" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                   <div class="success_alert mb-2">
                        <i class="fa-solid fa-check"></i>
                   </div>

                   <h5 class="fw-6 text-center mb-2">
                    تم الطلب بنجاح
                   </h5>

                   <p class="text-danger text-center">
                    رقم الطلب #{{ orderNumber }}
                   </p>
                   
                   <div class="d-flex justify-content-center align-items-center">
                    <button class="btn main_btn br-20 px-4" @click.prevent="$router.push('/sales/orders')"> الطلبات </button>
                    <button class="btn main_btn mx-2 br-20 px-4" @click.prevent="$router.push('/sales/home')"> الرئيسية </button>
                   </div>
                </Dialog>

            </div>
        </div>
    </div>
    <Toast />
</template>

<script>
import Dialog from 'primevue/dialog';
import user from '@/components/sharedUser.vue';
import moment from 'moment';
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
    data(){
        return{
            visible: false,
            owner_name : '',
            address : '',
            currentDay : '',
            currentTime : '',
            receiver_phone : '',
            products : [],
            totalPrice : '',
            disabled : false,
            order_num : ''
        }
    },
    components:{
        Dialog,
        user,
        Toast
    },
    methods:{
        async createOrder(){
            this.disabled = true ;
            const fd = new FormData();
            fd.append('city_id', localStorage.getItem('city_id'));
            fd.append('receiver_name', localStorage.getItem('receiver_name'));
            fd.append('address', localStorage.getItem('address'));
            fd.append('owner_name', localStorage.getItem('owner_name'));
            fd.append('map_url', localStorage.getItem('map_url'));
            fd.append('category_id', localStorage.getItem('category_id'));
            fd.append('receiver_phone', localStorage.getItem('receiver_phone'));
            fd.append('category_id', localStorage.getItem('category_id'));
            fd.append('items', localStorage.getItem('items'));
            await axios.post('sales/orders', fd , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.disabled = false;
                        this.visible = true
                   this.orderNumber = res.data.data.order.order_num ;
                    // setTimeout(() => {
                    //     this.$router.push('/sales/orders')
                    // }, 2000);

                    localStorage.setItem('cashedItems', [])
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.disabled = false;
                }
            } )
        }
    },
    mounted(){
        this.owner_name = localStorage.getItem('owner_name');
        this.address = localStorage.getItem('address');
        this.receiver_phone = localStorage.getItem('receiver_phone');
        this.products =  JSON.parse(localStorage.getItem('products'));
        this.totalPrice =  localStorage.getItem('totalPrice');
        this.currentDay = moment().format('YY-MM-DD')
        this.currentTime = moment().format('h:mm:ss A');
    }
}
</script>



<style lang="scss">
.confirm .p-dialog-header-icons{
    display: none !important;
}
    .success_alert{
        width: 170px;
        height: 170px;
        margin: auto;
        border-radius: 50%;
        background-color: #2D6191;
        display: flex;
        justify-content: center;
        align-items: center;
        svg{
            font-size: 100px;
            color:#fff;
        }
    }
    .pill{
        background-color: #FAFAFA;
        border: 1px dashed #333;
        width:75%;
        margin:auto;
        .address{
            color:#ACACAC ;
        }
        .confirm_table{
            border: 1px solid #ccc;
        }
    }
</style>