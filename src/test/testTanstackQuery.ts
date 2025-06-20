/* eslint "@tanstack/query/no-rest-destructuring": "warn" */

import { useQuery } from '@tanstack/react-query';

const getTodos = async () =>
  fetch('https://jsonplaceholder.typicode.com/todos');

const useTodos = () => {
  const { data: todos, ...rest } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  });
  return { todos, ...rest };
};

export { useTodos };
