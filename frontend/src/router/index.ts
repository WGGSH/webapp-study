import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SlidePuzzleView from '../views/SlidePuzzleView.vue'
import LifeGameView from '../views/LifeGameView.vue'
import SolitaireView from '../views/SolitaireView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/slidepuzzle',
    name: 'slide-puzzle',
    component: SlidePuzzleView,
  },
  {
    path: '/lifegame',
    name: 'life-game',
    component: LifeGameView,
  },
  {
    path: '/solitaire',
    name: 'solitaire',
    component: SolitaireView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
