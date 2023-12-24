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
                    <h2 class="fw-bold specific"> {{ deliver.in_progress_count }}</h2>
                </div>
                

                


            </section>

            <!-- add order  -->
            <div class="d-flex justify-content-end mb-3">
                <button class="btn main_btn px-4 br-20" @click="addOrder=true"> انشاء طلب </button>
            </div>
            <!-- table  -->
            <div class="card card_table"  >
                <DataTable 
                    :value="delivers" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                >


                    <Column field="id" header="رقم الطلب"></Column>
                    <Column field="final_total" header="مبلغ التسوية"></Column>
                    <Column field="orders_count" header="الطلبات"></Column>
                    <Column field="pay_type" header="طريقة التسوية"></Column>
                    <Column  header="حالة الطلب" >
                        <template #body="slotProps">
                            <span v-if="slotProps.data.status=='pending'" class="still">جاري المعالجة </span>
                            <span v-if="slotProps.data.status=='completed'" class="complete"> {{ slotProps.data.status_text }} </span>
                        </template>
                    </Column>
                    <Column field="date" header="تاريخ التسوية"></Column>
                    <Column >
                        <template #body="slotProps">

                            <!-- done  -->
                            <button class="btn main_btn br-20 px-4 " @click="openSettle(slotProps.data.final_total ,  slotProps.data.id )" v-if="slotProps.data.status=='pending'">
                                    تفاصيل
                            </button>  
                            <button class="btn main_btn br-20 px-4 " @click="openCompleted(slotProps.data.final_total ,  slotProps.data.id , slotProps.data.image , slotProps.data.pay_type)" v-if="slotProps.data.status=='completed'">
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


    <Dialog v-model:visible="visible" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h6 class="text-center fw-bold mb-2"> {{ deliver.delegate_name }} </h6>
       <p class="fw-bold"> تفاصيل طلب التسوية </p>
       <form ref="settleForm">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> مبلغ التسوية </label>
                        <input type="number" class="form-control" disabled v-model="amount">
                        
                    </div>
                </div>
                
                <div class="col-md-6 mb-2">
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
                            <p> الايبان  /  SA {{ deliver.iban_num }}</p>
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
                                    <input type="radio" v-model="pay_type2"  :checked="pay_type_settle='cash'"  name="pay_type2" value="1">
                                    <label for="" class="mx-3"> نقدى </label>
                                </div>

                                <div class="d-flex align-items-center mx-5">
                                    <input type="radio" v-model="pay_type2" :checked="pay_type_settle='online'"   name="pay_type2" value="2">
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
    </Dialog>

    <Dialog v-model:visible="completed_settle" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h6 class="text-center fw-bold mb-2"> {{ deliver.delegate_name }} </h6>
       <div class="d-flex justify-content-between align-items-center">
        <p class="fw-bold"> تفاصيل طلب التسوية </p>
        <button class="btn main_btn" @click="printContent">
            طباعة
            <i class="fa-solid fa-print"></i>
        </button>
       </div>
       <form ref="settleForm">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> مبلغ التسوية </label>
                        <input type="number" class="form-control" disabled v-model="amount">
                        
                    </div>
                </div>
                
                <div class="col-md-6 mb-2">
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
                    <!-- <div class="upload position-relative">

                        <div class="upload_content">
                            <div>
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            
                            <div>
                                <h6> ارفع  </h6>
                            </div>
                        </div>

                        <input type="file" name="image" class="inputFile" @change="uploadPDF">
                    </div> -->

                    <div class="uploadImage">
                        <!-- <div v-if="pdfUrl" class="pdfPreview"> -->
                        <!-- <iframe :src="pdfUrlGetted" width="100%" height="400px"></iframe> -->
                        <a :href="pdfUrlGetted" target="_blank" class="d-flex text-center flex_center" style="text-decoration:underline">افتح التسوية</a>

                        <!-- </div> -->
                    </div>
                </div>


                <div class="col-md-12 mb-3">
                    <div class="d-flex justify-content-between">

                        <div class="form-group">
                            <p class="fw-bold">طريقة التسوية</p>

                            <div class="settle_way d-flex">
                                <div class="d-flex align-items-center">
                                    <input type="radio" :checked="pay_type_settle='cash'" v-model="pay_type2" name="pay_type2" value="1">
                                    <label for="" class="mx-3"> نقدى </label>
                                </div>

                                <div class="d-flex align-items-center mx-5">
                                    <input type="radio"  :checked="pay_type_settle='online'" v-model="pay_type2" name="pay_type2" value="2">
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


    <!-- add order  -->
    <Dialog v-model:visible="addOrder" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h6 class="text-center fw-bold mb-2"> انشاء طلب </h6>
       <form>
            <div class="row">
                
  
                <div class="col-md-6 mb-3">
                    <div class="d-flex justify-content-between">

                        <div class="form-group">
                            <p class="text-center">الرصيد المتاح</p>

                            <div class="position-relative settle_way settle_info2 settle_info3 d-flex">
                               <input type="number" class="form-control avilable_amount" :value="deliver.final_total" disabled>
                               <h6 class="currency">
                                ريال
                               </h6>
                            </div>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="d-flex justify-content-between">

                        <div class="form-group">
                            <p class="text-center">طريقة التسوية</p>

                            <div class="settle_way settle_info2   d-flex">
                                <div class="d-flex align-items-center">
                                    <input type="radio" v-model="pay_type" name="pay_type" value="1">
                                    <label for="" class="mx-3"> نقدى </label>
                                </div>

                                <div class="d-flex align-items-center mx-5">
                                    <input type="radio"  v-model="pay_type" name="pay_type" value="2">
                                    <label for="" class="mx-3"> تحويل </label>
                                </div>
                            </div>
                        </div>

                        <div>
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
                
            </div>

            <div class="flex_center mt-4">
                <button class="btn main_btn px-5" :disabled="addDisabled" @click.prevent="addNewOrder"> حفظ </button>
            </div>
       </form>
    </Dialog>
    <Toast />


    <form ref="settleForm" id="printendArea" class="d-none">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> مبلغ التسوية </label> : {{amount}}
                        <!-- <input type="number" class="form-control" disabled v-model="amount"> -->
                        
                    </div>
                </div>
                
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> رقم الطلب </label> : {{number}}
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
                            <p> الايبان  / SA {{ deliver.iban_num }}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-2">
                    <!-- <div class="upload position-relative">

                        <div class="upload_content">
                            <div>
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            
                            <div>
                                <h6> ارفع  </h6>
                            </div>
                        </div>

                        <input type="file" name="image" class="inputFile" @change="uploadPDF">
                    </div> -->

                    <div class="uploadImage">
                        <!-- <div v-if="pdfUrl" class="pdfPreview"> -->
                        <iframe :src="pdfUrlGetted" width="100%" height="400px"></iframe>
                        <!-- </div> -->
                    </div>
                </div>


                <div class="col-md-12 mb-3 sttle_pay_content">
                    <div class="d-flex justify-content-between">

                        <div class="form-group">
                            <p class="fw-bold">طريقة التسوية</p>

                            <div class="settle_way d-flex">
                                <div class="d-flex align-items-center">
                                    <input type="radio" v-model="pay_type2" name="pay_type2" value="1">
                                    <label for="" class="mx-3"> نقدى </label>
                                </div>

                                <div class="d-flex align-items-center mx-5">
                                    <input type="radio" v-model="pay_type2" name="pay_type2" value="2">
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

  import Dialog from 'primevue/dialog';
