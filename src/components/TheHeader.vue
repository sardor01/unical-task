<script setup lang="ts">
const links = [
  { name: 'Home', to: '#' },
  { name: 'About', to: '#' },
  { name: 'Services', to: '#' },
  { name: 'Contact', to: '#' },
];
</script>

<template>
  <nav class="border-gray-200 bg-white">
    <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/logoipsum.svg" class="h-8" alt="Logoipsum" />
      </RouterLink>
      <div class="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          class="rounded-lg bg-secondary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-secondary/50"
        >
          Get started
        </button>
        <button
          data-collapse-toggle="navbar-cta"
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-controls="navbar-cta"
          aria-expanded="false"
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
      <div id="navbar-cta" class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
        <ul
          class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse"
        >
          <li v-for="(link, linkIndex) in links" :key="linkIndex">
            <RouterLink
              :to="link.to"
              class="block rounded bg-primary px-3 py-2 text-white md:bg-transparent md:p-0 md:text-primary"
              aria-current="page"
            >
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
