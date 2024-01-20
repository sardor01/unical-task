<script setup lang="ts">
const formFields = reactive({
  email: '',
  password: '',
});

const onSubmit = () => {
  // TODO: login with credentials
};
</script>

<template>
  <main class="py-6 lg:py-8">
    <div class="rounded-lg bg-white p-4 shadow sm:mx-auto sm:w-full sm:max-w-md sm:p-6 sm:pb-10">
      <h1 class="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h1>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <BaseInput
          id="email"
          v-model="formFields.email"
          label="Email address"
          type="email"
          autocomplete="email"
          required
        />
        <BaseInput
          id="password"
          v-model="formFields.password"
          label="Password"
          type="password"
          autocomplete="current-password"
          required
        />
        <div class="pt-2">
          <BaseButton type="submit" class="w-full font-semibold">Sign in</BaseButton>
        </div>
      </form>
    </div>
  </main>
</template>
