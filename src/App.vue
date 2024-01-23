<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component :is="Component"></component>
        <template #fallback>
          <div class="flex min-h-screen items-center justify-center">
            <BaseLoader />
          </div>
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<style>
a:focus-visible {
  outline-style: dashed;
}
</style>
