import { createRouter, createWebHistory } from "vue-router";
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
        {path: '/auth', name: 'Auth', component: Auth},
        {path: '/auth/signup', name: 'SignUp', component: SignUp},
        {path: '/auth/information', name: 'Information', component: Information},
        {path: '/account', name: 'Account', component: Account},
        {path: '/account/edit', name: 'Account-edit', component: AccountEdit},
        {path: '/dashboard', name: 'Dashboard', component: Dashboard},
        {path: '/training/:id', name: 'Training', component: Training},
    ]
})

// router.beforeEach(async (to, from, next) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     const publicPages = ['/'];
//     const authRequired = !publicPages.includes(to.path);

//     if (authRequired && !userSession) {
//         next({
//             name: 'Home'
//         })
//     }
// });

export default router