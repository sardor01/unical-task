<script setup lang="ts">
import { authState, logout } from '~/stores/auth';

const route = useRoute();
const router = useRouter();

const links = [
  { name: 'Home', to: '/' },
  { name: 'Cart', to: '/cart' },
  { name: 'Posts', to: '/posts' },
];

const isMenuOpen = ref(false);

const handleLogout = () => {
  logout();
  router.push('/auth/login');
};

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  },
);
</script>

<template>
  <header class="border-gray-200 bg-white">
    <div class="container mx-auto flex flex-wrap items-center gap-4 p-4">
      <RouterLink to="/" class="flex items-center gap-3">
        <picture class="inline-block h-9">
          <source srcset="/logoipsum.svg" media="(min-width: 450px)" />
          <img src="/logoipsum-small.svg" alt="Logoipsum" class="h-full" />
        </picture>
      </RouterLink>
      <div class="ml-auto flex items-center gap-3 md:order-2 md:ml-0 md:gap-0">
        <BaseButton v-if="authState.loggedIn" variant="secondary" @click="handleLogout">Sign out</BaseButton>
        <RouterLink v-else v-slot="{ href, navigate }" to="/auth/login" custom>
          <BaseLink :href="href" variant="secondary" @click="navigate">Sign in</BaseLink>
        </RouterLink>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="w-full items-center justify-between md:order-1 md:ml-auto md:flex md:w-auto"
        :class="isMenuOpen ? 'block' : 'hidden'"
      >
        <ul
          class="flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-3 font-medium md:flex-row md:gap-4 md:border-0 md:bg-white md:p-0"
        >
          <li v-for="(link, linkIndex) in links" :key="linkIndex">
            <RouterLink v-slot="{ href, navigate, isExactActive }" :to="link.to" custom>
              <BaseLink
                :href="href"
                class="bg-primary/10 aria-current-page:bg-primary aria-current-page:text-white"
                :aria-current="isExactActive ? 'page' : undefined"
                @click="navigate"
              >
                {{ link.name }}
              </BaseLink>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
