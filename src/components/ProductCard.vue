<script setup lang="ts">
import type { Product } from '~/api/product';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="group relative">
    <div
      class="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 lg:h-80"
    >
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-balance pr-2 text-sm text-gray-700">
          <a href="#">
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ product.title }}
          </a>
        </h3>
        <p class="mt-1 text-sm capitalize text-gray-500">{{ product.brand }}</p>
      </div>
      <p class="text-sm font-medium">${{ product.price }}</p>
    </div>
  </div>
</template>
