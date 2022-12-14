import { tokens } from "../theme";

export const mockDataTeam = [
  {
    id:"1",
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    username: "jon_snow",
    dateCreated: "2022-10-10",
    status: "active",
  },
  {
    id:"2",
    name: "Stark Nguyen",
    email: "starknguyen@gmail.com",
    username: "stark_nguyen",
    dateCreated: "2022-09-10",
    status: "unactive",
  },
  {
    id:"3",
    name: "Le Manh",
    email: "lemanh@gmail.com",
    username: "manh_le",
    dateCreated: "2022-11-10",
    status: "active",
  },
  {
    id:"4",
    name: "Quang Tran",
    email: "tranquang@gmail.com",
    username: "tran_quang",
    dateCreated: "2022-09-11",
    status: "active",
  },
  {
    id:"5",
    name: "Tuan Anh",
    email: "rapper@gmail.com",
    username: "lilTuan",
    dateCreated: "2022-14-10",
    status: "unactive",
  }
];

export const mockHistory = [
  {
    id: "01e4dsa",
    username: "johndoe",
    dateCreated: "2022-12-11",
    title:"Một ngày mới ở Thụy Điển",
    category: "Life"
  },
  {
    id: "03d5csa",
    username: "lemanh",
    dateCreated: "2022-10-11",
    title:"Cảm nhận về cuộc sống ở Thụy Sỹ",
    category: "Life"
  },
  {
    id: "02a2bcz",
    username: "quangtran",
    dateCreated: "2022-30-10",
    title:"Game thế giới mở là gì",
    category: "Gaming"
  },
  {
    id: "04x6nvx",
    username: "tuananh",
    dateCreated: "2022-09-10",
    title:"Chill cùng mình",
    category: "Relax"
  }
];
export const mockCategory = [
  {
    id: "01",
    catName: "Relax",
    dateCreated: "2022-24-01",
    description:"Chuyên mục các bài viết thư giãn tâm hồn",
  },
  {
    id: "02",
    catName: "Gaming",
    dateCreated: "2022-24-08",
    description:"Chuyên mục các bài viết lĩnh vực game",
  },
  {
    id: "03",
    catName: "Life",
    dateCreated: "2022-24-05",
    description:"Chuyên mục các bài viết về cuộc sống",
  }
];

export const mockBarData = [
  {
    country: "25/11",
    "Du Lich": 0,
    "Du LichColor": "hsl(229, 70%, 50%)",
    Gaming: 0,
    GamingColor: "hsl(296, 70%, 50%)",
    News: 1,
    NewsColor: "hsl(97, 70%, 50%)",
    LOL: 0,
    LOLColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "26/11",
    "Du Lich": 0,
    "Du LichColor": "hsl(229, 70%, 50%)",
    Gaming: 1,
    GamingColor: "hsl(296, 70%, 50%)",
    News: 0,
    NewsColor: "hsl(97, 70%, 50%)",
    LOL: 0,
    LOLColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "27/11",
    "Du Lich": 0,
    "Du LichColor": "hsl(229, 70%, 50%)",
    Gaming: 0,
    GamingColor: "hsl(296, 70%, 50%)",
    News: 0,
    NewsColor: "hsl(97, 70%, 50%)",
    LOL: 0,
    LOLColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "28/11",
    "Du Lich": 0,
    "Du LichColor": "hsl(229, 70%, 50%)",
    Gaming: 0,
    GamingColor: "hsl(296, 70%, 50%)",
    News: 0,
    NewsColor: "hsl(97, 70%, 50%)",
    LOL: 1,
    LOLColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "29/11",
    "Du Lich": 0,
    "Du LichColor": "hsl(229, 70%, 50%)",
    Gaming: 0,
    GamingColor: "hsl(296, 70%, 50%)",
    News: 0,
    NewsColor: "hsl(97, 70%, 50%)",
    LOL: 0,
    LOLColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "30/11",
    "Du Lich": 0,
    "Du LichColor": "hsl(229, 70%, 50%)",
    Gaming: 0,
    GamingColor: "hsl(296, 70%, 50%)",
    News: 0,
    NewsColor: "hsl(97, 70%, 50%)",
    LOL: 0,
    LOLColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "1/12",
    "Du Lich": 0,
    "Du LichColor": "hsl(229, 70%, 50%)",
    Gaming: 0,
    GamingColor: "hsl(296, 70%, 50%)",
    News: 2,
    NewsColor: "hsl(97, 70%, 50%)",
    LOL: 0,
    LOLColor: "hsl(340, 70%, 50%)",
  },
  
];

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "japan",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "plane",
        y: 101,
      },
      {
        x: "helicopter",
        y: 75,
      },
      {
        x: "boat",
        y: 36,
      },
      {
        x: "train",
        y: 216,
      },
      {
        x: "subway",
        y: 35,
      },
      {
        x: "bus",
        y: 236,
      },
      {
        x: "car",
        y: 88,
      },
      {
        x: "moto",
        y: 232,
      },
      {
        x: "bicycle",
        y: 281,
      },
      {
        x: "horse",
        y: 1,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "plane",
        y: 212,
      },
      {
        x: "helicopter",
        y: 190,
      },
      {
        x: "boat",
        y: 270,
      },
      {
        x: "train",
        y: 9,
      },
      {
        x: "subway",
        y: 75,
      },
      {
        x: "bus",
        y: 175,
      },
      {
        x: "car",
        y: 33,
      },
      {
        x: "moto",
        y: 189,
      },
      {
        x: "bicycle",
        y: 97,
      },
      {
        x: "horse",
        y: 87,
      },
      {
        x: "skateboard",
        y: 299,
      },
      {
        x: "others",
        y: 251,
      },
    ],
  },
  {
    id: "us",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "plane",
        y: 191,
      },
      {
        x: "helicopter",
        y: 136,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
];

