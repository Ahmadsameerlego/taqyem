<template>

    <!-- stopped  -->


    
    <navbar />
    <sidebar />

  <div id="content">
    <div class="container mt-5">
        <div class="card_order px-5 pt-3 pb-4">
            <h5 class="text-center"> تفاصيل الطلب </h5>

            <!-- single order  -->
            <div class="sinle_ordered mb-3" v-for="(prod, value) in products" :key="prod.id">

                   <div v-if="prod.values.length>0">
                    <p class="fw-6 mb-1"> {{ prod.product_name }} </p>

                        <div class="order_body pt-4">

                            <div class="d-flex align-items-center  mb-3" v-for="(single, index) in prod.values" :key="index">
                                <div class="number_value">
                                    {{ index+1 }}
                                </div>
                                <input type="text" class="form-control mx-2" v-model="single.url">

                                <button class="btn" @click="removeValue(value,single.id, index)">
                                    <i class="fas fa-trash text-danger"></i>
                                </button>
                            </div>                
                        </div>
                   </div>
            </div>

            <div class="flex_center">
                <button class="btn btn-danger pt-2 pb-2 px-4" v-if="isDeleted" @click="deleteOrders=true">تأكيد الحذف</button>
            </div>

             <!-- refuse order  -->
                <Dialog v-model:visible="deleteOrders" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                    <h5 class="text-center"> هل أنت متأكد من حذف هذه الكميات ؟ </h5>

                   <div class="d-flex  justify-content-center">
                    <button class="btn btn-danger px-4 pt-2 pb-2" @click="removeProducts"> حذف </button>
                    <button class="btn btn-secondary px-4 pt-2 pb-2 mx-3" @click="deleteOrders=false"> الغاء </button>
                   </div>

                    
                </Dialog>
            <!-- location  -->
            <div class="sinle_ordered mb-3 mt-5">
                    <p class="fw-6 mb-1"> مكان تسليم الشحنه </p>

                    <div class="order_body pt-4">

                        <div class="d-flex address_order">

                            <div class="d-flex w-50 align-items-center mb-3">
                                <span class="fw-6 mx-2"> المدينة </span>
                                <select name="" class="form-select " id="" v-model="selectedCity">
                                    <option value="" selected hidden disabled> {{city_name}} </option>
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



            <div class="admin_delivering d-flex justify-content-between align-items-center">

                <div class=" d-flex  align-items-center mb-3">
                    <div class="d-flex fw-6 mx-2"> 
                        <span>
                            الموصل
                        </span>
                        <i class="fas fa-star-of-life text-danger" style="font-size:10px;"></i> 
                    </div>
                    <!-- <select name="" class="form-select " id="" v-model="selectedDelegate">
                        <option value="" selected hidden disabled> اختر الموصل </option>
                        <option :value="delegate.id" v-for="delegate in delegates" :key="delegate.id"> {{ delegate.name }} </option>
                    </select> -->
                    <div class="position-relative selectDeliver">
                        <select name="" class="form-select " id="" v-model="selectedDelegate" >
                            <option value="" selected hidden disabled>{{ delegate_name }} </option>
                            <option :value="delegate.id" v-for="delegate in delegates" :key="delegate.id"> {{ delegate.name }} </option>
                        </select>
                        <i class="fa-solid fa-angle-down"></i>

                    </div>
                </div>

                <div>
                    <button class="third_btn px-4 btn" @click="$router.push(`/admin/products/${$route.params.id}`)"> السابق </button>

                    <button class="btn main_btn mx-3 px-4 br-20" @click="$router.push(`/admin/complete/${$route.params.id}`)"  @click.prevent="createOrder" :disabled="isDisabled"> 
                        التالي
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <!-- @click="$router.push(`/admin/complete/${$route.params.id}`)" -->
                </div>
            </div>
        </div>         
    </div>
  </div>
  <Toast />
</template>

<script>
import navbar from "@/components/navComp.vue";
import sidebar from "@/components/sidebarComp.vue";
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';

import axios from 'axios';
export default {
    data(){
        return{
            products : [],
            sended_products : [],
            address : '',
            map_url : '',
            deleted_ids : [],
            delegates : [],
            selectedDelegate : '',
            selectedCity : '',
            city_name : '',

            sended_value : [],
            
            delegate_name : '',
            isDeleted : false,
            deleteOrders : false
        }
    },
    components:{
        navbar,
        sidebar,
        Toast,
        Dialog
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
                this.products = JSON.parse(JSON.stringify(response.items)); // Deep copy
                this.sended_products = JSON.parse(JSON.stringify(response.items)); // Deep copy
                this.address = response.address ;
                this.map_url = response.map_url ;
                this.cities = response.cities ;
                this.delegates = response.delegates ;
                for( let i = 0 ; i < this.delegates.length ; i++ ){
                    if( this.delegates[i].status === true ){
                        this.selectedDelegate = this.delegates[i].id ;
                        this.delegate_name = this.delegates[i].name ;
                    }
                }

                for( let i = 0 ; i < this.cities.length ; i++ ){
                    if( this.cities[i].status === true ){
                        this.selectedCity = this.cities[i].id ;
                        this.city_name = this.cities[i].name ;
                    }
                }
                // this.total_products_amount = response.total_products_amount
            } )
        },

        async  removeProducts(){
            const fd = new FormData();
            fd.append('values_ids',JSON.stringify(this.deleted_ids) )
            await axios.post(`admin/orders/delete-values?_method=delete`, fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });

                    // this.products[index].values.splice(value_index, 1)
                    // console.log(id)
                    // this.deleted_ids.push(id);

                    this.getInfo();
                    this.deleteOrders = false;
                    this.isDeleted = false ;
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });

                }
            } )
            
        },

        removeValue(index, id,value_index){
            this.products[index].values.splice(value_index, 1)
            this.deleted_ids.push(id);
            this.isDeleted = true ;

            console.log(this.products)
            console.log(this.sended_products)
        },


        // async getDelegates(){
        //     await axios.get('delegates')
        //     .then( (res)=>{
        //         this.delegates = res.data.data ;
        //     } )
        // },

        createOrder(){
            console.log(this.sended_products)
            for( let i = 0 ; i < this.sended_products.length ; i++ ){
                this.sended_value.push({
                    product_id : this.sended_products[i].product_id ,
                    items : this.sended_products[i].values 
                })
            }

            console.log(JSON.stringify(this.sended_value))



            localStorage.setItem('items', JSON.stringify(this.sended_value));
            localStorage.setItem('map_url', this.map_url);
            localStorage.setItem('address', this.address);
            localStorage.setItem('city_id', this.selectedCity);
            localStorage.setItem('delegate_id', this.selectedDelegate);

            this.sended_value = [];

        }



        
    },
    computed:{
        isDisabled(){
            return !this.selectedDelegate
        }
    },
    mounted(){
        this.getInfo();
        // this.getDelegates();
    }
}
</script>

<style>
    .selectDeliver .fa-angle-down{
        position: absolute;
        right: 84%;
        top: 30%;
    }
</style>