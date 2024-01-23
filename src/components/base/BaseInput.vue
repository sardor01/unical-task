<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  id: string;
  modelValue: any;
  label: string;
  placeholder?: string;
  type?: InputTypeHTMLAttribute;
  required?: boolean;
  wrapperClass?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: any];
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <div :class="wrapperClass">
    <label :for="id" class="mb-1 block text-sm font-medium leading-6">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="block w-full rounded-lg border-0 px-3 py-2 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-light"
    />
  </div>
</template>
