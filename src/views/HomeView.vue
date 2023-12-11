<template>
  <section id="login">
    <section class="login_card">

      <div class="login_options d-flex justify-content-between align-items-center mb-3">
        <button class="btn" @click="selectButton('sales')" :class="{ 'selected': selectedButton === 'sales' }">
          مبيعات
        </button>
        <button class="btn" @click="selectButton('delivery')" :class="{ 'selected': selectedButton === 'delivery' }">
          توصيل
        </button>
        <button class="btn" @click="selectButton('management')" :class="{ 'selected': selectedButton === 'management' }">
          الإدارة
        </button>
      </div>

      <form >
        <h4 class="text-center mb-3"> تسجيل الدخول </h4>
        <div class="form-group mb-3">
          <label for=""> البريد الإلكتروني أو رقم الجوال </label>
          <input type="text" placeholder="البريد الإلكتروني أو رقم الجوال" v-model="email" class="form-control">
        </div>
        <div class="form-group mb-3">
          <label for=""> كلمة المرور </label>
          <input type="password" placeholder="كلمة المرور" v-model="password" class="form-control">
        </div>

        <div class="form-group align-items-center d-flex remember mb-3">
          <input type="checkbox" class="" >
          <span for="" class="mx-2"> تذكرني </span>
        </div>

        <div class="mt-5">
          <button class="btn main_btn text-center w-100 pt-2 pb-2" :disabled="isDisabled" @click.prevent="login">
            
            <span v-if="!disabled">تسجيل الدخول</span>
            <div class="spinner-border" role="status" v-if="disabled">
                <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </div>
      </form>
    </section>
  </section>
  <Toast />
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
  name: 'HomeView',
  data(){
    return{
      selectedButton: 'sales',
      email : '',
      password : '',
      disabled : false

    }
  },
  computed:{
    isDisabled(){
      return (
        this.email === '' ||
        this.password === ''
      )
    }
  },

  methods: {
    selectButton(button) {
      this.selectedButton = button;
    },
    async login(){
      this.disabled = true ;
      const fd = new FormData();
      fd.append('email', this.email);
      fd.append('password', this.password);
      await axios.post('login', fd , {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then( (res)=>{
        if( res.data.key === 'success' ){
          this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
          this.disabled = false ;

          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.data.user));

          // check what user 

          //sales
          if( res.data.data.user.role === '3' ){
            setTimeout(() => {
              this.$router.push('/sales/home')
            }, 2000);
          }
          //admin
          if( res.data.data.user.role === '1' ){
            setTimeout(() => {
              this.$router.push('admin/home')
            }, 2000);
          }
          // delegate
          if( res.data.data.user.role === '4' ){
            setTimeout(() => {
              this.$router.push('/deliver/home')
            }, 2000);
          }



        }else{
          this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
          this.disabled = false ;
        }
      } )
    },
   
  },
  components :{
    Toast
  }
}
</script>


<style  lang="scss">
  .main_btn{
    background-color: #2D6191;
    color: #fff;
    box-shadow: 0px 0px 10px #00000014;
    &:hover{
      background-color: #2D6191 !important;
      color: #fff;
    }
  }
  #login{
    background-color: #F9FAFE;
    width:100vw;
    height:100vh;
    .login_card{
      width: 40%;
      height: 60%;
      transform: translate(0% , 30%);
      margin: auto;
      background: #fff;
      border-radius: 25px;
      box-shadow: 0px 0px 10px #00000014;
      padding-top: 15px;
      padding-right: 25px;
      padding-left: 25px;
    }
    .remember{
      input{
        width: 20px;
        height: 2vw;
      }
      span{
        color: #808080;
        font-size: 12px;
      }
    }
    label{
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .form-control{
      height: 50px;
    }
    
  }
  .login_options{
      background-color: #EEECEC;
      border-radius: 30px;
      padding: 8px 10px;
      .btn{
        border-radius: 18px;
        padding: 5px 25px;
        font-size: 16px;
        font-weight: 600;
      }
      .selected{
        background-color: #fff;
        box-shadow: 0px 0px 10px #00000040;
      }

    }
</style>