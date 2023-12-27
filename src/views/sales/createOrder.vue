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
            <h3 class="text-center"> بيانات العميل </h3>
            <form class="mt-4">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-1 fw-6"> اسم المنشأة التجارية  </label>
                            <input type="text" class="form-control" v-model="owner_name" name="" id="">
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-1 fw-6"> نوع المنشأة  </label>
                            <select name="" class="form-control" id="" v-model="category_id">
                                <option value="">اختر نوع المنشأة </option>
                                <option :value="cat.id" v-for="cat in cats" :key="cat.id"> {{ cat.name  }} </option>
                            </select>
                            <!-- <input type="text" class="form-control" name="" id=""> -->
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-1 fw-6"> اسم المستلم  </label>
                            <input type="text" class="form-control" name="" id="" v-model="receiver_name">
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="form-group position-relative">
                            <div class="position-relative">
                                <label for="" class="mb-1 fw-6"> رقم جوال المستلم  </label>
                                <input type="number" class="form-control" name="" id="" v-model="receiver_phone" min="9" max="10" >
                                <select name="" class="number form-control" id="">
                                    <option value="">+996 </option>
                                </select>
                            </div>
                            <span class="text-danger" style="font-size:13px;" v-if="isPhoneValid"> يجب أن يكون رقم الهاتف من 9 إلي 10 أرقام </span>
                        </div>
                    </div>

                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-1 fw-6"> البريد الالكتروني للمستلم  </label>
                            <input type="email" class="form-control" name="" id="" v-model="receiver_email">
                            <span class="text-danger" style="font-size:13px;" v-if="isEmailValid"> يجب أن تكون صيغة الايميل صحيحة </span>

                        </div>
                    </div>

                    <div class="d-flex justify-content-end">
                        <button class="btn main_btn" @click="$router.push('/sales/newOrder')" @click.prevent="storeClient" :disabled="isDisabled"> 
                            التالي
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
import user from '@/components/sharedUser.vue'
import axios from 'axios';
export default {
    data(){
        return{
            cats : [],
            owner_name : '',
            receiver_name : '',
            receiver_phone : '',
            category_id : '',
            isPhoneValid : true,
            isEmailValid : true,
            receiver_email : ''
        }
    },
    components:{
        user
    },
    computed:{
        isDisabled(){
            

            return (
                !this.owner_name ||
                !this.receiver_name ||
                 this.isPhoneValid ||
                 this.isEmailValid ||
                !this.category_id
            )
        }
    },
    methods:{
        handleInput() {
            const numericValue = parseFloat(this.receiver_phone);

                if (isNaN(numericValue)) {
            // If it's not a number, set the value to the previous numeric value
            this.receiver_phone = this.receiver_phone  || 0;
            console.log('dddddd')
         }
        },  

        async getCategories(){
            await axios.get('categories')
            .then( (res)=>{
                this.cats = res.data.data ;
            } )
        },
        storeClient(){
            localStorage.setItem('owner_name', this.owner_name);
            localStorage.setItem('receiver_name', this.receiver_name);
            localStorage.setItem('receiver_phone', this.receiver_phone);
            localStorage.setItem('category_id', this.category_id);
            localStorage.setItem('receiver_email', this.receiver_email);
        }
    },
    watch:{ 
        receiver_phone(){
            const receiverPhoneString = String(this.receiver_phone);
            if(receiverPhoneString.length < 9 || receiverPhoneString.length > 11 ){
                this.isPhoneValid = true ;
            }else{
                this.isPhoneValid = false ;
            }
        },
        receiver_email() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailPattern.test(this.receiver_email)) {
                this.isEmailValid = false;
            } else {
                this.isEmailValid = true;
            }
        }
    },
    mounted(){
        this.getCategories();

        this.owner_name = localStorage.getItem('owner_name');
        this.receiver_name = localStorage.getItem('receiver_name');
        this.receiver_email = localStorage.getItem('receiver_email');
        this.receiver_phone = localStorage.getItem('receiver_phone');
        this.category_id = localStorage.getItem('category_id');


        localStorage.setItem('products', []);
        localStorage.setItem('city_id', '');
        localStorage.setItem('map_url', '');
        localStorage.setItem('address', '');

    }
}
</script>

<style lang="scss">
    .number{
        position: absolute;
        left:0;
        top:43%;
        width: 80px !important;
    }
    .card_order{
        background-color: #fff;
        border-radius: 25px;
        box-shadow: 0px 0px 10px #00000014;
    }
</style>