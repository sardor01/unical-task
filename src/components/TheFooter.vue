<template>
  <footer class="m-4 rounded-lg bg-white shadow">
    <div class="container mx-auto w-full p-4 md:py-6">
      <div class="text-center">
        <RouterLink to="/" class="inline-block">
          <img src="/logoipsum.svg" class="h-9" alt="Logoipsum" />
        </RouterLink>
      </div>
      <hr class="my-4 border-gray-200 sm:mx-auto lg:my-6" />
      <span class="block text-sm text-gray-500 sm:text-center">
        &copy; {{ new Date().getFullYear() }} Logoipsum. All Rights Reserved.
      </span>
    </div>
  </footer>
</template>
