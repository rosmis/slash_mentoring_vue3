import { createRouter, createWebHistory } from "vue-router";
import About from '../views/about/index.vue';
import AccountEdit from '../views/account/edit.vue';
import Account from '../views/account/index.vue';
import Auth from '../views/auth/index.vue';
import SignUp from '../views/auth/signup/index.vue';
import Information from '../views/auth/information/index.vue';
import Dashboard from '../views/dashboard/index.vue';
import Home from '../views/Home.vue';
import Training from '../views/training/_trainingId/index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Home', component: Home}, 
        {path: '/about', name: 'About', component: About}, 
        {path: '/auth', name: 'Auth', component: Auth},
        {path: '/auth/signup', name: 'SignUp', component: SignUp},
        {path: '/auth/information', name: 'Information', component: Information},
        {path: '/account', name: 'Account', component: Account},
        {path: '/account/edit', name: 'Account-edit', component: AccountEdit},
        {path: '/dashboard', name: 'Dashboard', component: Dashboard},
        {path: '/training/:id', name: 'Training', component: Training},
    ]
})

router.beforeEach((to, from, next) => {


    if(to.path.includes('verify?token=')) {
        next()
    } else {
        next()
    }
})


export default router