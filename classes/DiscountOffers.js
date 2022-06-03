export class DiscountOffer {
  constructor(
    partnerName,
    expiresIn,
    discountRateInPercent,
    dailyDiscountChange = -1
  ) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
    this.dailyDiscountChange = dailyDiscountChange;
  }

  getDiscountCoef() {
    let discountCoef = 1;
    if (this.expiresIn <= 0) {
      discountCoef *= 2;
    }
    return discountCoef;
  }

  updateDiscount() {
    const discountCoef = this.getDiscountCoef();
    this.discountInPercent += discountCoef * this.dailyDiscountChange;
    if (this.discountInPercent > 50) {
      this.discountInPercent = 50;
    }
    if (this.discountInPercent < 0) {
      this.discountInPercent = 0;
    }

    this.expiresIn -= 1;
  }

  toJSON() {
    return {
      partnerName: this.partnerName,
      expiresIn: this.expiresIn,
      discountInPercent: this.discountInPercent
    };
  }
}

export class PermanentOffer extends DiscountOffer {
  updateDiscount() {}
}

export class IncrementalOffer extends DiscountOffer {
  constructor(
    partnerName,
    expiresIn,
    discountRateInPercent,
    dailyDiscountChange = 1
  ) {
    super(partnerName, expiresIn, discountRateInPercent, dailyDiscountChange);
  }

  getDiscountCoef() {
    let discountCoef = 1;
    if (this.expiresIn <= 10) {
      discountCoef = 2;
    }
    if (this.expiresIn <= 5) {
      discountCoef = 3;
    }
    if (this.expiresIn <= 0) {
      this.resetDiscount();
      discountCoef = 0;
    }
    return discountCoef;
  }

  resetDiscount() {
    this.discountInPercent = 0;
  }
}

// reduit de 1 par jour X
// après expiration réduit 2x plus vite X
// peut pas changer à plus de 50 X
// new DiscountOffer("Velib", 20, 30),

// discount augmente chaque jour X
// apres expiration augmente 2x plus vite X
// new DiscountOffer("Naturalia", 10, 5, 1),

// réduit de 2 en dessous de 10 jours X
//        de 3 en dessous de 5 X
//        à 0 à l'expiration X
// new IncrementalOffer("Vinted", 5, 40, 1),

// ne réduit jamais de jour ou discount X
// new PermanentOffer("Ilek", 15, 40);

// new DiscountOffer("BlackMarket", 15, 40, -2);
