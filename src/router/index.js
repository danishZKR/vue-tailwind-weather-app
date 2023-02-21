import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import City from "../views/City.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                title: "Home"
            }
        },
        {
            path: "/:province/:city",
            name: "city",
            component: City,
            meta: {
                title: "Weather"
            }
        }
    ]
})

router.beforeEach((to, from, next)=>{
    document.title = `${to.params.city? to.params.city: to.meta.title} | The Local Weather`
    next()
})

export default router