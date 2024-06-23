const categories = [
  {
    "broadCategory": "Technology",
    "mainCategory": "Computers & Accessories",
    "subCategory": [
      "Desktops & Monitors",
      "Laptops & Notebooks",
      "Parts & Accessories (Keyboards, Mice)",
      "Printers, Scanners, Copiers"
    ]
  },
  {
    "broadCategory": "Technology",
    "mainCategory": "Mobile Phones & Gadgets",
    "subCategory": [
      "Mobile Phones",
      "Tablets",
      "E-Readers",
      "Powerbanks & Cables",
      "Smartwatches",
      "Other Accessories"
    ]
  },
  {
    "broadCategory": "Technology",
    "mainCategory": "Audio, Video Tech",
    "subCategory": [
      "Headphones",
      "Earphones",
      "Speakers, soundbars, amplifiers",
      "Cameras",
      "Voice Recorders"
    ]
  },
  {
    "broadCategory": "Technology",
    "mainCategory": "Video Games",
    "subCategory": [
      "Video Game Consoles & Controllers",
      "Video Games",
      "Gaming Accessories"
    ]
  },
  {
    "broadCategory": "Accoms Living",
    "mainCategory": "Home Appliances",
    "subCategory": [
      "Kitchen Appliances",
      "Vacuum Cleaner & Housekeeping",
      "Irons & Steamers",
      "Lighting & Fans",
      "Smart Home Devices"
    ]
  },
  {
    "broadCategory": "Accoms Living",
    "mainCategory": "Home Living",
    "subCategory": [
      "Room Decor",
      "Home Improvement & Organisations",
      "Cleaning & Homecare Supplies"
    ]
  },
  {
    "broadCategory": "Fashion",
    "mainCategory": "Women’s Fashion",
    "subCategory": [
      "Tops & Dresses",
      "Bottoms",
      "Footwear",
      "Bags",
      "Watches, Jewellery & Accessories"
    ]
  },
  {
    "broadCategory": "Fashion",
    "mainCategory": "Men’s Fashion",
    "subCategory": [
      "Tops & Sets",
      "Bottoms",
      "Footwear",
      "Bags",
      "Watches, Jewellery & Accessories"
    ]
  },
  {
    "broadCategory": "Self-Care",
    "mainCategory": "Beauty & Personal Care",
    "subCategory": [
      "Hands & Nails",
      "Fragrance & Deodorants",
      "Bath & Body",
      "Makeup",
      "Face & Skincare",
      "Haircare and other Grooming"
    ]
  },
  {
    "broadCategory": "Sports & Activities",
    "mainCategory": "Sports Equipment",
    "subCategory": [
      "Exercise & Fitness Equipment",
      "Sports & Games Equipment",
      "Bicycles & Parts"
    ]
  },
  {
    "broadCategory": "Sports & Activities",
    "mainCategory": "Hobbies & Toys",
    "subCategory": [
      "Toys & Games",
      "Musical Instruments & Accessories",
      "Textbooks & Reference Material",
      "Books",
      "Stationery & Craft"
    ]
  },
  {
    "broadCategory": "Sports & Activities",
    "mainCategory": "Health & Nutrition",
    "subCategory": [
      "Medical Supplies & Tools",
      "Braces, Support & Protection",
      "Health Supplements",
      "Massage Devices"
    ]
  }
]

export const getBroadCategories = () => {
  const broadCategories = [...new Set(categories.map(category => category.broadCategory))];
  return broadCategories;
};

export const getMainCategories = (broadCategory) => {
  const mainCategories = categories
    .filter(category => category.broadCategory === broadCategory)
    .map(category => category.mainCategory);
  return mainCategories;
};

export const getSubCategories = (mainCategory) => {
  const category = categories.find(category => category.mainCategory === mainCategory);
  return category ? category.subCategory : [];
};

export default categories;