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
    const { data, error } = await useFetch(`${getBaseUrl()}${url}`, {
      method: 'GET',
      params,
      headers: getHeaders(),
    });

    return { data, error };
  },
  post: async (url, body) => {
    const { data, error } = await useFetch(`${getBaseUrl()}${url}`, {
      method: 'POST',
      body,
      headers: getHeaders(),
      onResponse(context) {
        setToken(context.response.headers.get('authorization'))
      }
    });

    return { data, error };
  },
  put: async (url, body) => {
    const { data, error } = await useFetch(`${getBaseUrl()}${url}`, {
      method: 'PUT',
      body,
      headers: getHeaders(),
    });

    return { data, error };
  },
  delete: async (url) => {
    const { data, error } = await useFetch(`${getBaseUrl()}${url}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    return { data, error };
  },
};
