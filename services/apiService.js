let token = '';

export const setToken = (newToken) => {
  token = newToken;
};

const getHeaders = () => {
  return token ? { Authorization: token } : {};
};

const getBaseUrl = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.apiUrl;
}

export const apiService = {
  get: async (url, params = {}) => {
    try {
      const data = await $fetch(`${getBaseUrl()}${url}`, {
        method: 'GET',
        params,
        headers: getHeaders(),
      });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  post: async (url, body) => {
    try {
      const data = await $fetch(`${getBaseUrl()}${url}`, {
        method: 'POST',
        body,
        headers: getHeaders(),
        onResponse(context) {
          const token = context.response.headers.get('authorization');
          if (token) {
            setToken(token);
          }
        }
      });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  put: async (url, body) => {
    try {
      const data = await $fetch(`${getBaseUrl()}${url}`, {
        method: 'PUT',
        body,
        headers: getHeaders(),
      });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  delete: async (url) => {
    try {
      const data = await $fetch(`${getBaseUrl()}${url}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
