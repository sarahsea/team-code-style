// import React from 'react';

// ✅ PascalCase 컴포넌트
export const UserCard = () => {
  // ✅ camelCase 변수
  const userId = 'abc123';

  // ❌ UPPER_CASE 아님 (const + array)
  const valid_roles = ['admin', 'user'];

  // ✅ UPPER_CASE const
  const VALID_ROLES = ['admin', 'user'];

  // ✅ boolean + prefix
  const isActive = true;

  // ❌ boolean인데 접두사 없음
  const active = false;

  // ❌ PascalCase 변수 (일반 변수에는 허용 안됨)
  const MyVar = 'wrong';

  // ❌ 연속된 대문자 (금지된 형태)
  const myID = 'shouldFail';

  // ✅ camelCase + 정상 이름
  const userName = 'sarah';

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

  // ❌ property에 snake_case (API 응답 등에서 종종 생김)
  const apiResponse = {
    user_id: '1234', // ❌
    userName: 'Sarah', // ✅
  };

  return (
    <div>
      <p>ID: {userId}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
    </div>
  );
};
