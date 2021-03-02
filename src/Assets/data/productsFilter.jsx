import { allProductsList } from "./allProductsList";
const colors = [...new Set(allProductsList.map((item) => item.color))];
const styles = [...new Set(allProductsList.map((item) => item.style))];
export const productsFilter = [
  {
    label: "Category",
    categories: ["All", "Notebooks", "Cards", "Calendars"],
  },
  {
    label: "Color",
    categories: ["All", ...colors],
  },
  {
    label: "Style",
    categories: ["All", ...styles],
  },
];

export const sortProducts = [
  "Latest Products",
  "Price Low to High",
  "Price High to Low",
];
