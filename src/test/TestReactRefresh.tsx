// // ✅ 허용되는 방식 (top-level export)
// export const ValidComponent = () => {
//   return <div>Hello Refresh</div>;
// };

// // ❌ 비추천 방식 (조건문 안에서 export)
// const isDev = true;
// if (isDev) {
//   // eslint-plugin-react-refresh: only-export-components 오류 발생해야 함
//   export const InvalidComponent = () => {
//     return <div>Invalid Export</div>;
//   };
// }

// // ❌ default export도 경고
// export default function DefaultExportedComponent() {
//   return <div>Default export is discouraged</div>;
// }

// fail
export const foo = () => {};
export const Bar = () => <></>;

export default function () {}
export default compose()(MainComponent);

export * from './foo';
const Tab = () => {};

export const tabs = [<Tab />, <Tab />];

const App = () => {};

createRoot(document.getElementById('root')).render(<App />);

// success
// export default function Foo() {
//   return <></>;
// }
// const foo = () => {};
// export const Bar = () => <></>;
// import { App } from './App';
// createRoot(document.getElementById('root')).render(<App />);
