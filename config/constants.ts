const postBackgroundColor = [
  "#FF6F61", // Coral
  "#FFCCBC", // Peach
  "#FFD54F", // Amber
  "#A5D6A7", // Light Green
  "#81D4FA", // Light Blue
  "#B39DDB", // Light Purple
  "#FFAB91", // Light Salmon
  "#C5E1A5", // Pale Green
  "#B3E5FC", // Light Cyan
  "#DCE775", // Lime
  "#F48FB1", // Light Pink
  "#C5CAE9", // Light Blue Grey
  // "#E57373", // Red
  // "#F06292"  // Pink
];

const formOptions = {
  age: [
    {
      key: 1,
      label: "น้อยกว่า 20 ปี",
    },
    {
      key: 2,
      label: "21 - 30 ปี",
    },
    {
      key: 3,
      label: "31 - 40 ปี",
    },
    {
      key: 4,
      label: "41 - 50 ปี",
    },
    {
      key: 5,
      label: "51 - 60 ปี",
    },
  ],
  gender: [
    {
      key: 1,
      label: "ชาย",
    },
    {
      key: 2,
      label: "หญิง",
    },
  ],
  feeling: [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ],
};

export { postBackgroundColor, formOptions };
