<script setup lang="ts">
import { fetchProduct, productState } from '~/stores/product';
import IconArrowLeft from '~icons/mdi/arrow-left';

const route = useRoute('/products/[slug]');

const productId = computed(() => Number(route.params.slug.split('-').pop()));

const product = toRef(productState, 'product');

onMounted(() => fetchProduct(productId.value));

onUnmounted(() => (productState.product = null));
</script>

<template>
  <main class="space-y-4 py-3 lg:py-5">
    <BaseLoader v-if="productState.isLoading" class="mx-auto my-6" />

    <template v-if="product">
      <div class="flex flex-wrap items-center gap-3">
        <RouterLink v-slot="{ href, navigate }" to="/" custom>
          <BaseLink :href="href" variant="primary" class="inline-flex h-auto py-2 pl-3 pr-4" @click="navigate">
            <IconArrowLeft />
            <span class="ml-1.5">Go Back</span>
          </BaseLink>
        </RouterLink>

        <h1 class="text-xl font-semibold">{{ product.title }}</h1>
      </div>

      <p class="prose max-w-none">
        {{ product.description }}
      </p>

      <ul class="space-y-1.5">
        <li>
          Category: <span class="font-medium capitalize">{{ product.category }}</span>
        </li>
        <li>
          Brand: <span class="font-medium capitalize">{{ product.brand }}</span>
        </li>
        <li>
          Discount: <span class="font-medium">{{ product.discountPercentage }}%</span>
        </li>
        <li>
          Price: <span class="font-medium">${{ product.price }}</span>
        </li>
        <li>
          Rating: <span class="font-medium">{{ product.rating }}</span>
        </li>
        <li>
          Stock: <span class="font-medium">{{ product.stock }}</span>
        </li>
      </ul>

      <div class="flex flex-wrap items-start gap-3">
        <img v-for="(image, imageIndex) in product.images" :key="imageIndex" :src="image" alt="" class="rounded-lg" />
      </div>
    </template>
  </main>
</template>
