<script setup lang="ts">
import { authStore, fetchCurrentUser } from '~/stores/auth';

if (authStore.loggedIn) {
  fetchCurrentUser();
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="w-full flex-1">
      <TheHeader />
      <div class="container mx-auto bg-white px-4">
        <RouterView />
      </div>
    </div>
    <TheFooter class="flex-shrink-0" />
  </div>
</template>
