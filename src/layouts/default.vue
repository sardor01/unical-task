<script setup lang="ts">
import { LocalCartManager } from '~/api/cart';
import { authState, fetchCurrentUser } from '~/stores/auth';
import { cartState } from '~/stores/cart';

cartState.cartLength = LocalCartManager.getLocalCart().length;

if (authState.loggedIn) {
  await fetchCurrentUser();
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="w-full flex-1">
      <TheHeader />
      <div class="container mx-auto bg-white px-4 text-gray-900">
        <RouterView />
      </div>
    </div>
    <TheFooter class="flex-shrink-0" />
  </div>
</template>
