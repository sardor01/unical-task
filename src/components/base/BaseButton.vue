<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    class?: string | (string | undefined)[];
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    type: 'button',
  },
);

const className = computed(() => props.class);

const buttonVariant = computed<string>(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:enabled:bg-primary/80 focus-visible:ring-primary/50';
    case 'secondary':
      return 'bg-secondary text-white hover:enabled:bg-secondary/80 focus-visible:ring-secondary/50';
    default:
      return '';
  }
});
</script>

<template>
  <button
    :type="type"
    :class="
      twMerge(
        'flex h-10 items-center justify-center rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring disabled:cursor-not-allowed disabled:opacity-75 aria-loading:cursor-progress',
        buttonVariant,
        className,
      )
    "
    :disabled="disabled || loading"
    :aria-loading="loading"
  >
    <slot />
  </button>
</template>
