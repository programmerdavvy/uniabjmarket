import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - UniAbjMarket'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/shop'))
  },
  
  {
    path: '/ecommerce/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/wishlist'))
  },
  {
    path: '/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/detail')),
    meta: {
      navLink: '/ecommerce/product-detail'
    }
  }, 
  {
    path: '/ecommerce/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/checkout'))
  },
  {
    path: '/users/list',
    component: lazy(() => import('../../views/user/list'))
  },
  {
    path: '/user/view',
    exact: true,
    component: () => <Redirect to='/user/view/1' />
  },
  {
    path: '/user/view/:id',
    component: lazy(() => import('../../views/user/view')),
    meta: {
      navLink: '/user/view'
    }
  },
  {
    path: '/coming-soon',
    component: lazy(() => import('../../views/misc/ComingSoon')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  // products
  {
    path: '/products/list',
    component: lazy(() => import('../../views/products/list'))
  },
  {
    path: '/products/view',
    exact: true,
    component: () => <Redirect to='/products/view/1' />
  },
  {
    path: '/products/view/:id',
    component: lazy(() => import('../../views/products/view')),
    meta: {
      navLink: '/products/view'
    }
  },
  // end
  {
    path: '/login',
    component: lazy(() => import('../../views/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/authentication/RegisterCover')),
    layout: 'BlankLayout'
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/authentication/ForgotPasswordCover.js')),
    layout: 'BlankLayout'
  },
  {
    path: '/reset-password/:id',
    component: lazy(() => import('../../views/authentication/ResetPasswordCover')),
    layout: 'BlankLayout'
  },
  {
    path: '/error', 
    component: lazy(() => import('../../views/authentication/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
