import { createRouter, createWebHashHistory } from 'vue-router'

import LoginSignup from '../pages/login-signup.vue'
import HomePage from '../pages/home-page.vue'
import UserDetails from '../pages/user-details.vue'
import ContactIndex from '../pages/contact-index.vue'
import ContactDetails from '../pages/contact-details.vue'
import ContactEdit from '../pages/contact-edit.vue'
import Stats from '../pages/stats.vue'

const routerOptions = {
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/login',
			component: LoginSignup,
		},
		{
			path: '/user',
			component: UserDetails,
		},
		{
			path: '/contact',
			component: ContactIndex,
		},
		{
			path: '/contact/:_id',
			component: ContactDetails,
		},
		{
			path: '/contact/edit/:_id?',
			component: ContactEdit,
		},
		{
			path: '/stats',
			component: Stats,
		},
		{
			path: '/about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../pages/AboutView.vue'),
		},
	],
}
const router = createRouter(routerOptions)

export default router
