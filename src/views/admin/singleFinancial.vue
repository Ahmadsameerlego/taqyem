<template>
    <navbar />
    <sidebar />
    <section id="content">
        <div class="container">
            <h4 class="text-center mt-5 mb-5 fw-6"> التسوية المالية </h4>
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
            <section class="dates mb-3 d-flex">
                <!-- single date  -->
                <div class="single_date">

                    <div class="title mb-2">
                        <span> اليوم </span>
                    </div>
                    <h5 class="fw-bold specific"> {{ day }} </h5>
                </div>

                <!-- single date  -->
                <div class="single_date mx-2">
                    <div class="title mb-2">
                        <span> التاريخ </span>
                    </div>

                    <div>
                        <h6 class="fw-bold">  {{ hejri }}هـ </h6>
                        <h6 class="fw-bold">   {{ date }}م</h6>
                    </div>
                </div>


            </section>
            <!-- table  -->
            <div class="card card_table" >
                <DataTable 
                    :value="settles" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                >

                    <Column field="delegate_name" header="الموصل"></Column>
                    <Column  >
                        <template #body="slotProps">

                            <!-- settle done  -->
                            <div class="settle_done d-flex justify-content-between align-items-center" v-if="slotProps.data.status=='completed'">
                                <div>
                                    <span class="fw-bold"> مبلغ التسوية </span>
                                    <span class="fw-bold"> {{ slotProps.data.settlement_paid_amount }} ريال </span>
                                </div>
                                <div>
                                    <span class="fw-bold"> تمت التسوية  </span>
                                </div>
                                <div>
                                    <span class="fw-bold"> التاريخ </span>
                                    <span class="fw-bold"> {{slotProps.data.date  }} </span>
                                </div>
                            </div>

                            <!-- settle still  -->
                            <div class="settle_still d-flex justify-content-center align-items-center" v-if="slotProps.data.status=='not_completed'">
                                
                                <div>
                                    <span class="fw-bold"> تسوية غير مكتملة   </span>
                                </div>
                               
                            </div>

                            <!-- settle not  -->
                            <div class="d-flex justify-content-between align-items-center" v-if="slotProps.data.status=='zero'">
                                <div>
                                    <div class="fw-bold" style="font-size:20px"> النقد </div>
                                    <div class="fw-bold"> {{ slotProps.data.settlement_paid_amount }} ريال </div>
                                </div>
                                
                                <div>
                                    <div class="fw-bold" style="font-size:20px"> مدى </div>
                                    <div class="fw-bold">  {{ slotProps.data.total_debit }} ريال  </div>
                                </div>
                            </div>


                            <span v-if="false">{{slotProps.data.image}}</span>
                        </template>
                         
                    </Column>
                    <Column field="returns_count" header="المسترجع"></Column>
                    <Column  header="الحالة">
                        <template #body="slotProps">

                            <!-- done  -->
                            <button class="btn btn_done br-20 px-4 " @click="openCompleted( slotProps.data)" v-if="slotProps.data.status=='completed'">
                                    تفاصيل
                            </button>  
                            <!-- still  -->
                            <button class="btn btn_still br-20 px-4 " @click="openSettle(slotProps.data.delegate_id , slotProps.data.date , slotProps.data.settlement_paid_amount , slotProps.data.total_cash , slotProps.data.total_online)" v-if="slotProps.data.status=='not_completed'">
                                    تفاصيل
                            </button>     
                            <!-- not          -->
                            <button class="btn br-20 px-4 btn-danger" @click="openSettle(slotProps.data.delegate_id , slotProps.data.date , slotProps.data.settlement_paid_amount)" v-if="slotProps.data.status=='zero'">
                                    تسوية
                            </button>
                            <span v-if="false">{{slotProps.data.image}}</span>


                           
                        </template>


                        
                    </Column>
                    


                    
                </DataTable>
            </div>    
        </div>
        
    </section>


    <Dialog v-model:visible="visible" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h6 class="text-center fw-bold mb-2"> تسوية </h6>
       <form ref="settleForm">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> نقدي </label>
                        <input type="number" class="form-control" v-model="paid_amount">
                        <span class="mt-2">
                            متبقي {{ remind }} ريال
                        </span>
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> مدى </label>
                        <input type="number" class="form-control" v-model="total_online">
                    </div>
                </div>
                <div class="col-md-12 mb-2">
                    <div class="form-group">
                        <label for=""> المسترجع </label>
                        <input type="number" class="form-control" v-model="returns_count">
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <div class="form-group">
                        <label for=""> الملاحظات </label>
                        <textarea type="number" rows="5" class="form-control"  v-model="notes"> </textarea>
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

                        <!-- <input type="file" name="image" class="inputFile" @change="uploadImage"> -->
                        <input type="file" name="image" class="inputFile" @change="uploadPDF">

                    </div>

                    <div class="uploadImage" v-if="visib">
                        <div v-if="pdfUrl" class="pdfPreview">
                        <iframe :src="pdfUrl" width="100%" height="400px"></iframe>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class="flex_center mt-4">
                <button class="btn main_btn px-5" :disabled="disabled" @click.prevent="sendSettle"> حفظ </button>
            </div>
       </form>
    </Dialog>

    <Dialog v-model:visible="compeletedModal" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h6 class="text-center fw-bold mb-2"> تسوية </h6>
       <form ref="settleForm">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> نقدي </label>
                        <input type="number" class="form-control" v-model="settle_data.settlement_cash" disabled>
                        <span class="mt-2">
                            متبقي {{ remind }} ريال
                        </span>
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> مدى </label>
                        <input type="number" class="form-control" disabled v-model="settle_data.settlement_online">
                    </div>
                </div>
                <div class="col-md-12 mb-2">
                    <div class="form-group">
                        <label for=""> المسترجع </label>
                        <input type="number" class="form-control" v-model="settle_data.returns_count" disabled>
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <div class="form-group">
                        <label for=""> الملاحظات </label>
                        <textarea type="number" rows="5" class="form-control"  v-model="settle_data.settlement_note" disabled> </textarea>
                    </div>
                </div>

                <div class="col-md-12 mb-2">
                    <!-- <div class="upload position-relative">

                         <div class="upload_content">
                            <div>
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            
                            <div>
                                <h6> ارفع الموازنة </h6>
                            </div>
                        </div> 

                        <input type="file" name="image" class="inputFile" @change="uploadImage">
                    </div> -->

                    <div class="uploadImage" >
                        <img :src="settle_data.settlement_image" alt="">
                    </div>
                </div>
                
            </div>

            <div class="flex_center mt-4">
                <button class="btn main_btn px-5" :disabled="disabled" @click.prevent="sendSettle"> حفظ </button>
            </div>
       </form>
    </Dialog>

    <Toast />
