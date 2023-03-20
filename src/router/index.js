import { createRouter, createWebHistory } from "vue-router";
import { useSessionUserInfos } from "../composables/auth/useSessionUserInfos";
import { supabase } from "../supabase";
import About from '../views/about/index.vue';
import AccountEdit from '../views/account/edit.vue';
import Account from '../views/account/index.vue';
import Auth from '../views/auth/index.vue';
import Information from '../views/auth/information/index.vue';
import SignUp from '../views/auth/signup/index.vue';
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

const publicRoutes = ['Home', 'About', 'SignUp']

router.beforeEach(async (to, from, next) => {
    const authUser = await supabase.auth.getUser()

    if(publicRoutes.includes(to.name)) return next()

    if(!authUser.data.user && to.name !== 'Auth') {
        return next({ name: "Auth" })
    }
    
    if(authUser.data.user) {
        const user = await useSessionUserInfos(authUser.data.user?.id)

        if(!user.did_user_register && to.name !== 'Information') {
            return next({ name: "Information" })
        }
    }

    if(to.path.includes('verify?token=')) {
        next()
    } else {
        next()
    }
})


export default router