import axios from 'axios';
import Toast from 'primevue/toast';
import moment from 'moment';


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
              addOrder : false,
              deliver : {},
              delivers : [],
              pay_type : '',
              addDisabled : false,
              amount : '',
              number : '',
              currentDate : '',
              cuurentTime : '',
              pay_type2 : '',
              settleDisabled : false,
              settle_id : '',
              pdfUrl: null,
              completed_settle : false,
              pdfUrlGetted : '',
              pay_type_settle : ''

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
                    this.completed_settle = false ;
                    this.getdelivers();
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.settleDisabled = false ;
                }
            } )
        },
        openSettle(amount, number){
            this.visible = true ;
            this.amount = amount ;
            this.number = number ;
        },
        openCompleted(amount, number, image, type){
            this.completed_settle = true ;
            this.amount = amount ;
            this.number = number ;
            this.pdfUrlGetted = image ;
            this.pay_type_settle = type

        },
        // add order 
        async addNewOrder(){
            this.addDisabled = true ;
            const fd = new FormData();

            fd.append('pay_type', this.pay_type);
            fd.append('delegate_id', this.deliver.delegate_id);

            await axios.post('admin/store-delegate-profits-transactions', fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key === 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.addDisabled = false ;
                    this.addOrder = false ;
                    this.getdelivers();

                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.addDisabled = false ;
                }
            } )
        },
        async getdelivers(){
            await axios.get(`admin/delegate-profits-transactions/${this.$route.params.id}`, {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.delivers = res.data.data ;
            } )
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

          }
      },
      mounted(){
          this.deliver = JSON.parse(localStorage.getItem('deliver'));

          this.getdelivers();

          this.currentDate = moment().format('YY-MM-DD')
            this.cuurentTime = moment().format('h:mm:ss A');
      }  
}
</script>


<style  lang="scss" scoped>
.avilable_amount{
    font-size: 40px !important;
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
    .settle_info2{
        background: #fff;
        padding: 26px;
        border-radius: 11px;
        border: 10px solid #52bfbf;
        height: 115px;
    }
    .avilable_amount{
        width: 200px !important;
        height: 94px !important;
    }
    .settle_info3{
        padding: 0 !important;
    }
    .currency{
        position: absolute;
        font-size: 24px !important; 
        left:10px;
        bottom:10px;
    }
</style>

