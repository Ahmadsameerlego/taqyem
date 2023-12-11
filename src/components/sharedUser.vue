<template>
  <div class="user mt-3 mx-3 ">
        <div class="dropdown d-flex align-items-center justify-content-end " >
            <button class="btn  d-flex align-items-center justify-content-end  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="user_icon">
                    <i class="fas fa-user"></i>
                </span>
                <span class="mx-2"> {{ userName }} </span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                    <a class="dropdown-item text-danger" href="#" @click.prevent="logOut">
                        <i class="fa-solid fa-right-from-bracket mx-2"></i>
                        تسجيل الخروج
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <Toast />
</template>

<script>
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
    data(){
        return{
            userName : ''
        }
    },
    methods:{
        async logOut(){
            const fd = new FormData();
            await axios.post('logout', fd,{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res) =>{
                if( res.data.key === 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 2000);
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                }
            } )
        }
    },
    components:{
        Toast
    },
    mounted(){
        this.userName = JSON.parse(localStorage.getItem('user')).name ;
    }
}
</script>

<style>

</style>