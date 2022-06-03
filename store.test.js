import {
  Store,
  DiscountOffer,
  PermanentOffer,
  IncrementalOffer
} from "./classes";

describe("Store", () => {
  it("should decrease the discount and expiresIn after update", () => {
    expect(
      new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", 1, 2)]);
  });

  it("should not raise discount above 50", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 2, 50, 1)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", 1, 50, 1)]);
  });

  it("should not cut discount under zero", () => {
    expect(
      new Store([new DiscountOffer("Velib", -5, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Velib", -6, 0)]);
  });

  it("should change discounts by adding the dailyDiscountChange value", () => {
    expect(
      new Store([new DiscountOffer("BlackMarket", 2, 4, -2)]).updateDiscounts()
    ).toEqual([new DiscountOffer("BlackMarket", 1, 2, -2)]);
  });

  it("should not change permanent discount after update", () => {
    expect(
      new Store([new PermanentOffer("Ilek", 2, 4)]).updateDiscounts()
    ).toEqual([new PermanentOffer("Ilek", 2, 4)]);
  });

  describe("After expiration", () => {
    it("should decrease the regular discount twice as fast", () => {
      expect(
        new Store([new DiscountOffer("Velib", 0, 10)]).updateDiscounts()
      ).toEqual([new DiscountOffer("Velib", -1, 8)]);
    });

    it("should decrease discount with custom dailyDiscountChange twice as fast", () => {
      expect(
        new Store([
          new DiscountOffer("BlackMarket", 0, 10, -4)
        ]).updateDiscounts()
      ).toEqual([new DiscountOffer("BlackMarket", -1, 2, -4)]);
    });
  });

  describe("Incremental Discount", () => {
    it("should increase incremental discount after update", () => {
      expect(
        new Store([new IncrementalOffer("Vinted", 11, 20, 1)]).updateDiscounts()
      ).toEqual([new IncrementalOffer("Vinted", 10, 21, 1)]);
    });

    it("should increase by 2 after 10 days left", () => {
      expect(
        new Store([new IncrementalOffer("Vinted", 10, 20, 1)]).updateDiscounts()
      ).toEqual([new IncrementalOffer("Vinted", 9, 22, 1)]);
    });

    it("should increase by 3 after 5 days left", () => {
      expect(
        new Store([new IncrementalOffer("Vinted", 5, 20, 1)]).updateDiscounts()
      ).toEqual([new IncrementalOffer("Vinted", 4, 23, 1)]);
    });

    it("should drop to zero at expiration", () => {
      expect(
        new Store([new IncrementalOffer("Vinted", 0, 20, 1)]).updateDiscounts()
      ).toEqual([new IncrementalOffer("Vinted", -1, 0, 1)]);
    });
  });
});
