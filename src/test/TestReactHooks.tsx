import { useEffect, useState } from 'react';

export const HookTest = () => {
  const [count, setCount] = useState(0);

  // ❌ [rules-of-hooks] 조건문 안에서 Hook 사용
  if (count > 0) {
    useEffect(() => {
      console.log('조건문 안에서 Hook 사용');
    }, []);
  }

  // ❌ [exhaustive-deps] 의존성 배열 누락
  const handle = () => {
    console.log(count); // count 사용하지만 의존성에 없음
  };

  useEffect(() => {
    handle();
  }, []); // count 빠짐

  return <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>;
};
