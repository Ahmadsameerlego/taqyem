<template>
    <!-- user  -->
    <user />

    <div class="container mt-5">
        <div class="login_options  w-75 mx-auto d-flex justify-content-between align-items-center mb-3">
            <button class="btn w-50 " @click="selectButton('sales')" :class="{ 'selected': selectedButton === 'sales' }"  @click.prevent="getCompleted">
                تم توصيلها
            </button>
            <button class="btn w-50 " @click="selectButton('delivery')" :class="{ 'selected': selectedButton === 'delivery' }" @click.prevent="getInDelelivery">
                جاري التوصيل
            </button>
        </div>

        <div class="mb-3 search_deliver d-flex justify-content-center align-items-center">
            <div class="flex justify-content-end">
                <span class="p-input-icon-left">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" v-model="filters['global'].value" class="form-control" placeholder="ابحث عن طلب" />
                </span>
            </div>
        </div>

        <!-- table  -->
        <div class="card card_table" v-if="still == true">
            <DataTable 
                :value="deliver_products" 
                paginator :rows="5" 
                :rowsPerPageOptions="[5, 10, 20, 50]"   
                tableStyle="min-width: 50rem"
                v-model:filters="filters"
                ref="dt"
            >
                <Column field="order_num" header="رقم الطلب"></Column>
                <Column field="client" header="صاحب الطلب"></Column>
                <Column field="total_products_amount" header="المبلغ"></Column>
                <Column  header="تواصل">
                    <template #body="slotProps">

                        <div class="d-flex justify-content-center align-items-center">
                            <a :href="'tel:'+slotProps.data.receiver_phone">
                                <span class="contact_icon">
                                    <i class="fa-solid fa-phone-volume"></i>
                                </span>
                            </a>
                            <a :href="'https://api.whatsapp.com/send?phone=966'+slotProps.data.receiver_phone" target="_blank">
                                <span class="contact_icon mx-2">
                                    <i class="fa-brands fa-whatsapp"></i>
                                </span>
                            </a>
                            
                        </div>
                                        
                    </template>
                </Column>
                <Column  header="اللوكيشن">
                    <template #body="slotProps">
                        <a :href="slotProps.data.map_url" target="_blank">
                            <span class="location">
                                <i class="fa-solid fa-location-dot"></i>                        
                            </span>
                        </a>
                                                
                    </template>
                </Column>

                <Column header="">
                    <template #body="slotProps">
                        <div class="d-flex justify-content-center align-items-center">
                            <button class="btn main_btn br-20 px-4" @click="openAccept(slotProps.data.total_products_amount , slotProps.data.id)">تسليم </button>
                            <button class="btn btn-danger mx-3 br-20 px-4" @click="openRefuse(slotProps.data.id)">رفض </button>
                        </div>    
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- deliverded  -->
        <div class="card card_table" v-if="still == false">
            <DataTable 
                :value="products" 
                paginator :rows="5" 
                :rowsPerPageOptions="[5, 10, 20, 50]"   
                tableStyle="min-width: 50rem"
                v-model:filters="filters"
                ref="dt"
            >
                <Column field="order_num" header="رقم الطلب"></Column>
                <Column field="client" header="صاحب الطلب"></Column>
                <Column field="total_products_amount" header="المبلغ"></Column>
                <Column  header="تاريخ التسليم">
                    <template #body="slotProps">

                        <div class="d-flex justify-content-center align-items-center">
                           {{ slotProps.data.created_at }}
                        </div>
                                        
                    </template>
                </Column>
                <Column  header="مكان التسليم">
                    <template #body="slotProps">
                        <span class="location">
                            {{ slotProps.data.address }}
                        </span>                        
                    </template>
                </Column>

                <Column header="">
                    <template #body="slotProps">
                        <div class="delivered d-flex justify-content-center align-items-center">
                            <i class="fas fa-check"></i>
                        </div>    
                        <span v-if="false">{{slotProps.data.image}}</span>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <!-- refuse order  -->
    <Dialog v-model:visible="refuse" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h5 class="text-center"> رفض استلام الطلب </h5>

       <div class="form-group">
            <label for="" class="fw-6 mb-2"> السبب </label>
            <textarea name="" class="form-control" id="" cols="30" v-model="refuse_reason" rows="5"></textarea>
       </div>

       <button class="btn main_btn w-50 mx-auto d-flex mt-3 justify-content-center pt-2 pb-2" @click.prevent="refuseOrder"> 
            ارسال 
        </button>
    </Dialog>

    <!-- accept order  -->
    <Dialog v-model:visible="accept" modal  :style="{ width: '40rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

        <div class="row">
            <div class="col-md-12">
                <p> حالة الطلب </p>
                <div class="confirm_datable d-flex justify-content-between align-items-center">
                    <div class="d-flex mb-3">

                        <div class="form-group flex_center mx-3">
                            <input type="radio" class="radio_filter" checked v-model="pay_type" :value="online.id">
                            <span class="pay_method mx-2">
                                <img :src="require('@/assets/imgs/Mada-01 1.png')" alt="">
                            </span>                               
                        </div>

                        <div class="form-group flex_center mx-3">
                            <input type="radio" class="radio_filter" v-model="pay_type" :value="cash.id">
                            <span class="pay_method mx-2">
                                    نقدي
                            </span>
                        </div>

                    </div>
                    <div class="price_accept d-flex align-items-baseline">
                        <h3 class="price_amount"> {{ price }}  </h3>
                        <span> ريال </span>
                    </div>
                </div>
                        
            </div>
        </div>
       <div class="form-group mb-2" v-if="isCash">
            <label for="" class="fw-6 mb-2"> رقم العملية </label>
            <input type="number" class="form-control" v-model="reference_code" >
       </div>

       <div class="form-group">
            <label for="" class="fw-6 mb-2"> رمز العملية "otp" </label>
            <input type="number" class="form-control" v-model="otp_code">
       </div>

       <div class="d-flex mt-3">
        <button class="btn main_btn w-50  d-flex  justify-content-center pt-2 pb-2" :disabled="accept_disabled" @click.prevent="accept_order"> ارسال </button>
        <button class="btn sec_btn w-50 mx-3 pt-2 pb-2" @click="accept=false"> الغاء </button>
       </div>
    </Dialog>
    <Toast />
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';

