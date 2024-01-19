<template>
  <footer class="m-4 rounded-lg bg-white shadow">
    <div class="mx-auto w-full max-w-screen-xl p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <RouterLink to="/" class="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse">
          <img src="/logoipsum.svg" class="h-8" alt="Logoipsum" />
        </RouterLink>
        <ul class="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0">
          <li>
            <a href="#" class="me-4 hover:underline md:me-6">About</a>
          </li>
          <li>
            <a href="#" class="me-4 hover:underline md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" class="me-4 hover:underline md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" class="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center">
        &copy; {{ new Date().getFullYear() }} Logoipsum™. All Rights Reserved.
      </span>
    </div>
  </footer>
</template>
