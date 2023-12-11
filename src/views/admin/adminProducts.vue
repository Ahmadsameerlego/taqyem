<template>
    <navbar />
    <sidebar />

  <div id="content">
    <div class="container mt-5">
        <!-- products -->
        <div class="container mt-5">

            <div class="card_order px-5 pt-3 pb-4">
                <div class="row">

                    <div class="col-md-4 mb-3" v-for="(product, index) in products" :key="product.id">
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

                            <button class="btn add_btn" @click="addproduct( product.id, product.name , index )"></button>

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
                            <span class="fw-bold text-center" style="opacity:0"> 4rtregff </span>
                        </div>

                        <!-- body  -->
                        <div class="mt-4">

                            <div class="d-flex justify-content-between mb-2" v-for="(product, index) in added_products" :key="index">
                                <span class="fw-6 text-center"> {{ product.name }} </span>
                                <span class="fw-6 text-center"> {{ product.qty }} </span>
                                <span class="fw-6 text-center"> {{ product.totalPrice }} <span> ريال </span> </span>
                                <span class="fw-6 text-center"> 
                                    <button class="btn" @click="removeItem(index)">
                                        <i class="fas fa-trash text-danger"></i>
                                    </button>
                                </span>
                            </div>

                            
                        </div>

                        <!-- price  -->
                        <div class="mt-4 d-flex">
                            <h3 class="fw-6"> الاجمالي </h3>
                            <h3 class="mx-3 fw-6"> {{ totalPrice }} <span class="currency"> ريال </span> </h3>
                        </div>
                    </div>
                </div>

                <div class="col-md-5 position-relative">
                    <div class="inter_action d-flex justify-content-center">
                        <button class="third_btn px-4 btn"> السابق </button>

                        <button class="btn main_btn mx-3 px-4 br-20" :disabled="isDisabled" @click="$router.push('/sales/orderDetails')" @click.prevent="storeProucts"> 
                            التالي
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navComp.vue";
import sidebar from "@/components/sidebarComp.vue";

export default {
    components:{
        navbar,
        sidebar
    }
}
</script>

<style>

</style>