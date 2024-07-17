import { useRuntimeConfig } from "nuxt/app";

export const loginRequest = async (email, password) => {
  const runtimeConfig = useRuntimeConfig()

  console.log(runtimeConfig)
  try {
    const { data, error } = await useFetch(`${runtimeConfig.public.apiUrl}/api/auth/login`, {
      method: 'POST',
      body: { user: { email, password } },
    });

    if (error.value) {
      throw new Error(error.value);
    }

    console.log(data);
  } catch (error) {
    console.error('Login request failed', error);
    throw error;
  }
};
