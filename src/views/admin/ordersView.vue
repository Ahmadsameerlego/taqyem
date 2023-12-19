<template>
    <navbar />
    <sidebar />
    <section id="content">
          <div class="container">
              
            
  
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

            <!-- add product  -->
            <div class="d-flex justify-content-end mb-3">
                <router-link to="/admin/addProduct" class="main_btn br-20 px-4 pt-2 pb-2">
                    اضافة منتج جديد
                    <span class="mx-2">
                        <i class="fas fa-plus"></i>
                    </span>
                </router-link>
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
                    <Column field="id" header="رقم المنتج"></Column>
                    <Column field="name" header="اسم المنتج"></Column>
                    <Column field="description" header="وصف المنتج"></Column>
                    <Column field="qty" header="كمية المنتج"></Column>
                    <Column  header="نسبة المنتج">
                        <template #body="slotProps">
                            <span :style="{ backgroundColor: slotProps.data.color }" class="labelColor"></span>
                            <!-- <span class="text-center" style="margin-left: 8px;"> {{slotProps.data.qty }} % </span> -->
                            {{ percentage    }}
                        </template>
                    </Column>
                    <Column field="price" header="سعر المنتج"></Column>
                    
                    

                    <!-- <Column field="quantity" header="صورة المنتج"></Column> -->


                    <Column >
                        <template #body="slotProps">
                            <router-link class="main_btn br-20 px-4 pt-2 pb-2" :to="'/admin/edit/'+slotProps.data.id">
                                تفاصيل
                            </router-link>                           
                        </template>
                    </Column>


                </DataTable>
            </div>
  
  
          </div>
    </section>
  </template>
  
  <script>
  import navbar from "@/components/navComp.vue";
  import sidebar from "@/components/sidebarComp.vue";
  
  
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { FilterMatchMode } from 'primevue/api';
  import Calendar from 'primevue/calendar';
  
  import axios from 'axios';
  export default {
      data(){
          return{
              selectedButton : null,
              products: null,
              filters: {
                  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
              },
              percentage : ''
          }
      },
      components:{
          navbar,
          sidebar,
          DataTable,
          Column,
          Calendar
      },
      methods:{
        getColor(amount, total) {
            // const remaining = total - amount;
            const percentage = (amount / total) * total;

            // Define dynamic thresholds based on the calculated percentage
            const greenThreshold = 70;  // 70% of the calculated percentage
            const yellowThreshold = 40;  // 40% of the calculated percentage

            if (percentage >= greenThreshold && percentage <= 100) {
                return 'green';
            } else if (percentage >= yellowThreshold && percentage < greenThreshold) {
                return 'yellow';
            } else {
                return 'red';
            }
        } ,

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
          async getProducts(){
            await axios.get('products', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.products = res.data.data ;
            } )
          }
      },
      mounted(){
        this.getProducts();
      }    
  }
  </script>
  
  <style>
    .labelColor{
        width: 70px;
        height: 10px;
        display:block ;
        border-radius:5px ;
    }
  </style>