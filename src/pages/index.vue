<script setup lang="ts">
import type { Product } from '~/components/ProductCard.vue';

const products: Product[] = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/products/product-01.jpeg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/products/product-02.jpeg',
    imageAlt: "Front of men's Basic Tee in white.",
    price: '$35',
    color: 'Aspen White',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/products/product-03.jpeg',
    imageAlt: "Front of men's Basic Tee in dark gray.",
    price: '$35',
    color: 'Charcoal',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/products/product-04.jpeg',
    imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
    price: '$35',
    color: 'Iso Dots',
  },
];
</script>

<template>
  <main class="py-6 lg:py-8">
    <h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Top products chosen by customers</h1>

    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </main>
</template>
