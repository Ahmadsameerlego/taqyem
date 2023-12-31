<template>
    <navbar />
    <sidebar />
    <section id="content">
        <div class="container">
            <h6 class="fw-bold"> تعديل المنتج </h6>
            <form @submit.prevent="addProduct" ref="addProductForm">
                <!-- profile pic  -->
                <section class="profile_pic flex-column mx-auto d-flex mt-4">
                    <input type="file" name="image" @change="uploadProfilePic" class="uploadInput">
                    <!-- default image  -->
                    <img :src="image" ref="profile" class="profile_image" alt="">
                    <!-- edit  -->
                    <span class="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </span>
                </section>
                <div class="text-center text-danger mt-2 mb02"> يرجي رفع صورة بحد اقصى للطول 165 px </div>

                <div class="row mt-3">
                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-2"> اسم المنتج </label>
                            <input type="text" class="form-control"  v-model="name" name="name">
                        </div>
                    </div>

                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-2"> سعر المنتج ( ريال سعودي ) </label>
                            <input type="number" class="form-control"  v-model="price" name="price">
                        </div>
                    </div>

                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-2"> الكمية المتوفرة </label>
                            <input type="number" class="form-control"  v-model="qty" name="qty">
                        </div>
                    </div>

                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <label for="" class="mb-2"> وصف المنتح </label>
                            <textarea name="description" class="form-control" id="" cols="10" rows="5" placeholder="منتج الكتروني" v-model="description" ></textarea>
                        </div>
                    </div>
                </div>

                <div class="flex_center">
                    <button class="main_btn btn px-5 pt-2 pb-2" :disabled="disabled"> 
                        <span v-if="!disabled">تعديل المنتج</span>
                        <div class="spinner-border" role="status" v-if="disabled">
                            <span class="visually-hidden">Loading...</span>
                        </div> 
                    </button>

                    <button class="btn btn-danger pt-2 pb-2 px-5 mx-2" :disabled="deleteDisabled" @click.prevent="deleteProduct"> حذف المنتج </button>
                </div>
            </form>
        </div>
    </section>
    <Toast />
</template>

<script>
import navbar from "@/components/navComp.vue";
import sidebar from "@/components/sidebarComp.vue";
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
    data(){
        return{
            name : '',
            price : '',
            qty : '',
            image : '',
            description : '',
            disabled : false,
            deleteDisabled : false
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

        async deleteProduct(){
            const fd = new FormData();
            this.deleteDisabled = true ;
            await axios.post(`admin/products/${this.$route.params.id}?_method=delete` , fd  , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if( res.data.key === 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    setTimeout(() => {
                        this.$router.push('/admin/products')
                    }, 1000);
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });

                }
                this.deleteDisabled = false ;
            } ) 
        },

        async getProduct(){
            await axios.get(`admin/products/${this.$route.params.id}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.name = res.data.data.name ;
                this.description = res.data.data.description ;
                this.image = res.data.data.image ;
                this.qty = res.data.data.qty ;
                this.price = res.data.data.price ;
            } )
        },

        async addProduct(){
            this.disabled = true ;
            const fd = new FormData(this.$refs.addProductForm);
            await axios.post(`admin/products/${this.$route.params.id}?_method=put`, fd , {
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
    },
    mounted(){
        this.getProduct();
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
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
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