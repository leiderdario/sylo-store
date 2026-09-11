export type ProductCategory =
  | "footwear"
  | "apparel"
  | "activewear"
  | "accessories"
  | "essentials";

export interface Product {
  id: number;
  name: string;
  price: number;
  listPrice: number | null;
  category: ProductCategory;
  catLabel: string;
  url: string;
  image: string;
  note?: string;
  span?: "feature" | "wide";
}

export const CATEGORY_PILLS: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Footwear", value: "footwear" },
  { label: "Apparel", value: "apparel" },
  { label: "Activewear", value: "activewear" },
  { label: "Accessories", value: "accessories" },
  { label: "Essentials", value: "essentials" },
];

export const PRODUCTS: Product[] = [
  {
    id: 0,
    name: "Ryka Women's Devotion X Walking Shoe",
    price: 81.57,
    listPrice: 124.99,
    category: "footwear",
    catLabel: "Footwear",
    url: "https://www.amazon.com/Ryka-Womens-Devotion-Walking-Shoe/dp/B0BR29YFLC",
    image:
      "https://m.media-amazon.com/images/I/81WmWkFTSLL._AC_UY480_FMwebp_QL65_.jpg",
    span: "feature",
  },
  {
    id: 1,
    name: "Under Armour Men's Tech Golf Polo",
    price: 39.99,
    listPrice: 45.0,
    category: "activewear",
    catLabel: "Activewear",
    url: "https://www.amazon.com/Under-Armour-Kelly-Green-Medium/dp/B0D16DWY1F",
    image:
      "https://m.media-amazon.com/images/I/51rzfS9FlOL._AC_UY480_FMwebp_QL65_.jpg",
    note: "Best seller",
    span: "wide",
  },
  {
    id: 2,
    name: "Nike Men's Park Short Sleeve T-Shirt",
    price: 26.03,
    listPrice: 30.0,
    category: "apparel",
    catLabel: "Apparel",
    url: "https://www.amazon.com/Nike-Short-Sleeve-Shirt-Medium/dp/B08WTCQ3L4",
    image:
      "https://m.media-amazon.com/images/I/511stkPNkLL._AC_UY480_FMwebp_QL65_.jpg",
  },
  {
    id: 3,
    name: "Calvin Klein Invisibles Triangle Bralette",
    price: 27.68,
    listPrice: 44.0,
    category: "essentials",
    catLabel: "Essentials",
    url: "https://www.amazon.com/Calvin-Klein-Invisibles-Triangle-Bralette/dp/B07P8G3LF6",
    image:
      "https://m.media-amazon.com/images/I/51mycV0MTLL._AC_UY480_FMwebp_QL65_.jpg",
  },
  {
    id: 4,
    name: "adidas School Creator Backpack",
    price: 38.97,
    listPrice: 45.0,
    category: "accessories",
    catLabel: "Accessories",
    url: "https://www.amazon.com/adidas-School-Creator-Backpack-Speckle/dp/B0B64J65L3",
    image:
      "https://m.media-amazon.com/images/I/81w0ynxKDqL._AC_UY480_FMwebp_QL65_.jpg",
    note: "Only 4 left",
  },
  {
    id: 5,
    name: "Champion Front-Zip High-Impact Sports Bra",
    price: 29.0,
    listPrice: 45.0,
    category: "activewear",
    catLabel: "Activewear",
    url: "https://www.amazon.com/Champion-Front-Zip-High-Impact-Breathable-Moisture/dp/B07DG3K1CF",
    image:
      "https://m.media-amazon.com/images/I/712J+a6dBpL._AC_UY480_FMwebp_QL65_.jpg",
    span: "wide",
  },
  {
    id: 6,
    name: "Jordan Baby Boy's Legend Crew 6-Pack Socks",
    price: 25.0,
    listPrice: null,
    category: "accessories",
    catLabel: "Accessories",
    url: "https://www.amazon.com/Jordan-Boys-6-Pk-Socks-5Y-7Y/dp/B08TVGW6YM",
    image:
      "https://m.media-amazon.com/images/I/51AuGpmDM1L._AC_UY480_FMwebp_QL65_.jpg",
    note: "$4.17 / pair",
  },
  {
    id: 7,
    name: "Under Armour Men's Freedom Tech Shorts",
    price: 27.99,
    listPrice: 33.0,
    category: "activewear",
    catLabel: "Activewear",
    url: "https://www.amazon.com/Under-Armour-Freedom-Shorts-X-Large/dp/B0D16GT4JL",
    image:
      "https://m.media-amazon.com/images/I/41deVWdQrSL._AC_UY480_FMwebp_QL65_.jpg",
  },
  {
    id: 8,
    name: "Polo Ralph Lauren Men's Crew Socks",
    price: 33.24,
    listPrice: null,
    category: "accessories",
    catLabel: "Accessories",
    url: "https://www.amazon.com/Polo-Ralph-Lauren-Socks-White/dp/B07ZHK2P1J",
    image:
      "https://m.media-amazon.com/images/I/61duHU4YQXL._AC_UY480_FMwebp_QL65_.jpg",
    note: "$5.54 / pair",
  },
  {
    id: 9,
    name: "Nike Jordan Jumpman Air Cap",
    price: 29.95,
    listPrice: null,
    category: "accessories",
    catLabel: "Accessories",
    url: "https://www.amazon.com/Boy%60s-Jordan-Jumpman-Black-9A0128-023/dp/B07NVZHSVR",
    image:
      "https://m.media-amazon.com/images/I/51iAzTInI-L._AC_UY480_FMwebp_QL65_.jpg",
  },
  {
    id: 10,
    name: "Maidenform Shaping Comfort Shapewear",
    price: 16.0,
    listPrice: 24.0,
    category: "essentials",
    catLabel: "Essentials",
    url: "https://www.amazon.com/Maidenform-womens-Shaping-Comfort-Shapewear/dp/B07F13WP3P",
    image:
      "https://m.media-amazon.com/images/I/71Ax9KAvLOL._AC_UY480_FMwebp_QL65_.jpg",
  },
  {
    id: 11,
    name: "Nike Futura Hard Liner Lunch Bag",
    price: 33.0,
    listPrice: null,
    category: "accessories",
    catLabel: "Accessories",
    url: "https://www.amazon.com/Nike-Futura-Hard-Liner-Lunch/dp/B08Y6QK9GK",
    image:
      "https://m.media-amazon.com/images/I/81D9tuG0MdL._AC_UY480_FMwebp_QL65_.jpg",
  },
  {
    id: 12,
    name: "Polo Assn Adjustable Baseball Cap",
    price: 24.99,
    listPrice: null,
    category: "accessories",
    catLabel: "Accessories",
    url: "https://www.amazon.com/Polo-Assn-Adjustable-Baseball-Embroidered/dp/B08ZQNPFTB",
    image:
      "https://m.media-amazon.com/images/I/61WEF66JGuL._AC_UY480_FMwebp_QL65_.jpg",
  },
  {
    id: 13,
    name: "Ralph Lauren Classic Ribbed Socks",
    price: 32.01,
    listPrice: null,
    category: "accessories",
    catLabel: "Accessories",
    url: "https://www.amazon.com/Ralph-Lauren-Classic-Ribbed-Socks/dp/B081X6SMBD",
    image:
      "https://m.media-amazon.com/images/I/71dOFIPW9oL._AC_UY480_FMwebp_QL65_.jpg",
  },
  {
    id: 14,
    name: "Calvin Klein Women's Regular Bralette",
    price: 22.0,
    listPrice: 30.0,
    category: "essentials",
    catLabel: "Essentials",
    url: "https://www.amazon.com/Calvin-Klein-Womens-Regular-Bralette/dp/B00GBCTSYU",
    image:
      "https://m.media-amazon.com/images/I/71Tqp163+3L._AC_UY480_FMwebp_QL65_.jpg",
  },
  {
    id: 15,
    name: "Polo Ralph Lauren Classic Ribbed Socks",
    price: 33.5,
    listPrice: null,
    category: "accessories",
    catLabel: "Accessories",
    url: "https://www.amazon.com/Polo-Ralph-Lauren-Classic-Ribbed/dp/B07ZYB9Q3F",
    image:
      "https://m.media-amazon.com/images/I/711onssyJLL._AC_UY480_FMwebp_QL65_.jpg",
    note: "$5.58 / pair",
  },
];
