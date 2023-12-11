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
                <p class="whiteColor">0  طلب</p>
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
                <p class="whiteColor">0  ريال سعودي</p>
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
                <p class="whiteColor">0  ريال سعودي</p>
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
                <p class="whiteColor">0  مكتملة</p>
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
                        الطلبات الجديدة 
                        <router-link to="/" class="more mx-2">
                            المزيد
                        </router-link>
                    </p>

                    <table class="table new_order table-bordered">
                        <thead>
                            <tr>
                                <td scope="col">#</td>
                                <td scope="col">First</td>
                                <td scope="col">Last</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td scope="row">3</td>
                                <td >Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
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

import Chart from 'primevue/chart';

export default {
    data(){
        return{
            chartData: null,
            chartOptions: null,

            
            chartData2: null,
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
        setChartData() {
            // const documentStyle = getComputedStyle(document.documentElement);

            return {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'sep', 'oct', 'nov','dec'],
                datasets: [
                    
                    {
                        label: 'احصائيات الارباح',
                        data: [50, 20, 30, 60, 50, 20, 30, 60, 50, 20, 30, 60], 
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
                        data: [20, 80],
                        backgroundColor: ['#3C649F', '#35BFBF', documentStyle2.getPropertyValue('--green-500')],
                        hoverBackgroundColor: ['#3C649F', '#35BFBF', documentStyle2.getPropertyValue('--green-400')]
                    }
                ]
            };
        },


    },
    components: {
        Chart,
        navbar,
        sidebar,
    },
    mounted(){
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();

        this.chartData2 = this.setChartData2();


    }
};
</script>

<style lang="scss">
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