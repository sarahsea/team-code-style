/* eslint-disable @typescript-eslint/no-unused-vars */
// 사용 안하는 변수 린트 에러 빨간줄 표시 제거 - 확인 용이하게 하기 위해
// import React from 'react';

import { useCallback } from 'react';

// ✅ PascalCase 컴포넌트
export const UserCard = () => {
  //  ❌ 고정값 변수 -> UPPER_CASE
  const userId = 'abc123';
  // ✅ UPPER_CASE 상수
  const USER_ID = 'abc123';

  // 재할당 되지 않는 상수
  const MyVariable = 1;
  // ✅ UPPER_CASE 상수
  const MY_VARIABLE = 0;

  // ❌ 변수 camelCase 아님
  const valid_roles = ['admin', 'user'];

  // ✅ camelCase const
  const validRoles = ['admin', 'user'];

  // ✅ boolean + prefix
  const isActive = true;

  // ❌ PascalCase 변수
  let MyVar = 'wrong';
  MyVar = 'correct';

  // ✅ camelCase 변수
  let myVar = 'correct';
  myVar = 'stillCorrect';

  // ❌  뒤에 붙는 Underscore 금지
  const func_ = function () {
    return '1234';
  };
  const var_ = useCallback(() => ({}), []);

  // ✅ camelCase + 정상 이름
  const userName = () => null;

  // ✅ camelCase 매개변수
  function greetUser(userName: string) {
    return `Hello, ${userName}`;
  }

  // ❌ 잘못된 PascalCase 매개변수
  function greetWrong(UserName: string) {
    return `Hi, ${UserName}`;
  }

  // ✅ type + PascalCase
  type UserInfo = {
    id: string;
    isMember: boolean;
  };

  // ❌ property에 어떤 포맷이든 허용
  const apiResponse = {
    user_id: '1234',
    userName: 'Sarah',
    IS_ACTIVE: true,
  };

  const MY_NUMBER = 123;

  const TEST = '123';

  return (
    <div>
      <p>ID: {userId}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
    </div>
  );
};
