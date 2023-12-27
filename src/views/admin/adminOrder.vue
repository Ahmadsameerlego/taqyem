<template>
  <navbar />
  <sidebar />
  <section id="content">
        <div class="container">
            <!-- steps  -->
            <div class="login_options  w-75 mx-auto d-flex justify-content-between align-items-center mb-3">
                <button class="btn w-25 " @click="selectButton('new')" :class="{ 'selected': selectedButton === 'new' }" @click.prevent="getNew()">
                    جديد
                </button>
                <button class="btn w-25 " @click="selectButton('still')" :class="{ 'selected': selectedButton === 'still' }" @click.prevent="getIn()">
                    تحت التنفيذ
                </button>
                <button class="btn w-25 " @click="selectButton('delivery')" :class="{ 'selected': selectedButton === 'delivery' }" @click.prevent="getDeliver()">
                    جاري التوصيل
                </button>
                <button class="btn w-25 " @click="selectButton('complete')" :class="{ 'selected': selectedButton === 'complete' }" @click.prevent="getComplete()">
                    مكتمل
                </button>
                <button class="btn w-25 " @click="selectButton('cancel')" :class="{ 'selected': selectedButton === 'cancel' }" @click.prevent="getRefused()">
                    المرفوضة
                </button>
            </div>

             <!-- interactions  -->
            <div class="interactions position-relative d-flex justify-content-between align-items-center mt-5 mb-4">
                <!-- filter  -->
                <div class="">
                    <!-- <button class="btn main_btn" @click="toggleMenu">
                        <i class="fa-solid fa-filter"></i>
                        تصفية
                    </button> -->


                    <!-- filter content  -->
                    <section class="filter_content" ref="filterContent">
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="fw-bold"> فلترة النتائج </p>
                            <button class="btn close_modal" @click="closeModal"> <i class="fas fa-x"></i> </button>
                        </div>

                        <form class="mt-3 fw-6">
                            <p> حالة الطلب </p>
                            <div class="d-flex mb-3">

                                <div class="form-group mx-3">
                                    <input type="radio" class="radio_filter">
                                    <span class="status mx-2 complete"> مكتملة </span>
                                </div>

                                <div class="form-group mx-3">
                                    <input type="radio" class="radio_filter">
                                    <span class="status mx-2 refuse"> مرفوضة </span>
                                </div>

                                <div class="form-group mx-3">
                                    <input type="radio" class="radio_filter">
                                    <span class="status mx-2 still"> تحت التنفيذ </span>
                                </div>
                            </div>

                            <p class=""> تاريخ الطلب </p>

                            <div class="d-flex dates">
                                <div class="form-group position-relative d-flex align-items-center">
                                    <span> من </span>
                                    <Calendar class="mx-2" v-model="from" />
                                    <i class="fa-solid fa-calendar"></i>
                                </div>
                                <div class="form-group position-relative d-flex align-items-center">
                                    <span> الي </span>
                                    <Calendar class="mx-2" v-model="to" />
                                    <i class="fa-solid fa-calendar"></i>
                                </div>
                            </div>


                            <div class="d-flex mt-4">
                                <button class="btn main_btn w-50 pt-2 pb-2"> تطبيق </button>
                                <button class="btn sec_btn w-50 mx-2 pt-2 pb-2"> الغاء </button>
                            </div>
                        </form>
                        
                    
                    </section>


                </div>
                <!-- search  -->
                <div class="flex justify-content-end">
                    <span class="p-input-icon-left">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" v-model="filters['global'].value" class="form-control" placeholder="ابحث عن طلب" />
                    </span>
                </div>
                <!-- download  -->
                <div style="text-align: left">
                    <button class="btn main_btn" label="Export" @click="exportCSV($event)" >
                        <i class="fa-solid fa-download"></i>
                        تصدير البيانات
                    </button>
                </div>
            </div>
                
            <!-- table  -->
            <div class="card card_table">

                <!-- new table  -->
                <DataTable 
                    :value="new_products" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                    v-if="newProducts"
                >
                    <Column field="order_num" header="رقم الطلب"></Column>
                    <Column field="client" header="صاحب الطلب"></Column>
                    <Column field="total_products_amount" header="المبلغ"></Column>
                    <Column  header="المدينة">
                        <template #body="slotProps">
                            <span class="city">
                                {{ slotProps.data.city_name }}
                            </span>                            
                        </template>
                    </Column>
                    

                    <Column field="created_at" header="تاريخ الطلب" sortable></Column>


                    <Column >
                        <template #body="slotProps">
                           

                            <button class="btn-primary mx-2 btn br-20 px-4 pt-2 pb-2" @click.prevent="acceptOrder(slotProps.data.id)">
                                قبول
                            </button>                           
                            <button class="btn-danger mx-2 btn br-20 px-4 pt-2 pb-2" @click.prevent="deleteOrder(slotProps.data.id)">
                                حذف
                            </button> 
                            <router-link class="main_btn br-20 px-4 pt-1 pb-1" :to="'/showOrderClient/'+slotProps.data.id">
                                تفاصيل
                            </router-link>                            
                            <span v-if="false">{{slotProps.data.image}}</span>
                        </template>
                    </Column>


                </DataTable>


                <!-- in progress table  -->
                <DataTable 
                    :value="in_products" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                    v-if="inProducts"
                >
                    <Column field="order_num" header="رقم الطلب"></Column>
                    <Column field="client" header="صاحب الطلب"></Column>
                    <Column field="total_products_amount" header="المبلغ"></Column>
                    <Column  header="المدينة">
                        <template #body="slotProps">
                            <span class="city">
                                {{ slotProps.data.city_name }}
                            </span>                            
                        </template>
                    </Column>
                    

                    <Column field="created_at" header="تاريخ الطلب" sortable></Column>


                    <Column >
                        <template #body="slotProps">
                            <router-link class="main_btn br-20 px-4 pt-2 pb-2" :to="'/admin/client/'+slotProps.data.id">
                                تفاصيل
                            </router-link>    
                            <button class="btn-danger mx-2 btn br-20 px-4 pt-2 pb-2" @click.prevent="deleteOrder(slotProps.data.id)">
                                حذف
                            </button>                          
                        </template>
                    </Column>


                </DataTable>

                 <!-- in deliver table  -->
                <DataTable 
                    :value="in_deliver" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                    v-if="is_deliver"
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

                    <Column field="reference_code" header="رمز التسليم"></Column>

                    <Column >
                        <template #body="slotProps">
                            <router-link class="main_btn br-20 px-4 pt-2 pb-2" :to="'/admin/client/'+slotProps.data.id">
                                تفاصيل
                            </router-link>  
                            <button class="btn-danger mx-2 btn br-20 px-4 pt-2 pb-2" @click.prevent="deleteOrder(slotProps.data.id)">
                                حذف
                            </button>                            
                        </template>
                    </Column>





                </DataTable>


                <!-- complete table  -->
                <DataTable 
                    :value="completes" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                    v-if="is_complete"
                >
                    <Column field="order_num" header="رقم الطلب"></Column>
                    <Column field="client" header="صاحب الطلب"></Column>
                    <Column field="total_products_amount" header="المبلغ"></Column>
                    <Column  header="المدينة">
                        <template #body="slotProps">
                            <span class="city">
                                {{ slotProps.data.city_name }}
                            </span>                            
                        </template>
                    </Column>
                    

                    <Column field="created_at" header="تاريخ الطلب" sortable></Column>


                    <Column >
                        <template #body="slotProps">
                            <router-link class="main_btn br-20 px-4 pt-2 pb-2" :to="'/complete/client/'+slotProps.data.id">
                                تفاصيل
                            </router-link>  
                            <!-- <button class="btn-danger mx-2 btn br-20 px-4 pt-2 pb-2" @click.prevent="deleteOrder(slotProps.data.id)">
                                حذف
                            </button>                             -->
                        </template>
                    </Column>


                </DataTable>


                <!-- refused table  -->
                <DataTable 
                    :value="refuseds" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                    v-if="is_refused"
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

                    <Column field="reference_code" header="رمز التسليم"></Column>

                    <Column >
                        <template #body="slotProps">
                            <router-link class="main_btn br-20 px-4 pt-2 pb-2" :to="'/complete/client/'+slotProps.data.id">
                                تفاصيل
                            </router-link>  
                            <button class="btn btn-danger br-20 px-4  mx-2" @click="openRefuse(slotProps.data.refuse_reason)"> سبب الرفض </button>                         
                        </template>
                    </Column>

                </DataTable>


            </div>


        </div>
  </section>
  <Toast />

  <!-- refuse order  -->
  <Dialog v-model:visible="refuse" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h5 class="text-center"> رفض استلام الطلب </h5>

       <div class="form-group">
            <label for="" class="fw-6 mb-2"> السبب </label>
            <textarea name="" class="form-control" id="" cols="30" v-model="refuse_reason" disabled rows="5">  </textarea>
       </div>

       
    </Dialog>
