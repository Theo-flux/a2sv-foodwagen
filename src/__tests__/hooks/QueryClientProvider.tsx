/* eslint-disable react/display-name */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import foodServer from '@/requests';

export const QueryClientTest = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        queryFn: async ({ queryKey, meta }: any) => {
          if (meta && meta.path) {
            const response = await foodServer.get(meta.path, {
              params: meta.params
            });
            return response.data;
          }

          const [endpoint] = queryKey;
          const response = await foodServer.get(endpoint);
          return response.data;
        }
      }
    }
  });
};

const QueryClientTestProvider = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientTestProvider;
