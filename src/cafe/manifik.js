export const cafe = {
  food: {
    salad: "Салат",
    sup: "Суп",
    dish: "Горячее",
  },

  menu: [
    {
      combo: ["salad"],
      price: 130,
    },
    {
      combo: ["sup"],
      price: 130,
    },
    {
      combo: ["dish"],
      price: 200,
    },
    {
      combo: ["salad", "sup"],
      price: 250,
    },
    {
      combo: ["salad", "dish"],
      price: 280,
    },
    {
      combo: ["sup", "dish"],
      price: 280,
    },
    {
      combo: ["salad", "sup", "dish"],
      price: 350,
    },
  ],

  getPrice() {
    return this.menu.map((v) => {
      return {
        id: this.getIdCombo(v.combo),
        ...v,
      };
    });
  },

  getIdCombo(arr) {
    return arr.join("_");
  },

  textMenu() {
    const cafePriceMenu = this.menu
      .map((v) => {
        let str = "";
        str += v.combo.reduce((acc, v, i) => {
          if (i > 0) acc += "+ ";
          acc += `${cafeMenu[v]} `;
          return acc;
        }, "");
        str += `= ***${v.price}***р`;
        return str;
      })
      .join("\n");

    return cafePriceMenu;
  },
};
