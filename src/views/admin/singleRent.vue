<template>
    <navbar />
    <sidebar />
    <section id="content">
        <div class="container">
            <h4 class="text-center mt-5 mb-5 fw-6"> تسوية الاجور </h4>
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
            
            <!-- dates and day  -->
            <section class="dates mb-3 flex_center">
                <!-- single date  -->
                <div class="single_date mx-2">

                    <div class="title mb-2">
                        <span> الطلبات المكتملة </span>
                    </div>
                    <h2 class="fw-bold specific"> {{ deliver.completed_count }} </h2>
                </div>
                <!-- single date  -->
                <div class="single_date mx-2">

                    <div class="title mb-2">
                        <span> الطلبات تحت التنفيذ </span>
                    </div>
                    <h2 class="fw-bold specific">  {{ deliver.in_progress_count }} </h2>
                </div>
                <!-- single date  -->
                <div class="single_date mx-2">

                    <div class="title mb-2">
                        <span> الطلبات المرفوضة </span>
                    </div>
                    <h2 class="fw-bold specific"> {{ deliver.refused_count }}  </h2>
                </div>

                


            </section>
            <!-- table  -->
            <div class="card card_table" >
                <DataTable 
                    :value="delivers" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                >


                    <Column  header="رقم الطلب">
                        <template #body="slotProps">
                            {{ slotProps.index+1 }}
                        </template>
                    </Column>
                    <Column field="final_total" header="مبلغ التسوية"></Column>
                    <Column field="reward_amount" header="المكافأة"></Column>
                    <Column field="orders_count" header="عدد الطلبات"></Column>
                    <Column field="pay_type_text" header="طريقة التسوية"></Column>
                    <Column  header="حالة الطلب">
                        <template #body="slotProps">

                            <!-- done  -->
                            <button class="btn complete br-20 px-4 " v-if="slotProps.data.status=='completed'">
                                    مكتمل
                            </button>  
                            <!-- still  -->
                            <button class="btn btn_still br-20 px-4 " v-if="slotProps.data.status=='not_completed'">
                                    جاري المعالجة
                            </button>     
                            <!-- not          -->
                            <button class="btn br-20 px-4 btn-danger"  v-if="slotProps.data.status=='not'">
                                    غير مسحوب
                            </button>


                           
                        </template>


                        
                    </Column>

                    <Column field="month" header="شهر "></Column>
                    <Column field="date" header="تاريخ التسوية"></Column>
                    <Column >
                        <template #body="slotProps">

                            <!-- done  -->
                            <button class="btn main_btn br-20 px-4 " @click="openSettle(slotProps.data)" v-if="slotProps.data.status=='completed'||slotProps.data.status=='pending'">
                                    تفاصيل
                            </button>  
                            <!-- done  -->
                            <button class="btn main_btn br-20 px-4 " @click="openNotCompleted(slotProps.data)" v-if="slotProps.data.status=='not_completed'">
                                    تفاصيل
                            </button>  

                            <button class="btn main_btn br-20 px-4 " @click="openNot(slotProps.data)" v-if="slotProps.data.status=='not'">
                                    تفاصيل
                            </button>  
                            <!-- still  -->
                            
                            <span v-if="false">{{slotProps.data.image}}</span>


                           
                        </template>


                        
                    </Column>


                    


                    
                </DataTable>
            </div>    
        </div>
        
    </section>


    <Dialog  v-model:visible="visible" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h6 class="text-center fw-bold mb-2"> انشاء طلب </h6>
       <div class="d-flex justify-content-between align-items-center">
        <p class="fw-bold"> تفاصيل طلب التسوية </p>
        <button class="btn main_btn" @click="printContent">
            طباعة
            <i class="fa-solid fa-print"></i>
        </button>
       </div>
       <form ref="settleForm" id="">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> العمولة </label>
                        <input type="number" class="form-control" disabled v-model="profit">
                        
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> عدد الطلبات </label>
                        <input type="number" class="form-control" disabled v-model="orders">
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> قيمة المكافأة </label>
                        <input type="number" class="form-control" disabled v-model="reward">
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> الاجمالي </label>
                        <input type="number" class="form-control" disabled v-model="amount">
                    </div>
                </div>
                <div class="col-md-12 mb-2">
                    <div class="form-group">
                        <label for=""> رقم الطلب </label>
                        <input type="number" class="form-control" disabled v-model="number">
                    </div>
                </div>
                

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> تاريخ اجراء الطلب </label>
                        <!-- <input type="date" class="form-control" v-model="currentDate"> -->
                        <div class="current_date">
                            {{ currentDate }}
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> وقت اجراء الطلب</label>
                        <!-- <input type="time" class="form-control" v-model="currentTime"> -->
                        <div class="current_date">
                            {{ cuurentTime }}
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-4 mt-4">
                    <div class="d-flex justify-content-between px-4 pt-4 pb-4 settle_info">
                        <div>
                            <p > اسم البنك / {{ deliver.bank_name }} </p>
                            <p> صاحب الحساب / {{ deliver.account_owner_name }} </p>
                        </div>
                        <div>
                            <p > رقم الحساب / {{ deliver.account_num }} </p>
                            <p> الايبان  /  SA{{ deliver.iban_num }}</p>
                        </div>
                    </div>
                </div>


                <div class="col-md-12 mb-2">
                    <!-- <div class="upload position-relative">

                    </div> -->

                    <div class="uploadImage" >
                        <div  class="pdfPreview">
                        <!-- <iframe :src="pdf_uploaded" width="100%" height="400px"></iframe> -->
                        <!-- <embed :src="pdf_uploaded" type="application/pdf" width="100%" height="400px" /> -->
                        <!-- <object :data="pdf_uploaded" type="application/pdf" width="100%" height="400px"></object> -->
                        <a :href="pdf_uploaded" target="_blank" class="d-flex text-center flex_center" style="text-decoration:underline">افتح التسوية</a>

                        </div>
                    </div>
                </div>


                <div class="col-md-12 mb-3 sttle_pay_content ">
                    <div class="d-flex justify-content-between">

                        <div class="form-group">
                            <p class="fw-bold">طريقة التسوية</p>

                            <div class="settle_way d-flex">
                                <div class="d-flex align-items-center">
                                    <input type="radio" :checked="settle_pay_type=='cash'" disabled v-model="pay_type" name="pay_type" value="1">
                                    <label for="" class="mx-3"> نقدى </label>
                                </div>

                                <div class="d-flex align-items-center mx-5">
                                    <input type="radio" :checked="settle_pay_type=='online'" disabled v-model="pay_type" name="pay_type" value="2">
                                    <label for="" class="mx-3"> تحويل </label>
                                </div>
                            </div>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>
                
            </div>

            <!-- <div class="flex_center mt-4">
                <button class="btn main_btn px-5" :disabled="settleDisabled" @click.prevent="settle"> حفظ </button>
            </div> -->
       </form>
    </Dialog>
    <Dialog v-model:visible="sttle_not" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h6 class="text-center fw-bold mb-2"> انشاء طلب </h6>
       <p class="fw-bold"> تفاصيل طلب التسوية </p>
       <form ref="settleForm_not">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> العمولة </label>
                        <input type="number" class="form-control" name="total_profit"  v-model="profit">
                        
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> عدد الطلبات </label>
                        <input type="number" class="form-control" disabled v-model="orders">
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> قيمة المكافأة </label>
                        <input type="number" class="form-control" name="reward_amount"  v-model="reward">
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> الاجمالي </label>
                        <input type="number" class="form-control" name="" disabled v-model="amount">
                    </div>
                </div>
                <div class="col-md-12 mb-2">
                    <div class="form-group">
                        <label for=""> رقم الطلب </label>
                        <input type="number" class="form-control" disabled v-model="number">
                    </div>
                </div>
                

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> تاريخ اجراء الطلب </label>
                        <!-- <input type="date" class="form-control" v-model="currentDate"> -->
                        <div class="current_date">
                            {{ currentDate }}
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> وقت اجراء الطلب</label>
                        <!-- <input type="time" class="form-control" v-model="currentTime"> -->
                        <div class="current_date">
                            {{ cuurentTime }}
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-4 mt-4">
                    <div class="d-flex justify-content-between px-4 pt-4 pb-4 settle_info">
                        <div>
                            <p > اسم البنك / {{ deliver.bank_name }} </p>
                            <p> صاحب الحساب / {{ deliver.account_owner_name }} </p>
                        </div>
                        <div>
                            <p > رقم الحساب / {{ deliver.account_num }} </p>
                            <p> الايبان  /  SA{{ deliver.iban_num }}</p>
                        </div>
                    </div>
                </div>





               


                <div class="col-md-12 mb-3">
                    <div class="d-flex justify-content-between">

                        <div class="form-group">
                            <p class="fw-bold">طريقة التسوية</p>

                            <div class="settle_way d-flex">
                                <div class="d-flex align-items-center">
                                    <input type="radio" v-model="pay_type" name="pay_type" value="1">
                                    <label for="" class="mx-3"> نقدى </label>
                                </div>

                                <div class="d-flex align-items-center mx-5">
                                    <input type="radio" v-model="pay_type" name="pay_type" value="2">
                                    <label for="" class="mx-3"> تحويل </label>
                                </div>
                            </div>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="flex_center mt-4">
                <button class="btn main_btn px-5" :disabled="settleDisabled" @click.prevent="settle_not"> حفظ </button>
            </div>
       </form>
    </Dialog>


    <Dialog v-model:visible="sttle_not_completed" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h6 class="text-center fw-bold mb-2"> انشاء طلب </h6>
       <p class="fw-bold"> تفاصيل طلب التسوية </p>
       <form ref="settleForm_not">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> العمولة </label>
                        <input type="number" class="form-control" name="total_profit"  disabled v-model="profit">
                        
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> عدد الطلبات </label>
                        <input type="number" class="form-control" disabled v-model="orders">
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> قيمة المكافأة </label>
                        <input type="number" class="form-control" name="reward_amount" disabled v-model="reward">
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> الاجمالي </label>
                        <input type="number" class="form-control" name="" disabled v-model="amount">
                    </div>
                </div>
                <div class="col-md-12 mb-2">
                    <div class="form-group">
                        <label for=""> رقم الطلب </label>
                        <input type="number" class="form-control" disabled v-model="number">
                    </div>
                </div>
                

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> تاريخ اجراء الطلب </label>
                        <!-- <input type="date" class="form-control" v-model="currentDate"> -->
                        <div class="current_date">
                            {{ currentDate }}
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> وقت اجراء الطلب</label>
                        <!-- <input type="time" class="form-control" v-model="currentTime"> -->
                        <div class="current_date">
                            {{ cuurentTime }}
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-4 mt-4">
                    <div class="d-flex justify-content-between px-4 pt-4 pb-4 settle_info">
                        <div>
                            <p > اسم البنك / {{ deliver.bank_name }} </p>
                            <p> صاحب الحساب / {{ deliver.account_owner_name }} </p>
                        </div>
                        <div>
                            <p > رقم الحساب / {{ deliver.account_num }} </p>
                            <p> الايبان  / SA {{ deliver.iban_num }}</p>
                        </div>
                    </div>
                </div>




                <div class="col-md-12 mb-2">
                    <div class="upload position-relative">

                        <div class="upload_content">
                            <div>
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            
                            <div>
                                <h6> ارفع  </h6>
                            </div>
                        </div>

                        <input type="file" name="image" class="inputFile" @change="uploadPDF">
                    </div>

                    <div class="uploadImage" v-if="visib">
                        <div v-if="pdfUrl" class="pdfPreview">
                        <iframe :src="pdfUrl" width="100%" height="400px"></iframe>
                        </div>
                    </div>
                </div>
               


                <div class="col-md-12 mb-3">
                    <div class="d-flex justify-content-between">

                        <div class="form-group">
                            <p class="fw-bold">طريقة التسوية</p>

                            <div class="settle_way d-flex">
                                <div class="d-flex align-items-center">
                                    <input type="radio" :checked="settle_pay_type=='cash'" v-model="pay_type" name="pay_type" value="1">
                                    <label for="" class="mx-3"> نقدى </label>
                                </div>

                                <div class="d-flex align-items-center mx-5">
                                    <input type="radio" :checked="settle_pay_type=='online'" v-model="pay_type" name="pay_type" value="2">
                                    <label for="" class="mx-3"> تحويل </label>
                                </div>
                            </div>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="flex_center mt-4">
                <button class="btn main_btn px-5" :disabled="settleDisabled" @click.prevent="settle_not"> حفظ </button>
            </div>
       </form>
    </Dialog>


    <Toast />


    <form ref="settleForm" id="printendArea" class="d-none">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> العمولة </label> : 
                        {{  profit}}
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> عدد الطلبات </label> : {{ orders }}
                        <!-- <input type="number" class="form-control" disabled v-model="orders"> -->

                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> قيمة المكافأة </label> : {{ reward }}
                        <!-- <input type="number" class="form-control" disabled v-model="reward"> -->
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> الاجمالي </label>  : {{ amount }}
                        <!-- <input type="number" class="form-control" disabled v-model="amount"> -->
                    </div>
                </div>
                <div class="col-md-12 mb-2">
                    <div class="form-group">
                        <label for=""> رقم الطلب </label> :  {{ number }}
                        <!-- <input type="number" class="form-control" disabled v-model="number"> -->
                    </div>
                </div>
                

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> تاريخ اجراء الطلب </label>
                        <!-- <input type="date" class="form-control" v-model="currentDate"> -->
                        <div class="current_date">
                            {{ currentDate }}
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> وقت اجراء الطلب</label>
                        <!-- <input type="time" class="form-control" v-model="currentTime"> -->
                        <div class="current_date">
                            {{ cuurentTime }}
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-4 mt-4">
                    <div class="d-flex justify-content-between px-4 pt-4 pb-4 settle_info">
                        <div>
                            <p > اسم البنك / {{ deliver.bank_name }} </p>
                            <p> صاحب الحساب / {{ deliver.account_owner_name }} </p>
                        </div>
                        <div>
                            <p > رقم الحساب / {{ deliver.account_num }} </p>
                            <p> الايبان  /  SA{{ deliver.iban_num }}</p>
                        </div>
                    </div>
                </div>


                <div class="col-md-12 mb-2">
                    <!-- <div class="upload position-relative">

                    </div> -->

                    <div class="uploadImage" >
                        <div  class="pdfPreview">
                        <iframe :src="pdf_uploaded" width="100%" height="400px"></iframe>
                        </div>
                    </div>
                </div>


                <div class="col-md-12 mb-3 sttle_pay_content ">
                    <div class="d-flex justify-content-between">

                        <div class="form-group">
                            <p class="fw-bold">طريقة التسوية</p>

                            <div class="settle_way d-flex">
                                <div class="d-flex align-items-center">
                                    <input type="radio" v-model="pay_type" name="pay_type" value="1">
                                    <label for="" class="mx-3"> نقدى </label>
                                </div>

                                <div class="d-flex align-items-center mx-5">
                                    <input type="radio" v-model="pay_type" name="pay_type" value="2">
                                    <label for="" class="mx-3"> تحويل </label>
                                </div>
                            </div>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="flex_center mt-4">
                <button class="btn main_btn px-5" :disabled="settleDisabled" @click.prevent="settle"> حفظ </button>
            </div>
       </form>
