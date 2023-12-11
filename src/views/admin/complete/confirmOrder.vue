<template>

    <navbar />
    <sidebar />

  <div id="content">
    <div class="container m-5">
        <div class="card_order px-5 pt-3 pb-4">
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
                    رقم الجوال المستلم: {{ receiver_phone }}  +966
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
                            <td> {{ prod.product_name }} </td>
                            <td> {{ prod.qty }} </td>
                            <td> {{ prod.total_price }} ريال </td>
                        </tr>
                        
                        
                      
                    </tbody>
                </table>


                <div class="d-flex  w-75 mx-auto  justify-content-end">
                    <div>
                        <h6 class="fw-bold"> الاجمالي </h6>
                        <h6 class="fw-bold"> {{ total_products_amount }} ريال </h6>
                    </div>
                </div>


                <!-- <div class="d-flex justify-content-center align-items-center mt-3">
                    <button class="btn main_btn px-5 pt-2 pb-2"  :disabled="disabled" @click.prevent="createOrder">
                         <span v-if="!disabled">انهاء</span> 
                         <div class="spinner-border" role="status" v-if="disabled">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                </div> -->


                <Dialog v-model:visible="visible" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                   <div class="success_alert mb-2">
                        <i class="fa-solid fa-check"></i>
                   </div>

                   <h5 class="fw-6 text-center mb-2">
                    تم الطلب بنجاح
                   </h5>

                   <p class="text-danger text-center">
                    رقم الطلب #{{ order_num }}
                   </p>
                   
                   <div class="d-flex justify-content-center align-items-center">
                    <button class="btn main_btn br-20 px-4" @click.prevent="$router.push('/admin/orders')"> الطلبات </button>
                    <button class="btn main_btn mx-2 br-20 px-4" @click.prevent="$router.push('/admin/home')"> الرئيسية </button>
                   </div>
                </Dialog>

            </div>
        </div>
    </div>
  </div>
  <Toast />
</template>

<script>
import navbar from "@/components/navComp.vue";
import sidebar from "@/components/sidebarComp.vue";
import moment from 'moment';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';

import axios from 'axios';
export default {
    data(){
        return{
            products : [],
            address : '',

            currentDay  :'',
            currentTime : '',

            owner_name : '',
            receiver_phone : '',
            total_products_amount : '',
            visible : false,
            disabled : false,
            order_num : ''
        }
    },
    components:{
        navbar,
        sidebar,
        Toast,
        Dialog
    },
    methods:{
        async getInfo(){
            await axios.get(`admin/orders/${this.$route.params.id}/show`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                const response = res.data.data ;
                this.products = response.items ;
                this.address = response.address ;
                this.total_products_amount = response.total_products_amount ;
                this.owner_name = response.client ;
                this.receiver_phone = response.receiver_phone ;
                this.order_num = response.order_num ;



                // this.total_products_amount = response.total_products_amount
            } )
        },

        removeValue(index, id,value_index){
            this.products[index].values.splice(value_index, 1)
            // console.log(id)
            this.deleted_ids.push(id);
        },

        // getDynamicModelKey(productId, index) {
        // return `${productId}_${index}`;
        // },
        async getCities(){
            await axios.get('cities')
            .then( (res)=>{
                this.cities = res.data.data ;
            } )
        },
        async getDelegates(){
            await axios.get('delegates')
            .then( (res)=>{
                this.delegates = res.data.data ;
            } )
        },



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
            // fd.append('category_id', localStorage.getItem('category_id'));
            fd.append('delegate_id', localStorage.getItem('delegate_id'));
            fd.append('items', localStorage.getItem('items'));
            await axios.post(`admin/orders/${this.$route.params.id}?_method=put`, fd , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.disabled = false;
                    setTimeout(() => {
                        this.visible = true
                    }, 1000);
                    // setTimeout(() => {
                    //     this.$router.push('/admin/orders')
                    // }, 2000);
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.disabled = false;
                }
            } )
        }
    },
    computed:{
        
    },
    mounted(){
        this.getInfo();
        this.getCities();

        this.getDelegates();


        this.currentDay = moment().format('YY-MM-DD')
        this.currentTime = moment().format('h:mm:ss A');

        // this.owner_name = localStorage.getItem('owner_name');
        // this.address = localStorage.getItem('address');
        // this.receiver_phone = localStorage.getItem('receiver_phone');
        // this.products =  JSON.parse(localStorage.getItem('items'));
        // this.totalPrice =  localStorage.getItem('totalPrice');
        // this.totalPrice =  localStorage.getItem('delegate_id');
    }
}
</script>

<style>

</style>