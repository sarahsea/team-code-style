/* eslint-disable @typescript-eslint/no-unused-vars */
// 사용 안하는 변수 린트 에러 빨간줄 표시 제거 - 확인 용이하게 하기 위해

// // ❌ '@typescript-eslint/ban-ts-comment'
// /** @ts-ignore */
// const badComment = 1;

// // ❌ '@typescript-eslint/no-array-constructor'
// const arr1 = new Array(5); // ❌
// const arr2: number[] = []; // ✅

// // ❌ '@typescript-eslint/no-duplicate-enum-values'
// enum Status {
//   SUCCESS = 1,
//   OK = 1, // ❌
// }

// // ❌ '@typescript-eslint/no-empty-object-type'
// type Empty = {};
// type WithProps = { id: string };

// // ❌ '@typescript-eslint/no-explicit-any'
// const anything: any = 'danger'; // ❌

// // ❌ '@typescript-eslint/no-extra-non-null-assertion'
// type Obj = { prop?: { name: string } };
// const val: Obj = {};
// val.prop!.name; // ❌

// // ❌ '@typescript-eslint/no-misused-new'
// interface A {
//   new (): A; // ❌ interface에 new 선언 시 잘못된 사용
//   foo(): void;
// }

// // ❌ '@typescript-eslint/no-namespace'
// namespace Foo {
//   // ❌
//   export const bar = 1;
// }

// // ❌ '@typescript-eslint/no-non-null-asserted-optional-chain'
// type Maybe = { a?: { b: string } };
// const m: Maybe = {};
// console.log(m.a?.b!); // ❌

// // ❌ '@typescript-eslint/no-require-imports'
// import path from 'path'; // ✅

// const fs = require('fs'); // ❌

// // ❌ '@typescript-eslint/no-this-alias'
// function example() {
//   const self = this; // ❌
// }

// // ❌ '@typescript-eslint/no-unnecessary-type-constraint'
// function identity<T extends unknown>(val: T): T {
//   // ❌
//   return val;
// }

// // ❌ '@typescript-eslint/no-unsafe-declaration-merging'
// interface UnsafeMerge {
//   x: number;
// }
// declare namespace UnsafeMerge {
//   // ❌
//   const y: number;
// }

// // ❌ '@typescript-eslint/no-unsafe-function-type'
// type MyFunc = (...args: any[]) => any; // ❌

// const goodFunc = (x: number): string => String(x); // ✅

// // ❌ '@typescript-eslint/no-unused-expressions'
// true; // ❌ (의미 없는 표현식)
// ('hello'); // ❌
// const valid = () => true; // ✅

// // ❌ '@typescript-eslint/no-unused-vars'
// const unusedVar = 42; // ❌
// const usedVar = 99;
// console.log(usedVar); // ✅

// // ❌ '@typescript-eslint/no-wrapper-object-types'
// const badStr: string = new String('hi'); // ❌
// const badNum: number = new Number(1); // ❌
// const goodStr: string = 'hi'; // ✅

// // ❌ '@typescript-eslint/prefer-as-const'
// const direction = 'left'; // ❌
// const fixedDirection = 'right' as const; // ✅

// // ❌ '@typescript-eslint/prefer-namespace-keyword'
// declare module 'foo' {
//   // ❌
//   export const x: number;
// }
// // 위는 namespace 사용 권장됨

// // ❌ '@typescript-eslint/triple-slash-reference'
// /// <reference path="./some-file.ts" /> // ❌
// ❌ ban-ts-comment
// @ts-ignore
const IGNORED = 123;

// ❌ no-explicit-any (경고)
const val: any = 'hello';

// ✅ good types
const count: number = 5;

// ❌ no-inferrable-types (경고) — recommended에 포함됨
const age: number = 30; // 타입 추론 가능한데 명시함

// ✅ allowed inference
const name = 'sarah';

// ❌ no-misused-new
interface Bad {
  new (): Bad; // ❌ interface에 new 쓰면 잘못된 타입 사용
}

// ✅ class에서는 new 사용 가능
class Good {
  constructor() {}
}

// ❌ no-var-requires
import path from 'path';

const fs = require('fs'); // CommonJS require 금지

// ✅ import 사용

// ❌ no-unused-vars
const unused = 123; // 사용되지 않음
const _ignoredParam = 'x'; // ✅ 언더스코어로 시작한 파라미터는 무시

// ✅ used var
const used = 'active';
console.log(used);

// ❌ no-non-null-asserted-optional-chain (명시적 설정 X지만 recommended에 포함될 수 있음)
type Maybe = { a?: { b: string } };
const m: Maybe = {};
console.log(m.a?.b!);

//  prefer-const (warn)
// let city = 'seoul'; // ❌ 재할당 안 하면 const 써야 함

// ❌ 함수 타입 변수 camelCase, PascalCase만 허용
const my_component = () => null; // ❌
const myComponent = () => null; // ✅ PascalCase 컴포넌트
const MyComponent = () => null; // ✅

function doWork(): void {} // ✅ camelCase function

// ✅ const 변수는 UPPER_CASE, camelCase, PascalCase 만 허용
const pi = 3.14;
const PI = 3.14;
