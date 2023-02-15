export const orderBodys = {
  ofTwoProducts: {
    userId: 1,
    products: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
  },
  ofOneProdcut: {
    userId: 55,
    products: [
      {
        id: 7,
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
    userId: 1,
    products: [
      {
        name: 'explicabo alias hic reprehenderit deleniti quos id reprehenderit consequuntur ipsam iure voluptatem ea culpa excepturi ducimus repudiandae ab',
        price: 6945,
        tax: '79%',
        total: 12431.55,
      },
      {
        name: 'nostrum veritatis reprehenderit repellendus vel numquam soluta ex inventore ex',
        price: 2435,
        tax: '79%',
        total: 4358.65,
      },
    ],
    finalPrice: 16790.2,
  },
  ofOneProdcut: {
    userId: 55,
    products: [
      {
        name: 'doloremque beatae vitae nam est reiciendis a ut veritatis animi a laudantium ab reiciendis veniam dolores consectetur asperiores in',
        price: 5024,
        tax: '42%',
        total: 7134.08,
      },
    ],
    finalPrice: 7134.08,
  },
  ofNoProducts: {
    message: 'products is required',
  },
};
