<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component :is="Component"></component>
        <template #fallback>Loading...</template>
      </Suspense>
    </template>
  </RouterView>
</template>

<style>
a:focus-visible {
  outline-style: dashed;
}
</style>
