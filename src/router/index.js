import { createRouter, createWebHistory } from "vue-router";
import DocsPage from "../pages/DocsPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: DocsPage
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../pages/AboutPage.vue")
        }
    ]
});

export default router;