import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../components/pages'
import article from '../components/pages/article'
import comments from '../components/pages/comments'
import collection from '../components/pages/collection'

export default new Router({
  routes: [
    {
      path:'/index',
      component:index
    },
    {
      path:'/article/:id',
      component:article
    },
    {
      path:'/comments/:id',
      component:comments
    },
    {
      path:'/collection',
      component:collection
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
