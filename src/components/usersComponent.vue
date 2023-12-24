<template>
  <div class="container mt-4">      
        <!-- add user  -->
        <div class="d-flex justify-content-end mb-3">
            <button class="main_btn btn px-4 pt-2 pb-2" @click="addUser=true">
                <span class="mx-2">
                    <i class="fas fa-plus"></i>
                </span>
                انشاء مستخدم جديد
            </button>
        </div>                    
        <!-- table  -->
        <div class="card card_table">
            <DataTable 
                :value="products" 
                paginator :rows="5" 
                :rowsPerPageOptions="[5, 10, 20, 50]"   
                tableStyle="min-width: 50rem"
                v-model:filters="filters"
                ref="dt"
            >
                <Column field="name" header="اسم المستخدم"></Column>
                <Column field="role_name" header="دور المستخدم"></Column>
                <Column field="last_active_at" header="اخر ظهور"></Column>
                <Column field="created_at" header="تاريخ الانشاء"></Column>

                <Column  header="حالة الحساب">
                    <template #body="slotProps" >
                        <div class="form-switch" style="cursor:pointer" @click.prevent="changeStatue(slotProps.data.id)">
                            <input class="form-check-input" :checked="slotProps.data.is_active==true" type="checkbox" id="flexSwitchCheckDefault">
                        </div>                     
                    </template>
                </Column>

                <Column  header="تعديل الحساب">
                    <template #body="slotProps" >
                        <button class="btn" @click="openEdit(slotProps.data.id)">
                            <i class="fas fa-edit"></i>
                        </button>  
                        
                        <div v-if="slotProps"></div>
                    </template>
                </Column>

                <Column  >
                    <template #body="slotProps" >
                        

                        <div class="dropdown userOptionDropdown">
                            <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li @click="openChangePass(slotProps.data.id)">
                                    <a class="dropdown-item" href="#">تغيير كلمة المرور</a>
                                </li >
                                <li @click="openDelete(slotProps.data.email, slotProps.data.name , slotProps.data.id)"><a class="dropdown-item" href="#">حذف الحساب</a></li>
                            </ul>
                        </div>
                        
                        <div v-if="slotProps"></div>
                    </template>
                </Column>


            </DataTable>
        </div>


    </div>

    <!-- add user  -->
    <Dialog v-model:visible="addUser" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       
        <h6 class="mb-3"> اضافة عضو جديد </h6>

        <form action="" ref="addUserForm">
            <div class="form-group mb-2">
                <label for="" class="mb-1">
                     الاسم
                     <i class="fa-solid fa-star-of-life text-danger"></i>
                </label>
                <input type="text" placeholder="ادخل الاسم" class="form-control pt-2 pb-2" name="name">
            </div>

            <div class="position-relative form-group mb-2">
                <label for="" class="mb-1">
                     الجوال
                     <i class="fa-solid fa-star-of-life text-danger"></i>
                </label>
                <input type="text" placeholder="ادخل الجوال" class="form-control pt-2 pb-2" name="phone">
                <select name="" id="" class="form-select phoneCountry">
                    <option value="" selected> +966 </option>
                </select>
            </div>

            <div class="form-group mb-2">
                <label for="" class="mb-1">
                     البريد الالكتروني
                     <i class="fa-solid fa-star-of-life text-danger"></i>
                </label>
                <input type="email" required placeholder="ادخل الالكتروني" class="form-control pt-2 pb-2" name="email">
            </div>

            <div class="form-group mb-2">
                <label for="" class="mb-1">
                     دور العضو
                     <i class="fa-solid fa-star-of-life text-danger"></i>
                </label>

                <select name="" id="" class="form-select pt-2 pb-2" v-model="roleSelected">
                    <option value="none"  hidden disabled selected > اختر العضو</option>

                    <option :value="role.id" v-for="role in roles" :key="role.id"> {{ role.name }} </option>
                </select>
            </div>

            <div class="form-group mb-2">
                <label for="" class="mb-1">
                     اسم البنك
                     <i class="fa-solid fa-star-of-life text-danger"></i>
                </label>
                <input type="text" placeholder="ادخل اسم البنك" class="form-control pt-2 pb-2" name="bank_name">
            </div>

            <div class="form-group mb-2">
                <label for="" class="mb-1">
                     صاحب الحساب
                     <i class="fa-solid fa-star-of-life text-danger"></i>
                </label>
                <input type="text" placeholder="ادخل صاحب الحساب" class="form-control pt-2 pb-2" name="account_owner_name">
            </div>

            <div class="form-group mb-2">
                <label for="" class="mb-1">
                     رقم الحساب
                     <i class="fa-solid fa-star-of-life text-danger"></i>
                </label>
                <input type="number" placeholder="ادخل رقم الحساب" class="form-control pt-2 pb-2" name="account_num">
            </div>

            <div class="form-group mb-2">
                <label for="" class="mb-1">
                     رقم الايبان
                     <i class="fa-solid fa-star-of-life text-danger"></i>
                </label>
                <input type="number" placeholder="ادخل رقم الايبان" class="form-control pt-2 pb-2" name="iban_num">
            </div>

            <div class="form-group mb-2">
                <label for="" class="mb-1">
                     الرقم السري
                     <i class="fa-solid fa-star-of-life text-danger"></i>
                </label>
                <input type="password" placeholder="ادخل الرقم السري" class="form-control pt-2 pb-2" name="password">
            </div>



        </form>
        
        <div class="d-flex justify-content-center align-items-center mt-3">
            <button class="btn main_btn  w-50 px-4" @click.prevent="addUserRole()" :disabled="disabled"> اضافة </button>
            <button class="btn sec_btn mx-2 w-50  px-4" @click.prevent="addUser=false"> الغاء </button>
        </div>
    </Dialog>

     <!-- edit user  -->
     <Dialog v-model:visible="editUser" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       
       <h6 class="mb-3"> تعديل حساب عضو جديد </h6>

       <form action="" ref="addUserForm">
           <div class="form-group mb-2">
               <label for="" class="mb-1">
                    الاسم
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="text" placeholder="ادخل الاسم" class="form-control pt-2 pb-2" name="name" v-model="name">
           </div>

           <div class="position-relative form-group mb-2">
               <label for="" class="mb-1">
                    الجوال
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="text" placeholder="ادخل الجوال" class="form-control pt-2 pb-2" name="phone" v-model="phone">
               <select name="" id="" class="form-select phoneCountry">
                    <option value="" selected> +966 </option>
                </select>
           </div>

           <div class="form-group mb-2">
               <label for="" class="mb-1">
                    البريد الالكتروني
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="email" required placeholder="ادخل الالكتروني" class="form-control pt-2 pb-2" name="email" v-model="email">
           </div>

           <div class="form-group mb-2">
               <label for="" class="mb-1">
                    دور العضو
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>

               <select name="" id="" class="form-select pt-2 pb-2" v-model="role">
                   <option value="none"  hidden disabled selected > {{ role_name }}</option>

                   <option :value="role.id" v-for="role in roles" :key="role.id"> {{ role.name }} </option>
               </select>
           </div>

           <div class="form-group mb-2">
               <label for="" class="mb-1">
                    اسم البنك
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="text" placeholder="ادخل اسم البنك" class="form-control pt-2 pb-2" name="bank_name" v-model="bank_name">
           </div>

           <div class="form-group mb-2">
               <label for="" class="mb-1">
                    صاحب الحساب
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="text" placeholder="ادخل صاحب الحساب" class="form-control pt-2 pb-2" name="account_owner_name" v-model="account_owner_name">
           </div>

           <div class="form-group mb-2">
               <label for="" class="mb-1">
                    رقم الحساب
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="number" placeholder="ادخل رقم الحساب" class="form-control pt-2 pb-2" name="account_num" v-model="account_num">
           </div>

           <div class="position-relative form-group mb-2">
               <label for="" class="mb-1">
                    رقم الايبان
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="number" placeholder="ادخل رقم الايبان" class="form-control pt-2 pb-2" name="iban_num" v-model="iban_num">
               <span class="iban_type">
                SA
               </span>
           </div>

           <div class="form-group mb-2">
               <label for="" class="mb-1">
                    الرقم السري
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="password" placeholder="ادخل الرقم السري" class="form-control pt-2 pb-2" name="password" v-model="password">
           </div>



       </form>
       
       <div class="d-flex justify-content-center align-items-center mt-3">
           <button class="btn main_btn  w-50 px-4" @click.prevent="updateUser()" :disabled="disabled"> اضافة </button>
           <button class="btn sec_btn mx-2 w-50  px-4" @click.prevent="editUser=false"> الغاء </button>
       </div>
   </Dialog>

    <!-- change password  -->
    <Dialog v-model:visible="changePassword" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       
       <h6 class="mb-3"> اعادة تعيين كلمة المرور </h6>

       <form action="" ref="changePassForm">
           

           <div class="form-group mb-2">
               <label for="" class="mb-1">
                    كلمة المرور الجديدة
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="password" placeholder="ادخل كلمة المرور الجديدة" class="form-control pt-2 pb-2" name="password">
           </div>

           <div class="form-group mb-2">
               <label for="" class="mb-1">
                    تأكيد كلمة المرور الجديدة
                    <i class="fa-solid fa-star-of-life text-danger"></i>
               </label>
               <input type="password" placeholder="ادخل تأكيد كلمة المرور الجديدة" class="form-control pt-2 pb-2" name="password_confirmation">
           </div>



       </form>
       
       <div class="d-flex justify-content-center align-items-center mt-3">
           <button class="btn main_btn w-100 px-4" @click.prevent="changePasswordUser()" :disabled="changeDisabled"> تغيير كلمة المرور </button>
       </div>
   </Dialog>

   <!-- delete user  -->
   <Dialog v-model:visible="deleteUser" modal  :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       
        <div class="d-flex justify-content-center align-items-center flex-column">
            <div class="deleteImage mb-3">
                <img :src="require('@/assets/imgs/delete.png')" alt="">
            </div>

            <h6 class="mb-2 userName" > هل تريد حذف {{ userName }} </h6>

            <p class="userEmail"> {{ userEmail }} </p>
        </div>
       
       
       <div class="d-flex justify-content-center align-items-center mt-3">
            <button class="btn main_btn  w-50 px-4" @click.prevent="deleteUserMethod()" :disabled="deleteDisabled"> حذف </button>
            <button class="btn sec_btn mx-2 w-50  px-4" @click.prevent="deleteUser=false"> الغاء </button>
       </div>
   </Dialog>

    <Toast />
