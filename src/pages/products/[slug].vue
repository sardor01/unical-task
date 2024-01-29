<script setup lang="ts">
import { fetchProduct, productState } from '~/stores/product';
import { LocalCartManager } from '~/api/cart';
import IconMinus from '~icons/mdi/minus';
import IconPlus from '~icons/mdi/plus';
import { formatPrice } from '~/utils';

const route = useRoute('/products/[slug]');

const productId = computed(() => Number(route.params.slug.split('-').pop()));

const product = toRef(productState, 'product');

const currentImage = ref(0);

const productCount = ref(LocalCartManager.getLocalCart().find((i) => i.id === productId.value)?.quantity || 0);

watch(productCount, (quantity) => {
  LocalCartManager.setLocalCart({ id: productId.value, quantity });
});

onMounted(() => fetchProduct(productId.value));

onUnmounted(() => (productState.product = null));
</script>

<template>
  <main class="mx-auto max-w-6xl space-y-4 py-6 lg:py-8">
    <BaseLoader v-if="productState.isLoading" class="mx-auto my-6" />

    <template v-if="product">
      <BaseBreadcrumb
        :items="[
          {
            id: 'home',
            title: 'Home',
            to: '/',
          },
          {
            id: product.slug,
            title: product.title,
            to: `/products/${product.slug}`,
          },
        ]"
      />
      <div class="grid items-start gap-4 lg:grid-cols-2 lg:gap-8">
        <div class="grid items-start gap-3 lg:grid-cols-5">
          <div class="hidden flex-col items-start gap-3 lg:flex">
            <button
              v-for="(image, imageIndex) in product.images"
              :key="imageIndex"
              class="overflow-hidden rounded-lg border transition-colors hover:border-gray-900 aria-selected:border-gray-900"
              :aria-selected="imageIndex === currentImage"
              @click="currentImage = imageIndex"
            >
              <img :src="image" alt="Preview thumbnail" width="100" height="120" class="aspect-[5/6] object-cover" />
              <span class="sr-only">View Image {{ imageIndex + 1 }}</span>
            </button>
          </div>
          <div class="lg:col-span-4">
            <img
              :src="product.images[currentImage]"
              alt="Product Image"
              width="600"
              height="900"
              class="mx-auto aspect-[2/3] max-h-[600px] overflow-hidden rounded-lg border border-gray-100 object-cover"
            />
          </div>
        </div>
        <div class="grid items-start gap-4">
          <h1 class="text-3xl font-bold lg:text-4xl">{{ product.title }}</h1>

          <div class="text-sm capitalize text-gray-600">
            <span class="font-semibold">Brand:</span> {{ product.brand }}
          </div>

          <div class="text-sm capitalize text-gray-600">
            <span class="font-semibold">Category:</span> {{ product.category }}
          </div>

          <div class="text-sm text-gray-600">
            <span class="font-semibold">Availability:</span> {{ product.stock }} left
          </div>

          <div>
            <p>{{ product.description }}</p>
          </div>

          <BaseRating :value="product.rating" />

          <div class="space-y-1">
            <div>
              <span class="mr-2 text-4xl font-semibold">${{ formatPrice(product.price) }}</span>
              <span class="text-gray-400 line-through"
                >${{ formatPrice((product.price * (100 + product.discountPercentage)) / 100) }}
              </span>
            </div>
            <div class="text-sm text-gray-400">You save {{ product.discountPercentage }}%</div>
          </div>

          <div v-if="productCount" class="flex flex-wrap items-center gap-1.5">
            <BaseButton variant="primary" :disabled="productCount < 0" class="h-10 w-10 p-0" @click="productCount--">
              <IconMinus class="text-xl" />
            </BaseButton>
            <input
              v-model="productCount"
              type="number"
              :min="0"
              :max="product.stock"
              class="h-10 w-24 rounded-lg focus:border-primary focus:ring-primary"
            />
            <BaseButton
              variant="primary"
              :disabled="productCount >= product.stock"
              class="h-10 w-10 p-0"
              @click="productCount++"
            >
              <IconPlus class="text-xl" />
            </BaseButton>
          </div>

          <BaseButton v-else variant="primary" class="h-12 w-full text-base" @click="productCount++">
            Add to cart
          </BaseButton>
        </div>
      </div>
    </template>
  </main>
</template>
