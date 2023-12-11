<template>
    <navbar />
    <sidebar />

    <section id="content">
        <div class="container mt-4">
            <section class="nots">
                <div class="single_not pt-3 pb-3 mb-2 px-4">
                    <h5 class="fw-bold"> test </h5>

                    <h6 class="fw-bold"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, enim. </h6>
                </div>
            </section>
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
    .single_not{
        background-color: #fff !important;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #3333332f;
    }
</style>