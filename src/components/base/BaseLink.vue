<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
  href?: string;
  variant?: 'primary' | 'secondary';
  class?: string | string[];
}>();

const className = computed(() => props.class);

const buttonVariant = computed<string>(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary/80 focus-visible:ring-primary/50';
    case 'secondary':
      return 'bg-secondary text-white hover:bg-secondary/80 focus-visible:ring-secondary/50';
    default:
      return '';
  }
});
</script>

<template>
  <a
    :href="href"
    :class="
      twMerge(
        'flex h-10 items-center justify-center rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4',
        buttonVariant,
        className,
      )
    "
  >
    <slot />
  </a>
</template>
