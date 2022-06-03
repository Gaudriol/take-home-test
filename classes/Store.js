export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }
  updateDiscounts() {
    return this.discountOffers.map(offer => {
      offer.updateDiscount();
      return offer;
    });
  }
}
