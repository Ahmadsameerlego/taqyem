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
                  
              <!-- table  -->
              <div class="card card_table" >
                <DataTable 
                    :value="clients" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                >
                    <Column field="owner_name" header="اسم المنشأة"></Column>
                    <Column field="receiver_phone" header="رقم الجوال"></Column>
                    <Column field="receiver_email" header="البريد الالكتروني"></Column>
                    <Column field="receiver_name" header="الاسم"></Column>
                    <Column field="created_at" header="تاريخ الشراء"></Column>
                    <Column  header="تواصل">
                        <template #body="slotProps">

                            <div class="d-flex justify-content-center align-items-center">
                                <a :href="'tel:0'+slotProps.data.receiver_phone">
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
              clients : []
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

          async getClients(){
            await axios.get('admin/clients', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.clients = res.data.data.clients ;
            } )
          }
      },
      mounted(){
        this.getClients();
      }    
  }
  </script>
  
  <style>
  
  </style>