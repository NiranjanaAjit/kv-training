// import FizzBuzz from "./build/src/test/utils/fizzBuzz.util";

import FizzBuzz from "../../src/utils/fizzBuzz";

describe("fizzBuzz test", () => {
let fizzBuzz:FizzBuzz;
beforeEach(() => {
  fizzBuzz =  new FizzBuzz();
});
   
  it('should return "Fizz" for numbers divisible by 3', () => {

    expect(fizzBuzz.fizzBuzz(3)).toBe("Fizz");
    expect(fizzBuzz.fizzBuzz(6)).toBe("Fizz");
  });
  it('should return "Buzz" for numbers divisible by 5', () => {

    expect(fizzBuzz.fizzBuzz(5)).toBe("Buzz");
    expect(fizzBuzz.fizzBuzz(10)).toBe("Buzz");
  });
  it('should return "FizzBuzz" for numbers divisible by 15', () => {

    expect(fizzBuzz.fizzBuzz(15)).toBe("FizzBuzz");
    expect(fizzBuzz.fizzBuzz(30)).toBe("FizzBuzz");
  });

  // it('using mocks', () => {
  //   let mockFn = jest.fn(fizzBuzz.divisibileByThree).mockReturnValue(true);
  //   fizzBuzz.divisibileByThree = mockFn;
  //   expect(fizzBuzz.fizzBuzz(4)).toBe('Fizz');
  //   expect(mockFn).toHaveBeenCalledTimes(2);
  // });

  // it('using spy', () => {
  //   const spy = jest.spyOn(fizzBuzz, 'divisibileByThree')
  //   expect(fizzBuzz.fizzBuzz(4));
  //   expect(spy).toHaveBeenCalledTimes(2);
  //   spy.mockRestore();
  // })

});
