<script setup lang="ts">
import { authStore, login } from '~/stores/auth';

definePage({
  meta: {
    auth: 'guest',
  },
});

const router = useRouter();

const formFields = reactive({
  username: 'rshawe2',
  password: 'OWsTbMUgFc',
});

const onSubmit = () => {
  login(formFields, () => {
    router.push('/');
  });
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
          id="username"
          v-model="formFields.username"
          label="Username"
          autocomplete="username"
          required
          :disabled="authStore.isLoading"
        />
        <BaseInput
          id="password"
          v-model="formFields.password"
          label="Password"
          type="password"
          autocomplete="current-password"
          required
          :disabled="authStore.isLoading"
        />
        <div class="pt-2">
          <BaseButton type="submit" variant="primary" :loading="authStore.isLoading" class="w-full font-semibold">
            Sign in
          </BaseButton>
        </div>
      </form>
    </div>
  </main>
</template>
