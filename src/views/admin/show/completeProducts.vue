<template>
    <navbar />
    <sidebar />

  <div id="content">
    <!-- products -->
    <div class="container mt-5 mb-4">

        <div class="card_order px-5 pt-3 pb-4">
            <div class="row">

                <div class="col-md-3 mb-3" v-for="(product) in products" :key="product.id">
                    <!-- single product  -->
                    <div class="single_product position-relative">

                        <div class="prodcut_img">
                            <img :src="product.image" alt="">
                        </div>

                        <div class="mx-3 mt-2 mb-2">
                            <h6 class="fw-6 title"> {{ product.name }} </h6>
                            <p class="quant">
                                {{ product.qty }}
                            </p>

                            <div class="d-flex justify-content-end">
                                <h5 class="price">
                                    {{ product.price }}
                                    <span>ريال</span>
                                </h5>
                            </div>
                        </div>

                        <!-- <button class="btn add_btn" @click="addproduct( product.id, product.name , index )"></button> -->

                    </div>
                </div>



            </div>
        </div>
        
        <!-- added products  -->
        <div class="row mt-3 mb-5">

            <div class="col-md-7">
                <div class="card_order pt-2 pb-2 px-4">

                    <!-- header  -->
                    <div class="d-flex justify-content-between">
                        <span class="fw-bold text-center"> المنتج / الخدمة </span>
                        <span class="fw-bold text-center"> الكمية </span>
                        <span class="fw-bold text-center"> السعر </span>
                    </div>

                    <!-- body  -->
                    <div class="mt-4">

                        <div class="d-flex justify-content-between mb-2" v-for="(product, index) in added_products" :key="index">
                            <span class="fw-6 text-center"> {{ product.product_name }} </span>
                            <span class="fw-6 text-center"> {{ product.qty }} </span>
                            <span class="fw-6 text-center"> {{ product.total_price }} <span> ريال </span> </span>
                            
                        </div>

                        
                    </div>

                    <!-- price  -->
                    <div class="mt-4 d-flex">
                        <h3 class="fw-6"> الاجمالي </h3>
                        <h3 class="mx-3 fw-6"> {{ total_products_amount }} <span class="currency"> ريال </span> </h3>
                    </div>
                </div>
            </div>

            <div class="col-md-5 position-relative">
                <div class="inter_action d-flex justify-content-center">
                    <button class="third_btn px-4 btn" @click="$router.push(`/complete/client/${this.$route.params.id}`)"> السابق </button>

                    <button class="btn main_btn mx-3 px-4 br-20" :disabled="isDisabled" @click="$router.push(`/showOrderDetails/${this.$route.params.id}`)" @click.prevent="storeProucts"> 
                        التالي
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import navbar from "@/components/navComp.vue";
import sidebar from "@/components/sidebarComp.vue";

import axios from 'axios';
export default {
    data(){
        return{


            products : [],
            added_products : [],
            total_products_amount : ''
        }
    },
    components:{
        navbar,
        sidebar
    },
    methods:{
        async getInfo(){
            await axios.get(`admin/orders/${this.$route.params.id}/show`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                const response = res.data.data ;
                this.added_products = response.items ;

                this.total_products_amount = response.total_products_amount
            } )
        },

        async getProducts(){
            await axios.get('products', {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.products = res.data.data ;
            } )
        },

        storeClient(){
            localStorage.setItem('owner_name', this.owner_name);
            localStorage.setItem('receiver_name', this.receiver_name);
            localStorage.setItem('receiver_phone', this.receiver_phone);
            localStorage.setItem('category_id', this.category_id);
        }
    },
    mounted(){
        this.getInfo();
        this.getProducts();
    }
}
</script>

<style>
    #content{
        padding-bottom: 30px;
    }
</style>