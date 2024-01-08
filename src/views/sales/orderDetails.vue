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

            <form>
            <!-- single order  -->
            <div class="sinle_ordered mb-3" v-for="prod in products" :key="prod.id">

                    <p class="fw-6 mb-1"> {{ prod.name }} </p>

                    <div class="order_body pt-4">

                        <div class="position-relative d-flex align-items-center  mb-3" v-for="(single, index) in prod.qty" :key="index">
                            <div class="number_value">
                                {{ index+1 }}
                            </div>  
                            <!-- <input type="text" class="form-control mx-2" v-model=""> -->

                            <!-- <input type="text" class="form-control mx-2" v-if="items_geted.length>0"  v-model="items_geted[index]"> -->
                            <input type="text" class="form-control mx-2"  v-model="value1[getDynamicModelKey(prod.id, index)]" @input="isWritten(prod.id, index)">
                            <!-- <input type="text" class="abs_values form-control mx-2" v-if="items_geted.length>0"  v-model="items_geted[index]" > -->

                            

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
                                <input type="text"  class="address form-control mx-2" v-model="address" placeholder="جدة - الفيصلية - شارع أحمد">
                            </div>
                        </div>
                        

                        <div class="d-flex align-items-center mb-3">
                        <span class="fw-6"> اللوكيشن </span>
                            <input type="text" class="form-control mx-2" v-model="map_url">
                        </div>

                    </div>
            </div>



            <div class=" d-flex justify-content-end">
                <button class="third_btn px-4 btn" type="button" @click="$router.push('/sales/newOrder')"> السابق </button>

                <button class="btn main_btn mx-3 px-4 br-20" @click="createOrder" :disabled="isDisabled"> 
                    التالي
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
            </div>

        </form>
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
            items  : null,
            isBacked : false,

            items_geted : [],
            isInputEmpty : false
        }
    },
    components:{
        user
    },
    watch:{
        // value1(newValue) {
        //     newValue = localStorage.getItem('cachedInputValue');
        // },

    },
    methods:{
        isWritten(){
            
            // console.log(Object.values(this.value1), this.products.length)
            // console.log(this.value1)
            // this.isInputEmpty[id] = [true]
            var  allQty = 0 ;
            for( let i = 0 ; i < this.products.length ; i++ ){
                allQty += parseInt(this.products[i].qty) ;
                for( let x = 0 ; x < this.products[i].qty ; x++ ){
                    

                    if( Object.values( this.value1).length == allQty && Object.values( this.value1).every( value => value )  ){
                            this.isInputEmpty = true ;
                        
                    }else {
                        this.isInputEmpty =false ;
                    }
                    // Object.values(this.value1(this.products[i].id ,x ))
                    // console.log(Object.values( this.value1)[x] == undefined)
                }
                // console.log(parseInt(this.products[i].qty) )
            }  

            // console.log(allQty)
            // console.log(Object.values( this.value1)) 
            // console.log(Object.values( this.value1)) 

        },
        createOrder(){

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
            localStorage.setItem('cashedItems' , JSON.stringify(this.value1))

            this.items = JSON.stringify(jsonStructure) ;
            console.log('Items:', this.items);

            // if( this.items_geted.length > 0 ){
                localStorage.setItem('items', this.items); 
            // }
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
                !this.isInputEmpty||
                !this.address ||
                !this.map_url ||
                this.selectedCity == null
            )
        }

    },
    mounted(){
        // if()
        this.getCities();


        // localStorage.setItem('items', this.items);
        //     localStorage.setItem('map_url', this.map_url);
        //     localStorage.setItem('address', this.address);
        //     localStorage.setItem('city_id', this.selectedCity);

        var products = JSON.parse(localStorage.getItem('products'));

        // if( localStorage.getItem('items') ){
        //     let geted = JSON.parse(localStorage.getItem('items')) ;
        //     this.items = geted ;
        //     for( let i = 0 ; i < geted.length ; i++ ){
        //         products[i].id = geted[i].product_id ;
        //         products[i].qty = geted[i].items.length ;
        //         console.log(products[i].qty)

        //     }
        //     // products.length = geted.length ;

        // }else{
            this.products = products
        // }
        if( localStorage.getItem('map_url') ){
            this.map_url = localStorage.getItem('map_url')
        }
        if( localStorage.getItem('address') ){
            this.address = localStorage.getItem('address')
        }
        if( localStorage.getItem('city_id') ){
            this.selectedCity = localStorage.getItem('city_id');
            
        }

        if(localStorage.getItem('cashedItems')){
            this.value1= JSON.parse( localStorage.getItem('cashedItems') )  ;
        }
    }
}
</script>

<style  lang="scss">
    .abs_values{
            position: absolute;
            right:-10px;
    }
    .address::placeholder{
        color:#ccc !important;
    }
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