<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router/auto';

interface Link {
  id: string;
  title: string;
  to: RouteLocationRaw;
}

defineProps<{ items: Link[] }>();
</script>

<template>
  <nav class="flex" aria-label="breadcrumb">
    <ul class="inline-flex flex-nowrap items-center gap-x-2 overflow-x-auto whitespace-nowrap px-1 py-2">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="inline-flex h-7 select-none items-center gap-x-2 text-sm font-medium"
      >
        <span v-if="index" class="leading-none">/</span>
        <RouterLink v-slot="{ href, navigate, isExactActive }" :to="item.to" custom>
          <BaseLink
            :href="href"
            :aria-current="isExactActive ? 'page' : undefined"
            class="p-1 aria-current-page:pointer-events-none"
            @click="navigate"
          >
            {{ item.title }}
          </BaseLink>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
