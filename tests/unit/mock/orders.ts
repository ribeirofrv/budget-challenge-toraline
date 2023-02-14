export const orderBodys = {
  ofTwoProducts: {
    userId: 1,
    products: [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 2,
        quantity: 1,
      },
    ],
  },
  ofOneProdcut: {
    userId: 55,
    products: [
      {
        id: 7,
        quantity: 3,
      },
    ],
  },
  ofNoProducts: {
    userId: 78,
    products: [],
  },
};

export const orderResults = {
  ofTwoProducts: {
    budget: '7410.20', // userId: 1
  },
  ofOneProdcut: {
    budget: '6330.24', // userId: 55
  },
  ofNoProducts: {
    budget: '0.00', // userId: 78
  },
};
