/* eslint-disable @typescript-eslint/no-unused-vars */
// 사용 안하는 변수 린트 에러 빨간줄 표시 제거 - 확인 용이하게 하기 위해

function myFunc1() {
  // console.log('hey2');
  return 'hey1';
}

/**
 *
 *
 */
function myFunc2() {
  // console.log('hey2');
  return 'hey2';
}

/**
 *
 * @returns string description
 */
function myFunc3() {
  // console.log('hey2');
  return 'hey2';
}

const TestJsdoc = () => {
  /**
   *
   *
   */
  const handleClick = () => {
    // console.log('clicked');
    return 'clicked';
  };

  return (
    <div>
      <button onClick={handleClick} />
    </div>
  );
};

export default TestJsdoc;
