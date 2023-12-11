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

    <div class="container mt-5">
        <div class="card_order px-5 pt-3 pb-4">
            <h5 class="text-center"> تفاصيل الطلب </h5>

            <!-- single order  -->
            <div class="sinle_ordered mb-3" v-for="prod in products" :key="prod.id">

                    <p class="fw-6 mb-1"> {{ prod.name }} </p>

                    <div class="order_body pt-4">

                        <div class="d-flex align-items-center  mb-3" v-for="(single, index) in prod.qty" :key="index">
                            <div class="number_value">
                                {{ index+1 }}
                            </div>
                            <input type="text" class="form-control mx-2" v-model="value1[getDynamicModelKey(prod.id, index)]">
                        </div>                
                </div>
            </div>





            <!-- location  -->
            <div class="sinle_ordered mb-3 mt-5">
                    <p class="fw-6 mb-1"> مكان تسليم الشحنه </p>

                    <div class="order_body pt-4">

                        <div class="d-flex address_order">

                            <div class="d-flex w-50 align-items-center mb-3">
                                <span class="fw-6 mx-2"> المدينة </span>
                                <select name="" class="form-select " id="" v-model="selectedCity">
                                    <option value="" selected hidden disabled> اختر مدينة </option>
                                    <option :value="city.id" v-for="city in cities" :key="city.id"> {{ city.name }} </option>
                                </select>
                            </div>
                            <div class="d-flex w-50 mx-3 align-items-center mb-3">
                                <span class="fw-6"> العنوان </span>
                                <input type="text" class="form-control mx-2" v-model="address">
                            </div>
                        </div>
                        

                        <div class="d-flex align-items-center mb-3">
                        <span class="fw-6"> اللوكيشن </span>
                            <input type="text" class="form-control mx-2" v-model="map_url">
                        </div>

                    </div>
            </div>



            <div class=" d-flex justify-content-end">
                <button class="third_btn px-4 btn" @click="$router.push('/sales/newOrder')"> السابق </button>

                <button class="btn main_btn mx-3 px-4 br-20" @click="createOrder" :disabled="isDisabled"> 
                    التالي
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
            </div>
        </div>         
    </div>
</template>

<script>
import user from '@/components/sharedUser.vue'
import axios from 'axios' ;
export default {
    data(){
        return{
            products : [],
            value1 : {},
            cities  : [],
            selectedCity : null,
            address : '',
            map_url : '',
            items  : null
        }
    },
    components:{
        user
    },
    methods:{
        createOrder(){
            console.log('Total Values:', this.value1);

             // Convert the value1 object to the items structure
            const items = Object.keys(this.value1).reduce((acc, key) => {
            const [productId, index] = key.split('_');
            if (!acc[productId]) {
                acc[productId] = [];
            }
            acc[productId][index] = this.value1[key];
            return acc;
            }, {});

            // Convert items to the desired JSON structure
            const jsonStructure = Object.keys(items).map(productId => ({
                product_id: productId,
                items: items[productId],
            }));
            // Log the items structure

            this.items = JSON.stringify(jsonStructure) ;
            console.log('Items:', this.items);


            localStorage.setItem('items', this.items);
            localStorage.setItem('map_url', this.map_url);
            localStorage.setItem('address', this.address);
            localStorage.setItem('city_id', this.selectedCity);

            this.$router.push('/sales/confirm')
        },
        getDynamicModelKey(productId, index) {
        return `${productId}_${index}`;
        },
        async getCities(){
            await axios.get('cities')
            .then( (res)=>{
                this.cities = res.data.data ;
            } )
        }

    },
    computed:{
        dynamicModelNames() {
            // Generate dynamic model names based on product id and index
            return this.products.reduce((acc, prod) => {
                for (let i = 0; i < prod.qty; i++) {
                    acc[`${prod.id}_${i}`] = ''; // Initialize with empty string
                }
                return acc;
            }, {});
        },
        isDisabled(){
            return (
                !this.address ||
                !this.map_url ||
                this.selectedCity == null
            )
        }

    },
    mounted(){
        this.products = JSON.parse(localStorage.getItem('products'));
        this.getCities();
    }
}
</script>

<style  lang="scss">
    .order_body{
        background-color: #35BFBF;
        border-radius: 4px;
        padding: 10px;
        .number_value{
            background: #fff;
            border-radius: 50%;
            width: 30px;
            height:30px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
        }
    }
</style>