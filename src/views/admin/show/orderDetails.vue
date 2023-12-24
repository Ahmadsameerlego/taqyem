<template>

    <!-- stopped  -->


    
    <navbar />
    <sidebar />

  <div id="content">
    <div class="container mt-5">
        <div class="card_order px-5 pt-3 pb-4">
            <h5 class="text-center"> تفاصيل الطلب </h5>

            <!-- single order  -->
            <div class="sinle_ordered mb-3" v-for="(prod) in products" :key="prod.id">

                   <div v-if="prod.values.length>0">
                    <p class="fw-6 mb-1"> {{ prod.product_name }} </p>

                        <div class="order_body pt-4">

                            <div class="d-flex align-items-center  mb-3" v-for="(single, index) in prod.values" :key="index">
                                <div class="number_value">
                                    {{ index+1 }}
                                </div>
                                <input type="text" class="form-control mx-2" v-model="single.url" disabled>

                                <!-- <button class="btn" @click="removeValue(value,single.id, index)">
                                    <i class="fas fa-trash text-danger"></i>
                                </button> -->
                            </div>                
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
                                <select name="" class="form-select " id="" v-model="selectedCity" disabled>
                                    <option value="" selected hidden disabled> {{city_name}} </option>
                                    <option :value="city.id" v-for="city in cities" :key="city.id"> {{ city.name }} </option>
                                </select>
                            </div>
                            <div class="d-flex w-50 mx-3 align-items-center mb-3">
                                <span class="fw-6"> العنوان </span>
                                <input type="text" class="form-control mx-2" v-model="address" disabled>
                            </div>
                        </div>
                        

                        <div class="d-flex align-items-center mb-3">
                        <span class="fw-6"> اللوكيشن </span>
                            <input type="text" class="form-control mx-2" v-model="map_url" disabled>
                        </div>

                    </div>
            </div>



            <div class="admin_delivering d-flex justify-content-end align-items-center">

                <!-- <div class="position-reltive d-flex  align-items-center mb-3">
                    <div class="d-flex fw-6 mx-2"> 
                        <span>
                            الموصل
                        </span>
                        <i class="fas fa-star-of-life text-danger" style="font-size:10px;"></i> 
                    </div>
                   <div class="position-relative selectDeliver"> 
                        <select name="" class="form-select " id="" v-model="selectedDelegate" disabled>
                            <option value="" selected hidden disabled>{{ delegate_name }} </option>
                            <option :value="delegate.id" v-for="delegate in delegates" :key="delegate.id"> {{ delegate.name }} </option>
                        </select>
                        <i class="fa-solid fa-angle-down"></i>
                   </div>
                </div> -->

                <div>
                    <button class="third_btn px-4 btn" @click="$router.push(`/complete/completeProducts/${$route.params.id}`)"> السابق </button>
                    
                    <button class="btn main_btn mx-3 px-4 br-20" @click="$router.push(`/complete/completeConfirmOrder/${$route.params.id}`)"  @click.prevent="createOrder" > 
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

import axios from 'axios';
export default {
    data(){
        return{
            products : [],
            address : '',
            map_url : '',
            deleted_ids : [],
            delegates : [],
            selectedDelegate : '',
            selectedCity : '',
            city_name : '',

            sended_value : [],
            delegate_name : ''
            
        }
    },
    components:{
        navbar,
        sidebar,
        Toast
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
                this.products = response.items ;
                this.address = response.address ;
                this.map_url = response.map_url ;
                this.cities = response.cities ;

                for( let i = 0 ; i < this.cities.length ; i++ ){
                    if( this.cities[i].status === true ){
                        this.selectedCity = this.cities[i].id ;
                        this.city_name = this.cities[i].name ;
                    }
                }
                this.delegates = res.data.data.delegates ;
                for( let i = 0 ; i < this.delegates.length ; i++ ){
                    if( this.delegates[i].status === true ){
                        this.selectedDelegate = this.delegates[i].id ;
                        this.delegate_name = this.delegates[i].name ;
                    }
                }
                // this.total_products_amount = response.total_products_amount
            } )
        },

        async  removeValue(index, id,value_index){
            const fd = new FormData();
            await axios.post(`admin/orders/${id}/delete-value?_method=delete`, fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });

                    this.products[index].values.splice(value_index, 1)
                    // console.log(id)
                    this.deleted_ids.push(id);

                    this.getInfo();
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });

                }
            } )
            
        },


        // async getDelegates(){
        //     await axios.get('delegates')
        //     .then( (res)=>{
        //         this.delegates = res.data.data ;
        //     } )
        // },

        createOrder(){
            for( let i = 0 ; i < this.products.length ; i++ ){
                this.sended_value.push({
                    product_id : this.products[i].product_id ,
                    items : this.products[i].values 
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

</style>