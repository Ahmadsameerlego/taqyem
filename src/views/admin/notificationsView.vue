<template>
    <navbar />
    <sidebar />

    <section id="content">
        <div class="container mt-4">
            <section class="nots">
                <router-link to="/admin/orders">
                    <div class="single_not position-relative pt-3 pb-3 mb-2 px-4" v-for="not in notifications" :key="not.id">
                        <h5 class="fw-bold"> {{ not.title }} </h5>

                        <h6 class="fw-bold"> {{ not.body }} </h6>

                        <span class="created-at">
                            {{ not.created_at }}
                        </span>
                    </div>
                </router-link>
               
            </section>
        </div>
    </section>
</template>

<script>
  import navbar from "@/components/navComp.vue";
  import sidebar from "@/components/sidebarComp.vue";
import axios from 'axios';
export default {
    data(){
        return{
            notifications : []
        }
    },
    components:{
        navbar,
        sidebar
    },
    methods:{
        async getNost(){
            await axios.get('notifications', {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.notifications = res.data.data ;
            } )
        }
    },
    mounted(){
        this.getNost();
    }
}
</script>

<style lang="scss"> 
    .created-at{
        position:absolute;
        top:10px;
        left:10px
    }
    .single_not{
        background-color: #fff !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #3333332f;
    }
</style>