</template>

<script>
import navbar from "@/components/navComp.vue";
import sidebar from "@/components/sidebarComp.vue";


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import Calendar from 'primevue/calendar';

import axios from 'axios';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';


export default {
    data(){
        return{
            selectedButton : 'new',
            new_products: null,
            in_products : [],
            in_deliver : [],
            completes : [],
            refuseds : [],
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },

            newProducts : false,
            inProducts : false,
            is_deliver  : false,
            is_complete : false,
            is_refused : false,
            refuse : false,
            refuse_reason : ''
        }
    },
    components:{
        navbar,
        sidebar,
        DataTable,
        Column,
        Calendar,
        Toast,
        Dialog
    },
    methods:{
        openRefuse(refuse){
            this.refuse=true;

            this.refuse_reason = refuse ;

            // console.log(refuse)
        },
        selectButton(button) {
            this.selectedButton = button;  
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        toggleMenu(){
            this.$refs.filterContent.classList.toggle('active')
        },
        closeModal(){
            this.$refs.filterContent.classList.remove('active')
        },

        // accept order 
        async acceptOrder(id){
            const fd = new FormData();

            await axios.post(`admin/orders/${id}/accept`, fd , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key === 'success' ){
                    this.$toast.add({ severity: 'success', summary: 'تم قبول الطلب بنجاح', life: 3000 });
                    setTimeout(() => {
                        this.getIn();
                        this.selectedButton = 'still' ;
                    }, 1000);
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                }
            } )
        },

        // delete order 
        async deleteOrder(id){
            const fd = new FormData();
            fd.append('_method', 'delete')
            await axios.post(`admin/orders/${id}?_method=delete`, fd , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key === 'success' ){
                    this.$toast.add({ severity: 'success', summary: 'تم قبول الطلب بنجاح', life: 3000 });
                    setTimeout(() => {
                        this.getNew();
                    }, 1000);
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                }
            } )
        },

        // get new 
        async getNew(){
            await axios.get('admin/orders/new', {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.inProducts = false ;
                this.is_refused= false
                this.is_deliver= false ;
                this.is_complete= false ;
                this.newProducts = true ;
                this.new_products = res.data.data.orders ;
            } )
        },
        // get in 
        async getIn(){
            await axios.get('admin/orders/in_progress', {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.newProducts= false ;
                this.is_deliver= false ;
                this.is_complete= false ;
                this.inProducts = true ;
                this.is_refused= false
                this.in_products = res.data.data.orders ;
            } )
        },

        // get deliver 
        async getDeliver(){
            await axios.get('admin/orders/in_delivery', {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.inProducts = false ;
                this.newProducts= false ;
                this.is_complete= false ;
                this.is_deliver= true ;
                this.is_refused= false
                this.in_deliver = res.data.data.orders ;
            } )
        },

        // get complete 
        async getComplete(){
            await axios.get('admin/orders/finished', {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.inProducts = false ;
                this.newProducts= false ;
                this.is_deliver= false ;
                this.is_complete= true ;
                this.is_refused= false ;
                this.completes = res.data.data.orders ;
            } )
        },

        // get refused 
        async getRefused(){
            await axios.get('admin/orders/refused', {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.inProducts = false ;
                this.newProducts= false ;
                this.is_deliver= false ;
                this.is_complete= false ;
                this.is_refused= true ;
                this.refuseds = res.data.data.orders ;
            } )
        },

    },
    mounted(){
        this.getNew();
    }    
}
</script>

<style>
    .city{
        background-color: #CFDAE9;
        border-radius: 4px;
        padding: 7px 14px !important;
        color:#333 ;
    }
</style>