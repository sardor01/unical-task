<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    class?: string | string[];
  }>(),
  {
    type: 'button',
    variant: 'primary',
  },
);

const className = computed(() => props.class);

const buttonVariant = computed<string>(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary/80 focus-visible:ring-primary/50';
    case 'secondary':
      return 'bg-secondary text-white hover:bg-secondary/80 focus-visible:ring-secondary/50';
  }
});
</script>

<template>
  <button
    :type="type"
    :class="
      twMerge(
        'rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4',
        buttonVariant,
        className,
      )
    "
  >
    <slot />
  </button>
</template>
