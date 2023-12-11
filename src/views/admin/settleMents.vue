<template>
    <navbar />
    <sidebar />
    <section id="content">
        <div class="settles d-flex">
            <router-link to="/admin/financial">
                <!-- single settle  -->
                <div class="single_settle">
                    <img :src="require('@/assets/imgs/deal (3) 1.png')" alt="">
                    <p class="whieColor">
                        التسوية المالية
                        <i class="fa-solid fa-chevron-left"></i>
                    </p>
                </div>
            </router-link>

            <router-link to="/admin/rent">
                <!-- single settle  -->
                <div class="single_settle mx-3">
                    <img :src="require('@/assets/imgs/partnership 1.png')" alt="">
                    <p class="whieColor">
                        تسوية الأجور
                        <i class="fa-solid fa-chevron-left"></i>
                    </p>
                </div>
            </router-link>
            

            
        </div>
    </section>
</template>

<script>
  import navbar from "@/components/navComp.vue";
  import sidebar from "@/components/sidebarComp.vue";

export default {
    components:{
        navbar,
        sidebar
    }
}
</script>

<style lang="scss">
    .single_settle{
        width:300px;
        height:300px;
        background-color: #2D6191;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
        img{
            width:110px;
            height: 110px;
            margin-bottom: 15px;
            object-fit: contain;
        }
        .whieColor{
            color:#fff;
            font-size: 20px;
        }
    }
    .settles{
        justify-content: center;
        align-items: center;
        margin: auto;
        transform: translate(0%, 50%);
    }
</style>