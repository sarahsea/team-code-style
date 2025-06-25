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
