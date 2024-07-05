export default class FizzBuzz {
    public fizzBuzz(num: number) {
      if (this.divisibileByThree(num) && num % 5 == 0) {
        return "FizzBuzz";
      } else if (num % 5 == 0) {
        return "Buzz";
      } else if (num % 3 == 0) {
        return "Fizz";
      }
      return num;
    };
    divisibileByThree(num:number) {
      return num%3 ==  0;
    }
  }
  
const fizzBuzz = new FizzBuzz();
  for (let i = 0; i < 20; i++) {
    console.log(fizzBuzz.fizzBuzz(i));
  }
  