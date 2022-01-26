import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faExclamationCircle, faMinus, faPlus, faSearch, faSort, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(
    faPlus,
    faTimes,
    faExclamationCircle,
    faMinus,
    faEdit,
    faSearch,
    faSort
);

createApp(App)
    .use(router)
    .use(store)
    .component('VueFontawesome', FontAwesomeIcon)
    .use(Oruga, { iconPack: 'fas', iconComponent: 'vue-fontawesome' })
    .mount('#app')
