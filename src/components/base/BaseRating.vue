<script setup lang="ts">
import IconStar from '~icons/custom/star';

const props = defineProps<{
  value: number;
}>();

const valueInPercent = computed(() => {
  if (props.value < 0) {
    return 0;
  }

  if (props.value > 5) {
    return 100;
  }

  return (props.value * 100) / 5;
});
</script>

<template>
  <div class="block">
    <div class="relative inline-flex">
      <IconStar
        v-for="n in 5"
        :key="n"
        class="fill-muted stroke-muted-foreground mx-0.5 inline-block h-5 w-5 first:ml-0 last:mr-0"
      />

      <span class="absolute -top-1 overflow-hidden whitespace-nowrap" :style="{ width: `${valueInPercent}%` }">
        <IconStar v-for="n in 5" :key="n" class="mx-0.5 inline-block h-5 w-5 fill-primary first:ml-0 last:mr-0" />
      </span>
    </div>
  </div>
</template>
