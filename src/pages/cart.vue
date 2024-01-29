<script setup lang="ts">
import { cartState, fetchUserCart } from '~/stores/cart';
import { formatPrice } from '~/utils';

definePage({
  meta: {
    auth: true,
  },
});

onMounted(fetchUserCart);
</script>

<template>
  <main class="mx-auto max-w-6xl py-6 lg:py-8">
    <BaseLoader v-if="cartState.getLoading || cartState.updateLoading" class="mx-auto my-6" />

    <div v-else-if="cartState.cart">
      <h1 class="mb-4 text-4xl font-bold capitalize">Shopping cart</h1>

      <p class="mb-4 text-lg text-green-700 md:mb-8">
        <span class="font-semibold">Total Price:</span> ${{ formatPrice(cartState.cart.discountedTotal) }}
      </p>

      <ul role="list" class="-my-6 divide-y divide-gray-200">
        <li v-for="product in cartState.cart.products" :key="product.id" class="flex py-6">
          <RouterLink
            :to="`/products/${product.slug}`"
            class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
          >
            <img :src="product.thumbnail" :alt="product.title" class="h-full w-full object-cover object-center" />
          </RouterLink>

          <div class="ml-4 flex flex-1 flex-col gap-2 py-1">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <RouterLink :to="`/products/${product.slug}`" class="font-medium capitalize">
                {{ product.title }}
              </RouterLink>
              <p class="ml-4">${{ formatPrice(product.discountedPrice) }}</p>
            </div>
            <div class="flex items-end justify-between text-sm">
              <p class="text-gray-500">Qty: {{ product.quantity }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
