import useSWR from 'swr';
import axios from 'axios';

type UseFetchOptions<T> = {
  revalidateOnFocus?: boolean;
  dedupingInterval?: number;
  enabled?: boolean;
  selector?: (res: unknown) => T;
};

const fetcherWithToken = async <T>(
  url: string,
  selector?: (res: unknown) => T
): Promise<T> => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // use selector if provided, otherwise return whole response
  console.log('fetching ', response);
  return selector ? selector(response.data) : (response.data as T);
};

export default function useFetchWithToken<T>(
  url: string | null,
  options?: UseFetchOptions<T>
) {
  const {
    revalidateOnFocus = false,
    dedupingInterval = 30000,
    enabled = true,
    selector,
  } = options || {};

  const shouldFetch =
    typeof window !== 'undefined' &&
    !!localStorage.getItem('accessToken') &&
    enabled &&
    !!url;

  const { data, error, isLoading, mutate } = useSWR<T>(
    shouldFetch ? url : null,
    (url) => fetcherWithToken<T>(url, selector),
    {
      revalidateOnFocus,
      dedupingInterval,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}
