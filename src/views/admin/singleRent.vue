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
                    <h2 class="fw-bold specific"> 10 </h2>
                </div>
                <!-- single date  -->
                <div class="single_date mx-2">

                    <div class="title mb-2">
                        <span> الطلبات تحت التنفيذ </span>
                    </div>
                    <h2 class="fw-bold specific"> 10 </h2>
                </div>
                <!-- single date  -->
                <div class="single_date mx-2">

                    <div class="title mb-2">
                        <span> الطلبات المرفوضة </span>
                    </div>
                    <h2 class="fw-bold specific"> 10 </h2>
                </div>

                


            </section>
            <!-- table  -->
            <div class="card card_table" >
                <DataTable 
                    :value="products" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                >


                    <Column field="code" header="الموصل"></Column>
                    <Column  >
                        <template #body="slotProps">

                            <!-- settle done  -->
                            <div class="settle_done d-flex justify-content-between align-items-center">
                                <div>
                                    <span class="fw-bold"> مبلغ التسوية </span>
                                    <span class="fw-bold"> 4000 ريال </span>
                                </div>
                                <div>
                                    <span class="fw-bold"> تمت التسوية  </span>
                                </div>
                                <div>
                                    <span class="fw-bold"> التاريخ </span>
                                    <span class="fw-bold"> 23/11/2023 </span>
                                </div>
                            </div>

                            <!-- settle still  -->
                            <!-- <div class="settle_still d-flex justify-content-center align-items-center">
                                
                                <div>
                                    <span class="fw-bold"> تسوية غير مكتملة   </span>
                                </div>
                               
                            </div> -->

                            <!-- settle not  -->
                            <!-- <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <span class="fw-bold"> النقد </span>
                                    <span class="fw-bold"> 4000 ريال </span>
                                </div>
                                
                                <div>
                                    <span class="fw-bold"> مدى </span>
                                    <span class="fw-bold"> 4000 ريال  </span>
                                </div>
                            </div> -->


                            <span v-if="false">{{slotProps.data.image}}</span>
                        </template>
                         
                    </Column>
                    <Column field="category" header="المسترجع"></Column>
                    <Column  header="الحالة">
                        <template #body="slotProps">

                            <!-- done  -->
                            <button class="btn main_btn br-20 px-4 " @click="visible=true">
                                    تفاصيل
                            </button>  
                            <!-- still  -->
                            <!-- <button class="btn btn_still br-20 px-4 ">
                                    تفاصيل
                            </button>      -->
                            <!-- not          -->
                            <!-- <button class="btn br-20 px-4 btn-danger">
                                    تسوية
                            </button> -->
                            <span v-if="false">{{slotProps.data.image}}</span>


                           
                        </template>


                        
                    </Column>
                    


                    
                </DataTable>
            </div>    
        </div>
        
    </section>


    <Dialog v-model:visible="visible" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       <h6 class="text-center fw-bold mb-2"> تسوية </h6>
       <form>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> نقدي </label>
                        <input type="number" class="form-control">
                        <span class="mt-2">
                            متبقي 500 ريال
                        </span>
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-group">
                        <label for=""> مدى </label>
                        <input type="number" class="form-control">
                    </div>
                </div>
                <div class="col-md-12 mb-2">
                    <div class="form-group">
                        <label for=""> المسترجع </label>
                        <input type="number" class="form-control">
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <div class="form-group">
                        <label for=""> الملاحظات </label>
                        <textarea type="number" rows="5" class="form-control"> </textarea>
                    </div>
                </div>

                <div class="col-md-12 mb-2">
                    <div class="upload position-relative">

                        <div class="upload_content">
                            <div>
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            
                            <div>
                                <h6> ارفع الموازنة </h6>
                            </div>
                        </div>

                        <input type="file" class="inputFile" @change="uploadImage">
                    </div>

                    <div class="uploadImage" v-if="visib">
                        <img :src="image" alt="">
                    </div>
                </div>
                
            </div>

            <div class="flex_center mt-4">
                <button class="btn main_btn px-5"> حفظ </button>
            </div>
       </form>
    </Dialog>
</template>

<script>
  import navbar from "@/components/navComp.vue";
  import sidebar from "@/components/sidebarComp.vue";


  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { ProductService } from '@/service/ProductService';
  import { FilterMatchMode } from 'primevue/api';

  import Dialog from 'primevue/dialog';

export default {
    components:{
        navbar,
        sidebar,
        DataTable,
        Column,
        Dialog

    },
    data(){
          return{
              products: null,
              filters: {
                  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
              },
              visible : false,
              image : '',
              visib : false
          }
      },

      methods:{
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
          ProductService.getProductsMini().then((data) => (this.products = data));
      }  
}
</script>

