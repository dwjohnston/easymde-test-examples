import '@testing-library/jest-dom';


// Fix for JSDOM as JSDOM does not have this API
// https://github.com/jsdom/jsdom/issues/3002
document.createRange = () => {
    const range = new Range();
  
    range.getBoundingClientRect = () => {};
  
    range.getClientRects = () => {
      return {
        item: () => null,
        length: 0,
        [Symbol.iterator]: () => {}
      };
    };
  
    return range;
  }