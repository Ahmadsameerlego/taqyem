<template>
   <!-- user  -->
   <user />
    <!-- navbar  -->
    <section class="nav_bar d-flex justify-content-between align-items-center">
        <div>
            <router-link to="/sales/home">
                الرئيسية
            </router-link>
        </div>
        <div>
            <router-link to="/sales/orders">
                الطلبات
            </router-link>
        </div>
        <div>
            <router-link class="add_order" to="/sales/create">
                <span class="fas fa-plus"></span>
                <span class="mx-2"> انشاء طلب جديد </span>
            </router-link>
        </div>
    </section>

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
                    <button class="third_btn px-4 btn" @click="$router.push('/sales/create')"> السابق </button>

                    <button class="btn main_btn mx-3 px-4 br-20" :disabled="isDisabled" @click="$router.push('/sales/orderDetails')" @click.prevent="storeProucts"> 
                        التالي
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import user from '@/components/sharedUser.vue'
import axios from 'axios';
export default {
    data(){
        return{
            products : [],
            added_products : []
        }
    },
    components:{
        user
    },
    computed:{
        totalPrice() {
            // Calculate the total price by summing up the totalPrice property of each added product
            return this.added_products.reduce((total, product) => total + product.totalPrice, 0);
        },
        isDisabled(){
            return !this.added_products.length > 0
        }
  
    },
    methods:{
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
        addproduct(id, name, index) {
            if (this.products[index].qty > 0) {
                // Check if the product already exists in added_products
                const existingProductIndex = this.added_products.findIndex(product => product.id === id);

                const price = this.products[index].price; // Assuming price is available in the product object

                if (existingProductIndex !== -1) {
                    // If the product exists, increase its quantity by one
                    this.added_products[existingProductIndex].qty += 1;
                    // Increase the total price based on the quantity
                    this.added_products[existingProductIndex].totalPrice = this.added_products[existingProductIndex].qty * price;
                } else {
                    // If the product doesn't exist, add a new row with quantity one
                    this.added_products.push({
                        id: id,
                        name: name,
                        qty: 1,
                        totalPrice: price // Initialize total price based on quantity and price
                    });
                }

                // Decrease the product quantity in the products array
                this.products[index].qty -= 1;
            }
        },
        removeItem(index){
            this.added_products.splice(index ,1);
        },

        storeProucts(){
            localStorage.setItem('products', JSON.stringify(this.added_products));
            localStorage.setItem('totalPrice', this.totalPrice);
        }

        


    },
    mounted(){
        this.getProducts()  
    }
}
</script>

<style lang="scss">
    .add_btn{
        position:absolute;
        width: 100%;
        height:100%;
        top:0;
        right:0;
    }
    .inter_action{
        position:absolute;
        bottom: 0px;
        left:50%;
    }
    .br-20{
        border-radius: 20px !important;
    }
    .third_btn{
        background-color: #898C92 !important;
        border-radius: 20px !important;
        color:#fff !important;
    }
    .currency{
        font-size: 14px !important;
    }
    .single_product{
        border: 1px solid #333;
        border-radius: 25px;
        .prodcut_img{
            width:100%;
            img{
                width:100%;
                border-radius: 25px;
            }
        }
        .title{
            font-size: 15px;
            font-weight: bold;
        }

        .price{
            font-size: 19px;
            font-weight: bold;
            span{
                font-size: 14px;
            }
        }
    }
</style>