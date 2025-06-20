import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

/* eslint "@tanstack/query/exhaustive-deps": "error" */

export const MyComponent = () => {
  const [todoId, setTodoId] = useState(undefined);
  useQuery({
    queryKey: ['todo'],
    queryFn: () => api.getTodo(todoId),
  });

  const todoQueries = {
    detail: (id) => ({ queryKey: ['todo'], queryFn: () => api.getTodo(id) }),
  };

  return <div>test</div>;
};
