import { createRouter, createWebHistory } from "vue-router";
import AccountEdit from '../views/account/edit.vue';
import Account from '../views/account/index.vue';
import Auth from '../views/auth/index.vue';
import SignUp from '../views/auth/signup/index.vue';
import Dashboard from '../views/dashboard/index.vue';
import Home from '../views/Home.vue';
import Training from '../views/training/_trainingId/index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Home', component: Home}, 
        {path: '/auth', name: 'Auth', component: Auth},
        {path: '/auth/signup', name: 'SignUp', component: SignUp},
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