/* eslint "@tanstack/query/stable-query-client": "error" */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { Home } from './Home';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Home /> */}
      <div>hey</div>
    </QueryClientProvider>
  );
};

export default App;
