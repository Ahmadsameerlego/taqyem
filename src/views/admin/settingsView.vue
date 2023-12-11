<template>
   <navbar />
    <sidebar />
    <section id="content">
        <div class="container">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">اعدادات الحساب</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">المستخدمين</button>
                </li>
                
            </ul>
                <div class="tab-content" id="myTabContent">
                    <!-- بيانات المستخدم  -->
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <section class="user_info">
                        <h6 class="mb-4"> بيانات المستخدم </h6>

                        <div class="user_pic mb-4">
                            <img :src="require('@/assets/imgs/profile-circle 2.png')" alt="">
                        </div>

                        <div class="info_details">
                            <div class="d-flex mb-3">
                                <h6 class="fw-bold">
                                    اسم المستخدم : 
                                </h6>
                                <h6 class="value">
                                    {{ user.name }}
                                </h6>
                            </div>

                            <div class="d-flex mb-3">
                                <h6 class="fw-bold">
                                    البريد الالكتروني : 
                                </h6>
                                <h6 class="value">
                                    {{ user.email }}
                                </h6>
                            </div>

                            <div class="d-flex mb-3">
                                <h6 class="fw-bold">
                                    رقم الجوال : 
                                </h6>
                                <h6 class="value">
                                    {{ user.phone }}
                                </h6>
                            </div>

                            <div class="d-flex mb-3">
                                <h6 class="fw-bold">
                                    تاريخ الانضمام : 
                                </h6>
                                <h6 class="value">
                                    5/12/2023
                                </h6>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <users />
                </div>
                </div>
        </div>
    </section>
</template>

<script>
  import navbar from "@/components/navComp.vue";
  import sidebar from "@/components/sidebarComp.vue";

  import users from '@/components/usersComponent.vue';
  import axios from 'axios';
export default {
    data(){
        return{
            user : {}
        }
    },
    components:{
        navbar,
        sidebar,
        users
    },
    methods:{
        async profile(){
            await axios.get('profile', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.user = res.data.data[0] ;
            } )
        }
    },
    mounted(){
        this.profile();
    }
}
</script>

<style lang="scss">
    .nav-tabs{
        border-bottom: none !important;
        
    }
    .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
        color: #333 !important;
        font-weight: bold;
        background-color: transparent !important;
        border-color: transparent !important;
        border-bottom: 2px solid #333 !important;
    }
    .nav-tabs .nav-link{
        color: #0000008F;
    }

    .user_info{
        border: 1px solid #000000;
        border-radius: 10px;
        background-color: #F6F6F6;
        padding: 20px 15px;
        width: 50%;
        margin: auto;
        margin-top: 120px;
        .value{
            color: #0000008F;
        }
    }
</style>