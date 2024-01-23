import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:vue-layouts';
import { authState } from '~/stores/auth';

declare module 'vue-router' {
  interface RouteMeta {
    auth?: 'guest' | boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => setupLayouts(routes),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to) => {
  const metaAuth = to.meta.auth;
  const loggedIn = authState.loggedIn;

  if (metaAuth !== undefined && metaAuth !== false) {
    if (loggedIn && metaAuth === 'guest') {
      return '/';
    }
    if (!loggedIn && metaAuth !== 'guest') {
      return '/auth/login';
    }
  }
});

export default router;
