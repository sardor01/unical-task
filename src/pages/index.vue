<script setup lang="ts">
import { fetchProductCategories, fetchProducts, productState, resetPagination } from '~/stores/product';

const route = useRoute();

const router = useRouter();

const pagination = toRef(productState, 'pagination');

const selectedCategory = ref<string | undefined>(route.query.category ? String(route.query.category) : undefined);

watch(selectedCategory, (category) => {
  resetPagination();
  fetchProducts({
    limit: pagination.value.perPage,
    skip: (pagination.value.currentPage - 1) * pagination.value.perPage,
    category,
  });
  router.push({ ...route.query, query: { category } });
});

const paginationClickHandler = (pageNum: number) => {
  fetchProducts({
    limit: pagination.value.perPage,
    skip: (pageNum - 1) * pagination.value.perPage,
    category: selectedCategory.value,
  });
  router.push({ ...route.query, query: { page: pageNum } });
};

onMounted(async () => {
  if (route.query.page) {
    pagination.value.currentPage = Number(route.query.page);
  }

  await fetchProducts({
    limit: pagination.value.perPage,
    skip: (pagination.value.currentPage - 1) * pagination.value.perPage,
    category: selectedCategory.value,
  });
  await fetchProductCategories();
});
</script>

<template>
  <main class="py-6 lg:py-8">
    <div class="space-y-6">
      <h1 class="text-2xl font-bold tracking-tight md:text-3xl">Products</h1>

      <BaseLoader v-if="productState.isLoading" class="mx-auto my-6" />

      <div v-else class="flex gap-6">
        <div class="w-64 flex-shrink-0 space-y-3">
          <h3 class="font-medium">Select category:</h3>
          <ul class="space-y-2">
            <li v-for="(category, categoryIndex) in productState.categories" :key="categoryIndex">
              <label :for="category" class="inline-flex select-none items-center">
                <input
                  :id="category"
                  v-model="selectedCategory"
                  :value="category"
                  type="radio"
                  class="rounded border-gray-300 text-primary shadow-sm focus:border-primary-light focus:ring focus:ring-primary-light focus:ring-opacity-50 focus:ring-offset-0"
                />
                <span class="ml-2 capitalize">{{ category }}</span>
              </label>
            </li>
          </ul>
          <BaseButton
            v-if="selectedCategory"
            variant="secondary"
            class="h-auto px-5 py-1.5"
            @click="selectedCategory = undefined"
          >
            Clear
          </BaseButton>
        </div>

        <div class="flex-1">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <ProductCard v-for="product in productState.products" :key="product.id" :product="product" />
          </div>

          <BasePagination
            v-if="pagination.pageCount > 1"
            container-class="my-3 rounded py-3 px-6 bg-white flex flex-row flex-wrap items-center justify-center gap-2 text-sm md:gap-2.5"
            :value="pagination.currentPage"
            :page-count="pagination.pageCount"
            :click-handler="paginationClickHandler"
            page-class="rounded-lg first:ml-0 last:mr-0"
            prev-class="text-dark"
            next-class="text-dark"
            page-link-class="h-8 w-8 rounded-lg md:h-10 md:w-10"
            prev-link-class="h-8 px-2 rounded-lg md:h-10"
            next-link-class="h-8 px-2 rounded-lg md:h-10"
            active-class="bg-primary/10"
            disabled-class="pointer-events-none opacity-70"
          />
        </div>
      </div>
    </div>
  </main>
</template>
