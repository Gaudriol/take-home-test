import { Store, DiscountOffer } from "./store";

describe("Store", () => {
  it("should decrease the discount and expiresIn after update", () => {
    expect(
      new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", 1, 2)]);
  });

  it("should decrease fast discounts twice as fast", () => {});

  it("should not change permanent discount after update", () => {});

  it("should increase continuous discount after update", () => {});

  it("should not be able to create a partner with above 50 discount", () => {});

  it("should not increase a discount above 50", () => {});

  describe("When expiration date has passed,", () => {
    it("should decrease the discount twice as fast for regular discounts", () => {});

    it("should reduce discount to zero for incremental discounts", () => {});
  });
});
