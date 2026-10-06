export const FRUITS = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"] as const

export const FRUIT_GROUPS = [
  {
    label: "Fruits",
    items: ["Apple", "Banana", "Blueberry"]
  },
  {
    label: "Vegetables",
    items: ["Carrot", "Broccoli", "Spinach"]
  }
] as const

export const TIMEZONE_GROUPS = [
  {
    label: "North America",
    items: [
      "Eastern Standard Time",
      "Central Standard Time",
      "Mountain Standard Time",
      "Pacific Standard Time",
      "Alaska Standard Time"
    ]
  },
  {
    label: "Europe & Africa",
    items: [
      "Greenwich Mean Time",
      "Central European Time",
      "Eastern European Time",
      "Western European Summer Time",
      "Central Africa Time"
    ]
  },
  {
    label: "Asia",
    items: [
      "Moscow Time",
      "India Standard Time",
      "China Standard Time",
      "Japan Standard Time",
      "Korea Standard Time"
    ]
  }
] as const

export const RTL_FRUIT_GROUPS = [
  {
    label: "الفواكه",
    items: ["تفاح", "موز", "توت أزرق"]
  },
  {
    label: "الخضروات",
    items: ["جزر", "بروكلي", "سبانخ"]
  }
] as const
