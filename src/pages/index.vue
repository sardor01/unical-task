<script setup lang="ts">
import { fetchProducts, productState } from '~/stores/product';

onMounted(() => fetchProducts({ limit: 10 }));
</script>

<template>
  <main class="py-6 lg:py-8">
    <div class="space-y-6">
      <h1 class="text-2xl font-bold tracking-tight md:text-3xl">Products</h1>

      <BaseLoader v-if="productState.isLoading" class="mx-auto my-6" />
      <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
        <ProductCard v-for="product in productState.products" :key="product.id" :product="product" />
      </div>
    </div>
  </main>
</template>
