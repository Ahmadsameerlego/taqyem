import { createRouter, createWebHistory } from 'vue-router'

//sales
import HomeView from '../views/HomeView.vue';
import salesHome from '../views/sales/salesHome.vue';
import salesOrder from '../views/sales/orderView.vue';
import createOrder from '../views/sales/createOrder.vue';
import newOrder from '../views/sales/newOrder.vue';
import orderDetails from '../views/sales/orderDetails.vue';
import confirm from '../views/sales/confirmOrder.vue';


// deliver 
import deliverHome from '../views/deliver/deliverHome.vue';

// admin 
import homeAdmin from '@/views/admin/adminHome.vue';
import orders from '@/views/admin/adminOrder.vue';
import client from '@/views/admin/clientInfo.vue';
import clients from '@/views/admin/clientView.vue';
import settlments from '@/views/admin/settleMents.vue';
import financial from '@/views/admin/financialSettle.vue';
import singleFinancial from '@/views/admin/singleFinancial.vue';
import products from '@/views/admin/ordersView.vue';
import add from '@/views/admin/addProduct.vue';
import edit from '@/views/admin/editProduct.vue';
import products_info from '@/views/admin/clientProductInfo.vue';
import info_details from '@/views/admin/clientProductDetail.vue';
import order_complete from '@/views/admin/adminCompleteOrder.vue';

// delivered 
import cinetInfo from '@/views/admin/complete/clientInfo.vue';
import completeProducts from '@/views/admin/complete/completeProducts.vue';
import completeOrderDetails from '@/views/admin/complete/orderDetails.vue';
import completeConfirmOrder from '@/views/admin/complete/confirmOrder.vue';
import rentSettle from '@/views/admin/rentSettle.vue';
import singleRent from '@/views/admin/singleRent.vue';

import settings from '@/views/admin/settingsView.vue';
import notification from '@/views/admin/notificationsView.vue';

import rentDeliver from '@/views/admin/rentDeliver.vue';

import showOrderClient from '@/views/admin/show/clientInfo.vue';
import showCompleteOrder from '@/views/admin/show/completeProducts.vue';
import showOrderDetails from '@/views/admin/show/orderDetails.vue'

const routes = [
  {
    path : '/showOrderDetails/:id',
    name : 'showOrderDetails',
    component : showOrderDetails
  },
  {
    path : '/showCompleteOrder/:id',
    name : 'showCompleteOrder',
    component : showCompleteOrder
  },
  {
    path : '/showOrderClient/:id',
    name : 'showOrderClient',
    component : showOrderClient
  },
  {
    path : '/admin/rentDeliver/:id',
    name : 'rentDeliver',
    component  : rentDeliver
  },
  {
    path : '/notification',
    name : 'notification',
    component : notification
  },
  {
    path : '/admin/setting',
    name : 'settings',
    component : settings
  },
  {
    path : '/admin/singleRent/:id',
    name : 'singleRent',
    component : singleRent
  },
  {
    path : '/admin/rent',
    name : 'rent',
    component : rentSettle
  },
  {
    path : '/complete/completeConfirmOrder/:id',
    name : 'completeConfirmOrder',
    component : completeConfirmOrder
  },
  {
    path : '/complete/completeOrderDetails/:id',
    name : 'completeOrderDetails',
    component : completeOrderDetails
  },
  {
    path : '/complete/completeProducts/:id',
    name : 'completeProducts',
    component : completeProducts
  },
  {
    path : '/complete/client/:id',
    mame : 'cinetInfo',
    component : cinetInfo
  },
  {
    path: '/',
    name: 'homesales',
    component: HomeView
  },
  {
    path:'/sales/home',
    name : 'home',
    component : salesHome
  },
  {
    path: '/sales/orders',
    name : 'order',
    component : salesOrder
  },
  {
    path : '/sales/create',
    name : 'create',
    component : createOrder
  },
  {
    path : '/sales/newOrder',
    name : 'newOrder',
    component : newOrder
  },
  {
    path :'/sales/orderDetails',
    name : 'orderDetails',
    component : orderDetails
  },
  {
    path : '/sales/confirm',
    name : 'confirm',
    component : confirm
  },

  // deliver 
  {
    path : '/deliver/home',
    name : 'deliver',
    component : deliverHome
  },
  // admin 
  {
    path : '/admin/home',
    name : 'admin' ,
    component : homeAdmin
  },
  {
    path : '/admin/orders',
    name : 'orders',
    component : orders
  },
  {
    path : '/admin/client/:id',
    name : 'client',
    component : client
  },
  {
    path : '/admin/clients',
    name : 'clients',
    component : clients
  },
  {
    path : '/admin/settlments',
    name : 'settlments',
    component : settlments
  },
  {
    path : '/admin/financial',
    name : 'financial',
    component : financial
  },
  {
    path : '/admin/single',
    name :'singleFinancial',
    component : singleFinancial
  },
  {
    path : '/admin/products',
    name : 'products',
    component : products
  },
  {
    path : '/admin/addProduct',
    name : 'addProduct',
    component : add
  },
  {
    path : '/admin/edit/:id',
    name : 'edit',
    component : edit
  },
  {
    path : '/admin/products/:id',
    name : 'prod_ifo',
    component : products_info
  },
  {
    path : '/admin/details/:id',
    name : 'info_details',
    component : info_details
  },
  {
    path : '/admin/complete/:id',
    name : 'order_complete',
    component : order_complete
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
