<template>
    <navbar />
    <sidebar />
    <section id="content">
        <div class="container">
            <h6 class="fw-bold"> إضافة منتج جديد </h6>

            <form  @submit.prevent="addProduct" ref="addProductForm">
                <!-- profile pic  -->
                <section class="profile_pic flex-column mx-auto d-flex mt-4">
                    <input type="file" name="image" @change="uploadProfilePic" class="uploadInput">
                    <!-- default image  -->
                    <img :src="require('@/assets/imgs/logo.png')" ref="profile" class="profile_image" alt="">
                    <!-- edit  -->
                    <span class="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </span>
                </section>

                <div class="row mt-3">
                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-2"> اسم المنتج </label>
                            <input type="text" class="form-control" name="name" v-model="name">
                        </div>
                    </div>

                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-2">  سعر المنتج ( ريال سعودي )  </label>
                            <input type="number" class="form-control" name="price" v-model="price">
                        </div>
                    </div>

                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-2"> الكمية المتوفرة </label>
                            <input type="number" class="form-control" name="qty" v-model="qty">
                        </div>
                    </div>

                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-2"> وصف المنتح </label>
                            <textarea name="description" v-model="description" class="form-control" id="" cols="10" rows="5" ></textarea>
                        </div>
                    </div>
                </div>

                <div class="flex_center">
                    <button class="main_btn btn px-5 pt-2 pb-2" :disabled="disabled"> 
                        <span v-if="!disabled">اضافة</span>
                        <div class="spinner-border" role="status" v-if="disabled">
                            <span class="visually-hidden">Loading...</span>
                        </div> 
                    </button>
                </div>
            </form>
        </div>
    </section>

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
            name : '',
            price : '',
            description : '',
            qty : '',
            disabled : false
        }
    },
    components:{
        navbar,
        sidebar,
        Toast
    },
    methods:{
        uploadProfilePic(e){
            const file = e.target.files[0];
            this.$refs.profile.src = URL.createObjectURL(file);

        },

        async addProduct(){
            this.disabled = true ;
            const fd = new FormData(this.$refs.addProductForm);
            await axios.post('admin/products', fd , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.disabled = false ;
                    setTimeout(() => {
                        this.$router.push('/admin/products')
                    }, 1000);
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.disabled = false ;
                }
            } )
        }
    }
}
</script>

<style lang="scss">
    .profile_pic{
        position: relative;
        width: 110px;
        height: 110px;
        border-radius: 50%;
        margin: auto;
        border: 1px solid #fff !important;
        display: flex !important;
        justify-content: center;
        align-items: center;
        background: #fff !important;
        input{
            position:absolute;
            width: 100%;
            height:100%;
            top:0;
            right: 0;
            opacity: 0;
        }
        .edit{
            position: absolute;
            top:0px;
            left:10px;
            font-size: 20px;
        }

    }
</style>