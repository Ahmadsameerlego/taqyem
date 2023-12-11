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

    <!-- orders table  -->
    <div class="container">

        <!-- interactions  -->
        <div class="interactions position-relative d-flex justify-content-between align-items-center mt-5 mb-4">
            <!-- filter  -->
            <div class="">
                <button class="btn main_btn" @click="toggleMenu">
                    <i class="fa-solid fa-filter"></i>
                    تصفية
                </button>


                <!-- filter content  -->
                <section class="filter_content" ref="filterContent">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="fw-bold"> فلترة النتائج </p>
                        <button class="btn close_modal" @click="closeModal"> <i class="fas fa-x"></i> </button>
                    </div>

                    <form class="mt-3 fw-6">
                        <p> حالة الطلب </p>
                        <div class="status d-flex mb-3">

                            <div class="form-group mx-3">
                                <input type="radio" class="radio_filter" v-model="status" value="finished">
                                <span class="status mx-2 complete"> مكتملة </span>
                            </div>

                            <div class="form-group mx-3">
                                <input type="radio" class="radio_filter" v-model="status" value="refused">
                                <span class="status mx-2 refuse"> مرفوضة </span>
                            </div>

                            <div class="form-group mx-3">
                                <input type="radio" class="radio_filter" v-model="status" value="in_progress">
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
                            <button class="btn main_btn w-50 pt-2 pb-2" @click.prevent="reloadTable"> تطبيق </button>
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
                <Column  header="حالة الطلب">
                    <template #body="slotProps">
                        <!-- <img :src="`https://primefaces.org/cdn/primevue/images/product/${ #body="slotProps"}`" :alt="slotProps.data.image" class="w-6rem shadow-2 border-round" /> -->
                        <span class="refuse" v-if="slotProps.data.status==='client_refused'"> مرفوضة  </span>
                        <span class="still" v-if="slotProps.data.status==='new'"> تحت التنفيذ  </span>
                        <span class="complete" v-if="slotProps.data.status==='finished'"> مكتملة  </span>
                        <!-- {{ slotProps.data.status }} -->
                    </template>
                </Column>
                <Column  header="وسيلة الدفع">
                    <template #body="slotProps">
                        <!-- <img :src="`https://primefaces.org/cdn/primevue/images/product/${ #body="slotProps"}`" :alt="slotProps.data.image" class="w-6rem shadow-2 border-round" /> -->
                        <!-- <span class="pay_method">
                            <img :src="require('@/assets/imgs/Mada-01 1.png')" alt="">
                        </span>                         -->
                        <span class="pay_undefined" v-if="slotProps.data.pay_status=='undefined'"></span>
                        <!-- <span v-if="false">{{slotProps.data.image}}</span> -->
                    </template>
                </Column>
                <Column field="created_at" header="تاريخ الطلب" sortable></Column>
            </DataTable>
        </div>
        
    </div>
    

</template>

<script>
import user from '@/components/sharedUser.vue'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import Calendar from 'primevue/calendar';

import axios from 'axios';
import moment from 'moment';

export default {
    data() {
        return {
            products: null,
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            status  :'',
            from : '',
            to : '',
            form_from : '',
            form_to : ''

        };
    },
    watch:{
        from(){
            this.form_from = moment(this.from).format('YYYY-MM-DD') ;
            // this.getOrders();
        },
        to(){
            this.form_to = moment(this.to).format('YYYY-MM-DD') ;
            // this.getOrders(); 
        },
        // status(){
        //     // this.getOrders();
        // }
    },
    methods:{
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        toggleMenu(){
            this.$refs.filterContent.classList.toggle('active')
        },
        closeModal(){
            this.$refs.filterContent.classList.remove('active')
        },
        reloadTable(){
            this.getOrders();
        },
        
        async getOrders(){
            await axios.get(`sales/orders?status_key=${this.status}&created_at_min=${this.form_from}&created_at_max=${this.form_to}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.products = res.data.data ;
            } )
        }

    },
    components:{
        DataTable,
        Column,
        Calendar,
        user
    },
    mounted() {
        this.getOrders();
    }

}
</script>

<style lang="scss">
    .pay_undefined{
        width: 40px;
        height: 5px;
        background-color: #333;
        border-radius: 2px;
        position: absolute;
    }
    .pay_method{
        border: 1px solid #333;
        border-radius: 4px;
        padding: 13px 23px;
        width: 96px;
        height: 55px;
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .sec_btn{
        border: 1px solid #000000 !important;
    }
    .p-calendar .p-inputtext{
        background-color: #EEEEEE !important    ;
    }
    .fw-6{
        font-weight: 600;
    }
    .complete{
        background-color: #3aff6588;
        border-radius: 5px;
        padding: 3px 12px;
        color: #026416;
    }
    .refuse{
        background-color: #ff7a7a6c;
        border-radius: 5px;
        padding: 3px 12px;
        color: #BE0606;
    }
    .still{
        background-color: #a175066f;
        border-radius: 5px;
        padding: 3px 12px;
        color: #A17606;
    }
    .radio_filter{
        width:20px;
        height:20px;
        accent-color: #000 !important;
        
    }
    .dates {
        svg{
            position: absolute;
             left: 20px;

        }
    }
    
    .filter_content{
        position: absolute;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2509803922);
        z-index: 9;
        top: 92px;
        padding: 20px;
        display: none;
        transition: .3s all;
        .close_modal{
            background-color: #2d61917a !important;
            color: #333 !important;
        }
        &.active{
            display: block;
        }
    }
    .card_table{
        border: 1px solid #333 !important;
        border-radius: 25px !important;
        padding: 10px;

    }
    .main_btn{
        background-color: #2D6191 !important;
        color: #fff !important;
    }
    .interactions{
        background-color: #fff;
        border-radius: 25px;
        border: 1px solid #333;
        padding: 12px 30px;
    }
    .p-datatable .p-datatable-thead > tr > th{background-color: #fff !important;    font-family: "Cairo", sans-serif !important; text-align: center !important;}
    .p-column-header-content{
        justify-content: center !important;
    }
    .card_table tbody,.card_table td,.card_table tfoot,.card_table th,.card_table thead,.card_table tr{
        text-align: center !important;
        border-bottom: 1px solid #333 !important;
    }
    .p-paginator .p-paginator-first, .p-paginator .p-paginator-prev, .p-paginator .p-paginator-next, .p-paginator .p-paginator-last{
        transform: rotate(180deg) !important;
    }
    .p-paginator .p-dropdown .p-dropdown-label{
        padding-left: 0px !important;
        padding-right: 10px !important;
    }
    .p-datepicker .p-datepicker-header .p-datepicker-prev, .p-datepicker .p-datepicker-header .p-datepicker-next{
        transform: rotate(180deg) !important;
    }

    .p-dialog .p-dialog-content{
        font-family: 'cairo' !important;
    }
    
</style>