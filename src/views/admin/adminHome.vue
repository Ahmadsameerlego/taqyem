<template>
  <navbar />
  <sidebar />

  <section id="content">
    <div class="container">
        <!-- cards  -->
        <div class="cards">
        <div class="row">
            <div class="col-md-3 mb-3">
            <section class="dash_card px-3 pt-4 pb-3 flex_between dark">
                <div>
                <h6 class="fw-bold whiteColor">الطلبات</h6>
                <p class="whiteColor">{{ total_orders }} طلب</p>
                </div>
                <div class="card_icon">
                <img :src="require('@/assets/imgs/fi-rr-picture.png')" alt="">
                </div>
            </section>
            </div>
            <div class="col-md-3 mb-3">
            <section class="dash_card px-3 pt-4 pb-3 flex_between green">
                <div>
                <h6 class="fw-bold whiteColor">الايرادات</h6>
                <p class="whiteColor">{{ total_revenues }} ريال سعودي</p>
                </div>
                <div class="card_icon">
                <img :src="require('@/assets/imgs/fi-rr-picture.png')" alt="">
                </div>
            </section>
            </div>
            <div class="col-md-3 mb-3">
            <section class="dash_card px-3 pt-4 pb-3 flex_between green">
                <div>
                <h6 class="fw-bold whiteColor">الارباح</h6>
                <p class="whiteColor">{{ total_profit }}  ريال سعودي</p>
                </div>
                <div class="card_icon">
                <img :src="require('@/assets/imgs/fi-rr-picture.png')" alt="">
                </div>
            </section>
            </div>
            <div class="col-md-3 mb-3">
            <section class="dash_card px-3 pt-4 pb-3 flex_between blue">
                <div>
                <h6 class="fw-bold whiteColor">المبيعات المكتملة</h6>
                <p class="whiteColor">{{ completed_orders }} مكتملة</p>
                </div>
                <div class="card_icon">
                <img :src="require('@/assets/imgs/fi-rr-picture.png')" alt="">
                </div>
            </section>
            </div>
        
        
        </div>
        </div>

        <!-- chart  -->
        <section class="chart mt-4 mb-4">
            <div class="d-flex justify-content-end">
                <div>
                    <label for="yearSelect">اختر السنة :</label>
                    <select id="yearSelect" v-model="selectedYear" class="form-select">
                        <option v-for="year in allYears" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>

                <div class="mx-3">
                    <label for="monthSelect">اختر الشهر:</label>
                    <select id="monthSelect" v-model="selectedMonth" class="form-select">
                        <option v-for="(month, index) in allMonths" :key="index + 1" :value="index + 1">{{ month }}</option>
                    </select>
                </div>
            </div>

            <p class="fw-6">
                عمليات الشراء (مع اجمالي مرات الشراء)
            </p>
            <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" style="height:18rem" />
        </section>

        <!-- details. -->
        <section class="details mt-3 mb-3">
            <div class="row">

                <div class="col-md-6 mb-2">
                    <p class="fw-6">
                        الطلبات
                    </p>
                    <Chart type="doughnut" :data="chartData2" :options="chartOptions2" class="md:w-10rem mx-auto" style="width:15rem" />

                </div>
                

                <div class="col-md-6 mb-2">
                    <p class="fw-bold">
                        اخر الطلبات 
                        <router-link to="/admin/orders" class="more mx-2">
                            المزيد
                        </router-link>
                    </p>

                    <table class="table new_order table-bordered">
                        <thead>
                            <tr>
                                <td scope="col">رقم الطلب</td>
                                <td scope="col">صاحب الطلب</td>
                                <td scope="col">المبلغ الاجمالي</td>
                            </tr>
                        </thead>
                        <tbody v-if="products.length>0">
                            <tr v-for="prod in products" :key="prod.id">
                                <td>{{ prod.order_num  }}</td>
                                <td>{{ prod.client  }}</td>
                                <td>{{ prod.total_products_amount  }}</td>
                            </tr>
                            
                        </tbody>
                        <div class="text-center" v-else> لا توجد طلبات جديدة بعد </div>
                    </table>
                </div>
            </div>
        </section>
    </div>
    
  </section>
</template>

<script>
import navbar from "@/components/navComp.vue";
import sidebar from "@/components/sidebarComp.vue";
import axios from 'axios';
import Chart from 'primevue/chart';

export default {
    data(){
        return{
            chartData: null,
            chartOptions: null,

            
            chartData2: null,
            products : [],
            profits : [],
            total_orders: '',
            total_revenues: '',
            total_profit: '',
            completed_orders: '',
            un_completed_order: '',

            selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      allYears: [],
      allMonths: [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ],


            chartOptions2: {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            },

        }
    },
    methods:{
        // get new 
        async getHome(){
            await axios.get(`admin/dashboard?date=${this.selectedYear+'-'+this.selectedMonth}`, {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                // this.newProducts = true ;
                // this.inProducts = false ;
                this.products = res.data.data.new_orders ;
                this.profits = res.data.data.profits ;
                this.total_orders = res.data.data.total_orders ;
                this.total_revenues = res.data.data.total_revenues ;
                this.total_profit = res.data.data.total_profit ;
                this.completed_orders = res.data.data.completed_orders ;
                this.un_completed_order = res.data.data.un_completed_order ;
                setTimeout(() => {
                    this.chartData = this.setChartData();
                    this.chartOptions = this.setChartOptions();

                    this.chartData2 = this.setChartData2();
                }, 500);
            } )
        },
        setChartData() {
            // const documentStyle = getComputedStyle(document.documentElement);

            return {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'sep', 'oct', 'nov','dec'],
                datasets: [
                    
                    {
                        label: 'احصائيات الارباح',
                        data: this.profits, 
                        fill: true,
                        borderColor: '#3290d8',
                        tension: 0.4,
                        backgroundColor: '#3290d861'
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
        },

        setChartData2() {
            const documentStyle2 = getComputedStyle(document.body);

            return {
                labels: ['الطلبات المكتملة','الطلبات الغير مكتملة'],
                datasets: [
                    {
                        data: [this.completed_orders, this.un_completed_order],
                        backgroundColor: ['#3C649F', '#35BFBF', documentStyle2.getPropertyValue('--green-500')],
                        hoverBackgroundColor: ['#3C649F', '#35BFBF', documentStyle2.getPropertyValue('--green-400')]
                    }
                ]
            };
        },


    },
    watch:{
        selectedYear(){
            this.getHome();
        },
        selectedMonth(){
            this.getHome();
        },
    },
    components: {
        Chart,
        navbar,
        sidebar,
    },
    mounted(){

        // setTimeout(() => {
            
            
        // }, 1000);
        this.getHome();

        const currentYear = new Date().getFullYear();
    this.allYears = Array.from({ length: 10 }, (_, index) => currentYear - index);


    }
};
</script>

<style lang="scss">
    .form-select{
        background-image:none !important;
    }
    .new_order{
        box-shadow: 0px 0px 10px #5a5a5a40;
    }
    .new_order>:not(caption)>*>*{
        background-color: #f9faff !important;
    }

.more{
    color: #005ECCCC !important;
    font-size: 14px;
    text-decoration: underline !important;
}
#content {
  width: calc(100% - 300px);
  height: calc(100% - 80px);
  position: relative;
  left: 0;
  top: 100px;
  margin-right: 300px;
  .dash_card{
    position: relative;
    background-color: #3C649F;
    border-radius: 5px;
    .card_icon{
        position: absolute;
        left:20px;
        top: 30px;
    }
  }
}
.whiteColor{
    color:#fff;
}
</style>