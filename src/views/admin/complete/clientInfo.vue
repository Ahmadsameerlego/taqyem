<template>
    <navbar />
    <sidebar />

    <div id="content">
        <div class="container mt-5">
            <div class="card_order px-5 pt-3 pb-4">
                <h3 class="text-center"> بيانات العميل </h3>
                <form class="mt-4">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <label for="" class="mb-1 fw-6"> اسم المنشأة التجارية  </label>
                                <input disabled type="text" class="form-control" v-model="client" name="" id="">
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <label for="" class="mb-1 fw-6"> نوع المنشأة  </label>
                                <select name="" class="form-control" id="" v-model="category_id" disabled>
                                    <option value="" selected> {{ cat_name_recived }}</option>
                                    <option :value="cat.id" v-for="cat in categories" :key="cat.id"> {{ cat.name  }} </option>
                                </select>
                                <!-- <input type="text" class="form-control" name="" id=""> -->
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <label for="" class="mb-1 fw-6"> اسم المستلم  </label>
                                <input disabled type="text" class="form-control" name="" id="" v-model="receiver_name">
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-group position-relative">
                                <label for="" class="mb-1 fw-6"> رقم جوال المستلم  </label>
                                <input disabled type="number" class="form-control" name="" id="" v-model="receiver_phone">
                                <select name="" class="number form-control" id="" disabled>
                                    <option value="">+996 </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <label for="" class="mb-1 fw-6"> البريد الالكتروني للمستلم  </label>
                                <input type="email" class="form-control" disabled name=""  id="" v-model="receiver_email">

                            </div>
                        </div>

                        <div class="d-flex justify-content-end">
                            <button class="btn main_btn" @click="$router.push(`/complete/completeProducts/${this.$route.params.id}`)" @click.prevent="storeClient" :disabled="isDisabled"> 
                                التالي
                                <i class="fa-solid fa-arrow-left"></i>
                            </button>
                        </div>
                    </div>
                </form>
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
            client : '',
            receiver_name : '',
            receiver_phone : '',
            receiver_email : '',
            categories : [],
            category_id : '',

            cat_id_recived : '',
            cat_name_recived : ''
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
                this.client = response.client ;
                this.receiver_name = response.receiver_name ;
                this.receiver_phone = response.receiver_phone ;
                this.receiver_email = response.receiver_email ;
                this.categories = response.categories ;

                for( let i = 0 ; i < response.categories.length ; i++ ){
                    if( response.categories[i].status ===  true){
                        this.category_id = response.categories[i].id ;
                        this.cat_name_recived = response.categories[i].name ;
                        console.log('done')
                    }
                }

                console.log(this.cat_name_recived)
            } )
        },

        storeClient(){
            localStorage.setItem('owner_name', this.client);
            localStorage.setItem('receiver_name', this.receiver_name);
            localStorage.setItem('receiver_phone', this.receiver_phone);
            localStorage.setItem('receiver_email', this.receiver_email);
            localStorage.setItem('category_id', this.category_id);
        }
    },
    mounted(){
        this.getInfo();
    }
}
</script>

<style>

</style>