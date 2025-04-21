import useSWR from 'swr';
import axios from 'axios';
import { constant } from '../constants/constant';

const fetcherWithToken = async (url: string) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data?.data?.quests || [];
};

export default function useSponsored() {
  const shouldFetch = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `${constant.BASE_URL}/v1/quest?type=sponsored` : null,
    fetcherWithToken,
    {
      revalidateOnFocus: false, // optional: disables re-fetching on window focus
      dedupingInterval: 30000, // optional: only fetch once every 30s if key is the same
    }
  );

  return {
    quests: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