import Dialog from 'primevue/dialog';

import user from '@/components/sharedUser.vue'

import axios from "axios";
import Toast from 'primevue/toast';

export default {
    data(){
        return{
            selectedButton: 'delivery',
            products: null,
            deliver_products : null,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            still : true ,
            refuse : false,
            accept : false,
            refuse_reason : '',
            order_id : '',

            pays : [],
            pay_type : '2',
            online : {},
            cash : {},
            isCash : true , 
            op_number : '',
            price : '',
            order_in_id : '',
            accept_disabled : false,
            otp_code : '',
            reference_code : ''
        }
    },
    watch:{
        pay_type(){
            if( this.pay_type == '2' ){
                this.isCash = true ;
            }else if( this.pay_type == '1' ){
                this.isCash = false ;
            }
        }
    },
    components: {
        DataTable,
        Column,
        Dialog,
        user,
        Toast
    },
    methods: {
        selectButton(button) {
            this.selectedButton = button;
            if( button == 'delivery' ){
                this.still = true ;
            }else if (button == 'sales'){
                this.still = false ;
            }
        },
        openAccept(price, id){
            this.accept         = true ;
            this.price          = price ;
            // this.reference_code      = code ;
            this.order_in_id    = id ;
        },
        async getCompleted(){
            await axios.get('delegate/orders/delivered', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key === 'success' ){
                    this.products = res.data.data ;
                }
            } )
        },     
        async getInDelelivery(){
            await axios.get('delegate/orders/in-delivery', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key === 'success' ){
                    this.deliver_products = res.data.data ;
                }
            } )
        },
        openRefuse(id){
            this.refuse=true;
            this.order_id=id;
        },
        async refuseOrder(){
            const fd = new FormData();
            fd.append('refuse_reason', this.refuse_reason);
            fd.append('otp', this.otp);
            await axios.post(`delegate/orders/${this.order_id}/refuse`, fd , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key === 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    setTimeout(() => {
                        this.refuse = false ;
                        // this.getCompleted();
                        // this.selectButton = 'sales';
                    }, 1000);
                    this.getCompleted();
                    // this.this.getInDelelivery();

                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                }
            } )
        },

        // accept order 
        async accept_order(){
            const fd = new FormData();
            this.accept_disabled = true ;
            fd.append('pay_type', this.pay_type) ;
            fd.append('reference_code', this.reference_code) ;
            fd.append('otp_code', this.otp_code) ;
            await axios.post(`delegate/orders/${this.order_in_id}/finish`, fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.accept_disabled = false ;
                    setTimeout(() => {
                        this.accept = false ;
                    }, 1000);

                    this.getInDelelivery();
                    this.getCompleted();
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.accept_disabled = false ;
                }
            } )
        },

        async getPayment(){
            await axios.get('pay-types')
            .then( (res)=>{
                this.online = res.data.data[2] ;
                this.cash = res.data.data[1] ;
            } )
        }
        

    },
    mounted() {
        this.selectedButton == 'sales';
        this.getInDelelivery();
        this.getPayment();
    }
}
</script>

<style lang="scss">
    .price_accept{
        border: 1px solid #000000;
        border-radius: 19px;
        box-shadow: 0px 0px 10px rgba(51, 51, 51, 0.1568627451);
        padding: 30px 30px;
        .price_amount{
            font-size: 30px;
            font-weight: bold;
        }
    }
    .delivered{
        svg{
            font-size: 22px;
            color: #2D6191;
        }
    }
    .search_deliver{
        background-color: #fff;
        border-radius: 20px;
        padding: 10px;
        width:240px;
        
    }
    .contact_icon{
        width:30px;
        height:30px;
        background-color: #2D6191;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        font-size: 17;
    }
    .location{
        svg{
            color: #2D6191;
            font-size: 20px;
        }
    }
</style>