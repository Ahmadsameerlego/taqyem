<template>
    <navbar />
    <sidebar />
    <section id="content">
        <div class="container">
            <h4 class="text-center mt-5 mb-5 fw-6"> تسوية الأجور </h4>
            <!-- steps  -->
            <div class="login_options  w-50 mx-auto d-flex justify-content-between align-items-center mb-3">
                <button class="btn w-25 " @click="selectButton('new')" :class="{ 'selected': selectedButton === 'new' }" >
                    مبيعات
                </button>
                <button class="btn w-25 " @click="selectButton('still')" :class="{ 'selected': selectedButton === 'still' }" >
                    توصيل
                </button>
            </div>

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
                    
            <!-- table  -->
            <div class="card card_table" >
                <DataTable 
                    :value="transactions" 
                    paginator :rows="5" 
                    :rowsPerPageOptions="[5, 10, 20, 50]"   
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    ref="dt"
                >
                    <Column field="day" header="الاسم"></Column>
                    <Column field="date" header="الطلبات المكتملة"></Column>
                    <Column  header="الحالة">
                        <template #body="slotProps">
                            <button class="btn br-20 px-4 btn-danger" v-if="slotProps.data.status =='zero' ">
                                <router-link to="/admin/singleRent/1">
                                    لم تتم التسوية
                                </router-link>
                            </button>                        
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
import axios from 'axios';

export default {
    components:{
        navbar,
        sidebar,
        DataTable,
          Column,

    },
    data(){
          return{
              filters: {
                  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
              },
              transactions : [],
              selectedButton : ''
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

          async getSettle(){
            await axios.get('admin/financial-transactions', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.transactions = res.data.data.transactions ;
            } )
          }
      },
      mounted(){
        this.getSettle();
      }  
}
</script>

<style lang="scss">
   
</style>