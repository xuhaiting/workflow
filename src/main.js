import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
require('@/utils/CustomUtil')

import "@/assets/theme.less";
import "@/assets/global.css";
import "@/assets/iconfont/iconfont.css";

import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.min.css';

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Ellipsis from '@/components/common/Ellipsis'
import WDialog from '@/components/common/WDialog'
import Tip from '@/components/common/Tip'

Vue.use(ElementUI);
Vue.use(Ellipsis);
Vue.use(WDialog);
Vue.use(Tip);
Vue.use(Antd);

Vue.config.productionTip = false

Vue.prototype.BASE_URL = 'http://' + (process.env.NODE_ENV === 'development-' ? "localhost" : "150.158.162.224");

Vue.prototype.$isNotEmpty = function(obj){
  return (obj !== undefined && obj !== null && obj !== '' && obj !== 'null')
}

Vue.prototype.$getDefalut = function(obj, key, df){
  return (obj === undefined || key === undefined || !this.$isNotEmpty(obj[key])) ? df : obj[key];
}

Vue.prototype.$deepCopy = function (obj){return JSON.parse(JSON.stringify(obj))}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