</template>

<script>
  import navbar from "@/components/navComp.vue";
  import sidebar from "@/components/sidebarComp.vue";


  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { FilterMatchMode } from 'primevue/api';
//   import moment from 'moment';

  import Dialog from 'primevue/dialog';
    import axios from 'axios'
    import Toast from 'primevue/toast';

export default {
    components:{
        navbar,
        sidebar,
        DataTable,
        Column,
        Dialog,
        Toast

    },
    data(){
          return{
              products: null,
              filters: {
                  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
              },
              visible : false,
              image : '',
              visib : false,
              deliver : {},
              delivers : [],
              amount : '',
              orders : '',
              reward : '',
              profit : '',
              number : '',
              cuurentTime  :'',
              currentDate : '',
              settleDisabled : false,
              sttle_not : false,
              pdfUrl: null,
              pdf_uploaded : '',
              sttle_not_completed : false,
              settle_pay_type : ''

              
          }
      },

      methods:{
      
        printContent() {
            this.$nextTick(() => {

            // Clone the dialog content excluding the specified part
            const printContent = document.querySelector('#printendArea').cloneNode(true);

            // Remove the specified part from the cloned content
            const elementToRemove = printContent.querySelector('.sttle_pay_content');
            if (elementToRemove) {
                elementToRemove.remove();
            }

            // Create a new window for printing
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<html><head><title>Print</title></head><body>');
            printWindow.document.write(printContent.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();

            // Call the print function in the new window
            printWindow.print();
            printWindow.onafterprint = () => {
                printWindow.close();
            };
        })
        },


        uploadPDF(e) {
            const file = e.target.files[0];
            const allowedTypes = ['application/pdf'];

            if (file && allowedTypes.includes(file.type)) {
                this.visib = true;
                this.loadPDF(file);
            } else {
                alert('Please select a valid PDF file.');
            }
            },
            loadPDF(file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const pdfUrl = event.target.result;
                this.pdfUrl = pdfUrl;
            };

            reader.readAsDataURL(file);
            },
        openNot(data){
            this.sttle_not = true ;
            this.amount = data.final_total ;
            this.orders = data.orders_count ;
            this.reward = data.reward_amount ;
            this.profit = data.total_profit ;
            this.number = data.id ;
            this.currentDate = data.created_at ;
            this.cuurentTime = data.created_at_time ;

        },
        openSettle(data){
            this.visible = true ;

            this.amount = data.final_total ;
            this.orders = data.orders_count ;
            this.reward = data.reward_amount ;
            this.profit = data.total_profit ;
            this.number = data.id ;
            this.pdf_uploaded = data.image
            this.settle_pay_type = data.pay_type;
            this.currentDate = data.created_at ;
            this.cuurentTime = data.created_at_time ;
        },
        openNotCompleted(data){
            this.sttle_not_completed = true ;
            this.amount = data.final_total ;
            this.orders = data.orders_count ;
            this.reward = data.reward_amount ;
            this.profit = data.total_profit ;
            this.number = data.id ;
            this.pdf_uploaded = data.image;
            this.settle_pay_type = data.pay_type;
            this.currentDate = data.created_at ;
            this.cuurentTime = data.created_at_time ;

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
          uploadImage(e){
            this.visib =true ;
            const file = e.target.files[0];
            this.image = URL.createObjectURL(file);

          },

          async getdelivers(){
            await axios.get(`admin/sales-profits-transactions/${this.$route.params.id}`, {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.delivers = res.data.data ;
            } )
        },

        async settle(){
            const fd =new FormData(this.$refs.settleForm);
            this.settleDisabled = true ;
            
            await axios.post(`admin/upload-settlement-image/${this.number}`, fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key === 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.settleDisabled = false ;
                    this.visible = false ;
                    this.getdelivers();
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.settleDisabled = false ;
                }
            } )
        },
        async settle_not(){
            const fd =new FormData(this.$refs.settleForm_not);
            this.settleDisabled = true ;
            
            await axios.post(`admin/update-settlement-profits-settlement/${this.number}`, fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key === 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.settleDisabled = false ;
                    this.sttle_not = false ;
                    this.sttle_not_completed = false ;
                    this.getdelivers();
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.settleDisabled = false ;
                }
            } )
        },
      },
 
    
      mounted(){
        this.deliver = JSON.parse(localStorage.getItem('deliver'));
        this.getdelivers();
        // this.currentDate = moment().format('YY-MM-DD')
        //     this.cuurentTime = moment().format('h:mm:ss A');
      }  
}
</script>


<style lang="scss">
.settle_info{
    background-color: #2D6191;
    p{
        color:#fff !important;
    }
}
.settle_way{
    background: #52bfbf;
    padding: 26px;
    border-radius: 11px;
    input{
        accent-color: #333;
        width: 16px;
        height: 16px;
    }
    label{
        background: #e5d9d9;
        padding: 2px 10px;
        border-radius: 3px;
    }
}
.current_date{
        width: 100%;
        height: 37px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #e9ecf0;
        padding-top: 6px;
        padding-right: 10px;
    }
</style>

