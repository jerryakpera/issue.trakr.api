import {
  add
} from "./utils"

describe("add()", () => {
  it("should return number", () => {
    //Testing a boolean
    //Another way to test a boolean
    expect(add(3, 5)).toEqual(8);
  });
});