</template>

<script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { FilterMatchMode } from 'primevue/api';
  import Dialog from 'primevue/dialog';

  
  import axios from 'axios';
  import Toast from 'primevue/toast';

export default {
    data(){
          return{
              selectedButton : null,
              products: null,
              filters: {
                  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
              },
              addUser : false,
              disabled : false,
              roleSelected : null,
              roles : [],
              changePassword : false,
              user_id : '',
              changeDisabled  : false,
              deleteUser : false,
              userEmail : '',
              userName : '',
              deleteDisabled : false,
              editUser : false,

            //   user 
            name : '',
            phone : '',
            email : '',
            role : '',
            role_name : '',
            password : '',
            bank_name : '',
            iban_num : '',
            account_num : '',
            account_owner_name : ''
          }
      },
      components:{
          DataTable,
          Column,
          Dialog,
          Toast
      },
      methods:{
        openDelete(email, name , userId){
            this.deleteUser = true ;
            this.userEmail = email ;
            this.userName = name ;
            this.user_id = userId ;
        },
        openEdit(id){
            this.user_id = id ;
            this.editUser = true ;

            this.getSingleUser(id)
        },
        // get single user 
        async getSingleUser(id){
            await axios.get(`admin/users/${id}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
                
            })
            .then( (res)=>{
                const response = res.data.data ;

                this.user_id = response.id ;
                this.name = response.name ;
                this.phone = response.phone ;
                this.email = response.email ;
                this.role = response.role ;
                this.role_name = response.role_name ;

                this.bank_name = response.bank_name ;
                this.account_num = response.account_num ;
                this.account_owner_name = response.account_owner_name ;
                this.iban_num = response.iban_num ;
            } )
        },
        // change password 
        async changePasswordUser(){
            this.changeDisabled = true ;
            const fd = new FormData(this.$refs.changePassForm);
            await axios.post(`admin/users/${this.user_id}/change-password` , fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if(  res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.changePassword = false ;
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });

                }
                this.changeDisabled = false ;
            } )
        },
          selectButton(button) {
              this.selectedButton = button;
              
          },
          exportCSV() {
              this.$refs.dt.exportCSV();
          },
          toggleMenu(){
              this.$refs.filterContent.classList.toggle('active')
          },
          closeModal(){
              this.$refs.filterContent.classList.remove('active')
          },
          async getRoles(){
            await axios.get('roles')
            .then( (res)=>{
                this.roles = res.data.data ;
            } )
          },
          async getProducts(){
            await axios.get('admin/users', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                this.products = res.data.data ;
            } )
          },

        // add user 
        async addUserRole(){
            const fd = new FormData(this.$refs.addUserForm);
            this.disabled = true ;
            fd.append('role', this.roleSelected)
            await axios.post('admin/users', fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if(  res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.disabled = false ;

                    this.addUser = false ;
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                    this.disabled = false ;

                }
            } )
        },
        // change status 
        async changeStatue(id){
            const fd = new FormData();
            await axios.post(`admin/users/${id}/change-status` , fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if(  res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.getProducts();
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });

                }
            } )
        },
        // delete user 
        async deleteUserMethod(){
            const fd = new FormData();
            fd.append('_method', 'delete');
            this.deleteDisabled = true ;
            await axios.post(`admin/users/${this.user_id}?_method=delete` , fd , {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if(  res.data.key == 'success' ){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 });
                    this.getProducts();
                    this.deleteUser = false ;
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });

                }
                this.deleteDisabled = false ;
            } )
        },
        openChangePass(id){
            this.changePassword = true ;
            this.user_id = id ;
        },

        // update user 
        async updateUser(){
            const fd = new FormData() ;
            fd.append('name', this.name);
            fd.append('phone', this.phone);
            fd.append('email', this.email);
            fd.append('role', this.role);
            fd.append('password', this.password);
            fd.append('bank_name', this.bank_name);
            fd.append('account_num', this.account_num);
            fd.append('account_owner_name', this.account_owner_name);
            fd.append('iban_num', this.iban_num);

            this.disabled = true ;

            await axios.post(`admin/users/${this.user_id}?_method=PUT` , fd , {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( (res)=>{
                if(res.data.key == 'success'){
                    this.$toast.add({ severity: 'success', summary: res.data.msg, life: 3000 }); 
                    this.editUser =false;   
                    this.getProducts();
                }else{
                    this.$toast.add({ severity: 'error', summary: res.data.msg, life: 3000 });
                }
                this.disabled = false ;
            } )
        }
      },
      mounted(){
        this.getProducts();
        this.getRoles();
      }  
}
</script>

<style>
    .phoneCountry{
        position: absolute;
        left: 0;
        top: 40%;
        width: 88px !important;
        height: 60%;
    }
    .iban_type{
        position: absolute;
        left: 0;
        top: 42%;
        height: 39px;
        border-right: 1px solid #333;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 19px;
        font-weight: bold;  
    }
    .userName{
        color: #0000008F;
    }
    .userEmail{
        color: #0000008F;
        font-size: 13px;
    }
    .fa-star-of-life{
        font-size: 9px;
    }
    .form-select{
        background-position: left .75rem center !important;
    }
    .dropdown-toggle::after{
        display: none !important;
    }
</style>