</template>

<script>
  import navbar from "@/components/navComp.vue";
  import sidebar from "@/components/sidebarComp.vue";


  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { FilterMatchMode } from 'primevue/api';
    import axios from 'axios';
  import Dialog from 'primevue/dialog';
  import moment from 'moment';
  import Toast from 'primevue/toast';


//   import { PDFJS } from 'pdfjs-dist/build/pdf';

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
              day : '',
              date : '',
              hejri : '',
              settles : [],
              delegate_id : '',
              amount : 0,
              date_sended : '',
              remind : 0,
              paid_amount : '',
              returns_count : '',
              notes : '',

              disabled : false,
              compeletedModal : false,
              settlement_paid_amount : '',

            //   desc : '',
            settle_data : {},
            total_online : '',
            pdfUrl: null,

            //   r
          }
      },

      watch:{
        paid_amount(){
            this.remind = this.amount - this.paid_amount
        }
      },

      methods:{

        async sendSettle(){
            const fd = new FormData(this.$refs.settleForm);
            fd.append('cash_amount', this.paid_amount);
            fd.append('online_amount', this.total_online);
            fd.append('returns_count', this.returns_count);
            fd.append('notes', this.notes);
            fd.append('delegate_id', this.delegate_id);
            fd.append('date', moment(this.date_sended).format('YY-MM-DD'));

            this.disabled = true ;

            await axios.post('admin/send-financial-settlement', fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.disabled = false ;

                    this.visible = false ;

                    this.getSettle();
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.disabled = false ;
                }
            } )
        },
        openSettle(id  , date , settlement_paid_amount , total_cash , total_debit){
            this.visible = true ;
            this.delegate_id = id ;
            this.amount = total_cash;
            // console.log(this.amount - 10);
            this.date_sended = date ;


            this.remind = total_cash ;

            console.log(settlement_paid_amount)
            console.log(this.remind)
            this.paid_amount = total_cash ;

            this.total_online = total_debit ;

            



        },
        openCompleted(settle_date){
            this.compeletedModal = true ;
            this.settle_data = settle_date ;

            console.log(settle_date)
            console.log(this.settle_data)

            // this.getCompetedSettle(settle_id)

        },

        // async getCompetedSettle(id){
        //     await axios.get(`admin/sales-profits-transactions/${id}`,{
        //         headers:{
        //             Authorization : `Bearer ${localStorage.getItem('token')}`
        //         }
        //     } )
        //     .then( (res)=>{

        //     } )
        // },
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
        //   uploadImage(e){
        //     this.visib =true ;
        //     const file = e.target.files[0];
        //     this.image = URL.createObjectURL(file);

        //   },

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
          async getSettle(){
            await axios.get(`admin/financial-transactions-by-day?date=${moment(this.date).format('YY-MM-DD')}`, {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.settles = res.data.data.transactions ;
            } )
          }
      },
      mounted(){

          
          this.getSettle();

      }  ,
      beforeMount(){
        this.day = localStorage.getItem('settle_day');
          this.date = localStorage.getItem('settle_date');
          this.hejri = localStorage.getItem('settle_hejri');
      }
}
</script>

<style lang="scss">
    .uploadImage{
        width: auto;
        height: auto;
        margin: auto;
        margin-top: 18px;
        img{
            width:100%;
            height:100%;
            object-fit: contain;
        }
    }
    .upload{
        background-color: #35BFBF;
        border-radius: 10px;
        width: 250px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin:auto ;
        .upload_content{
            background-color: #fff;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 12px;
        }
        .inputFile{
            position: absolute;
            width:100%;
            height:100%;
            top:0;
            left:0;
            opacity: 0;
        }
    }
    .btn_done{
        background-color: #9DFFB2 !important; 
        color:#0C6E20 !important;
    }
    .btn_still{
        background-color: #F6D786 !important; 
        color:#B68E26  !important;
    }
    .single_date{
        background-color: #2D6191;
        border-radius: 10px;
        color:#fff !important;
        width:170px;
        height:100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .settle_done{
        background-color: #9DFFB2;
        border-radius: 7px;
        padding: 15px 15px;
        color:#0C6E20 !important;
    }
    .settle_still{
        border-radius: 7px;
        padding: 15px 15px;
        color:#B68E26 ;
        background-color: #F6D786;
    }
</style>