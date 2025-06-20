// ❌ 에러: 매직 넘버 사용
function addTax(price: number) {
  return price * 1.1; // error (1.1은 매직 넘버)
}

// ❌ 에러: 리터럴 배열
const primes = [2, 3, 5]; // error (2, 3, 5)

function isFirst(arr: string[]) {
  return arr[0] === 'x'; // ✅ 허용됨 (ignoreArrayIndexes: true)
}

// ❌ 에러: const 선언 누락
const PI = 3.14; // error (enforceConst: true)

const allowed = [0, 1, -1];

// ✅ 허용: 허용된 숫자 리터럴
const first = allowed[0]; // ok

// ✅ 허용: enum 값은 무시됨
enum Direction {
  UP = 1,
  DOWN = -1,
}

// ✅ 허용: default parameter
function repeat(str: string, times = 3) {
  return str.repeat(times); // ok
}

// ❌ 에러: 객체 속성 내부의 리터럴 (detectObjects: false이면 허용됨)
const config = {
  limit: 100, // error if detectObjects: true
};
