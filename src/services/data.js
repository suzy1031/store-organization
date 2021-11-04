export const initData = {
  sm: 0,
  ssm: 0,
  hr: 0,
  vmd: 0,
  cs: 0,
  stock: 0,
  pc: 0,
};

export const storeManager = {
  staffName: '菅原 康平',
  image: '/images/kohei.jpg',
  role: 0,
  skills: [
    { skillName: 'hr', level: 99 },
    { skillName: 'vmd', level: 99 },
    { skillName: 'cs', level: 99 },
    { skillName: 'stock', level: 99 },
    { skillName: 'pc', level: 99 },
  ],
  smSkills: { skillName: 'sm', level: 99 },
};

export const storeSubManager = {
  staffName: '深田 恭子',
  image: '/images/fukada.jpeg',
  role: 1,
  skills: [
    { skillName: 'hr', level: 90 },
    { skillName: 'vmd', level: 90 },
    { skillName: 'cs', level: 90 },
    { skillName: 'stock', level: 90 },
    { skillName: 'pc', level: 80 },
  ],
  smSkills: { skillName: 'sub', level: 88 },
};

export const allStoreAverage = {
  sm: 75,
  ssm: 70,
  hr: 85,
  vmd: 75,
  cs: 75,
  stock: 70,
  pc: 90,
};

export const department = [
  {
    departmentName: 'アクセサリー',
    members: [
      {
        staffName: '川口 春奈',
        image: '/images/kawaguchi.jpeg',
        role: 2,
        skills: [
          { skillName: 'hr', level: 80 },
          { skillName: 'vmd', level: 85 },
          { skillName: 'cs', level: 75 },
          { skillName: 'stock', level: 70 },
          { skillName: 'pc', level: 70 },
        ],
      },
      {
        staffName: '綾瀬 はるか',
        image: '/images/ayase.jpeg',
        role: 3,
        skills: [
          { skillName: 'hr', level: 59 },
          { skillName: 'vmd', level: 75 },
          { skillName: 'cs', level: 70 },
          { skillName: 'stock', level: 80 },
          { skillName: 'pc', level: 60 },
        ],
      },
      {
        staffName: '有村 架純',
        image: '/images/arimura.jpeg',
        role: 3,
        skills: [
          { skillName: 'hr', level: 60 },
          { skillName: 'vmd', level: 75 },
          { skillName: 'cs', level: 85 },
          { skillName: 'stock', level: 85 },
          { skillName: 'pc', level: 50 },
        ],
      },
    ],
  },
  {
    departmentName: '靴下',
    members: [
      {
        staffName: '鷲見 玲奈',
        image: '/images/sumi.jpeg',
        role: 2,
        skills: [
          { skillName: 'hr', level: 80 },
          { skillName: 'vmd', level: 85 },
          { skillName: 'cs', level: 75 },
          { skillName: 'stock', level: 70 },
          { skillName: 'pc', level: 70 },
        ],
      },
      {
        staffName: '加藤 綾子',
        image: '/images/katou.jpeg',
        role: 3,
        skills: [
          { skillName: 'hr', level: 59 },
          { skillName: 'vmd', level: 75 },
          { skillName: 'cs', level: 70 },
          { skillName: 'stock', level: 80 },
          { skillName: 'pc', level: 60 },
        ],
      },
      {
        staffName: '森 香澄',
        image: '/images/mori.jpg',
        role: 3,
        skills: [
          { skillName: 'hr', level: 60 },
          { skillName: 'vmd', level: 75 },
          { skillName: 'cs', level: 85 },
          { skillName: 'stock', level: 85 },
          { skillName: 'pc', level: 50 },
        ],
      },
    ],
  },
  {
    departmentName: '雑貨',
    members: [
      {
        staffName: '藤田 ニコル',
        image: '/images/fujita.jpeg',
        role: 2,
        skills: [
          { skillName: 'hr', level: 80 },
          { skillName: 'vmd', level: 85 },
          { skillName: 'cs', level: 75 },
          { skillName: 'stock', level: 70 },
          { skillName: 'pc', level: 70 },
        ],
      },
      {
        staffName: 'みちょぱ',
        image: '/images/ikeda.jpeg',
        role: 3,
        skills: [
          { skillName: 'hr', level: 59 },
          { skillName: 'vmd', level: 75 },
          { skillName: 'cs', level: 70 },
          { skillName: 'stock', level: 80 },
          { skillName: 'pc', level: 60 },
        ],
      },
      {
        staffName: 'めるる',
        image: '/images/ikumi.jpeg',
        role: 3,
        skills: [
          { skillName: 'hr', level: 60 },
          { skillName: 'vmd', level: 75 },
          { skillName: 'cs', level: 85 },
          { skillName: 'stock', level: 85 },
          { skillName: 'pc', level: 50 },
        ],
      },
    ],
  },
];

export const stores = [
  {
    id: 'id_0',
    style: {
      background: '#17b397',
    },
    storeName: '渋谷店',
    skills: { sm: 75, ssm: 70, hr: 85, vmd: 75, cs: 75, stock: 70, pc: 90 },
    members: [
      {
        staffName: '菅原 康平',
        image: '/images/kohei.jpg',
        role: 0,
      },
      {
        staffName: '深田 恭子',
        image: '/images/fukada.jpeg',
        role: 1,
      },
      {
        staffName: '川口 春菜',
        image: '/images/kawaguchi.jpeg',
        role: 2,
      },
      {
        staffName: '藤田 ニコル',
        image: '/images/fujita.jpeg',
        role: 2,
      },
    ],
  },
  {
    id: 'id_1',
    style: {
      background: '#FF99FF',
    },
    storeName: '原宿店',
    skills: { sm: 90, ssm: 65, hr: 70, vmd: 85, cs: 65, stock: 80, pc: 70 },
    members: [
      {
        staffName: '安藤 孝志',
        image: '/images/ando.jpg',
        role: 0,
      },
      {
        staffName: '新垣 結衣',
        image: '/images/arakaki.jpg',
        role: 1,
      },
      {
        staffName: 'ふわちゃん',
        image: '/images/fuwa.jpg',
        role: 2,
      },
      {
        staffName: 'りゅうちぇる',
        image: '/images/higa.jpg',
        role: 2,
      },
      {
        staffName: 'ゆきぽよ',
        image: '/images/yuki.jpg',
        role: 2,
      },
    ],
  },
  {
    id: 'id_2',
    style: {
      background: '#FF6600',
    },
    storeName: '新宿店',
    skills: { sm: 65, ssm: 85, hr: 90, vmd: 65, cs: 65, stock: 75, pc: 60 },
    members: [
      {
        staffName: '梅澤 裕人',
        image: '/images/umezawa.jpg',
        role: 0,
      },
      {
        staffName: '吉永 小百合',
        image: '/images/yoshinaga.jpg',
        role: 1,
      },
      {
        staffName: '賠償 千恵子',
        image: '/images/baisho.jpg',
        role: 2,
      },
      {
        staffName: '草刈 民代',
        image: '/images/kusakari.jpeg',
        role: 2,
      },
    ],
  },
];

export const area = [
  {
    id: 'id_0',
    style: {
      background: '#17b397',
    },
    areaName: '南関東（自エリア）',
    skills: { sm: 75, ssm: 70, hr: 85, vmd: 75, cs: 75, stock: 70, pc: 90 },
    stores: [
      {
        storeName: '渋谷店',
        smLevel: 80,
        ssmLevel: 75,
        leaderCount: 2,
        newcomerCount: 3,
      },
      {
        storeName: '原宿店',
        smLevel: 85,
        ssmLevel: 75,
        leaderCount: 3,
        newcomerCount: 0,
      },
      {
        storeName: '新宿店',
        smLevel: 65,
        ssmLevel: 85,
        leaderCount: 2,
        newcomerCount: 1,
      },
    ],
  },
];

export const otherArea = [
  {
    id: 'id_0',
    style: {
      background: '#FF99FF',
    },
    areaName: '東海',
    skills: { sm: 90, ssm: 65, hr: 70, vmd: 85, cs: 65, stock: 80, pc: 70 },
    stores: [
      {
        storeName: '名駅店',
        smLevel: 90,
        ssmLevel: 59,
        leaderCount: 2,
        newcomerCount: 3,
      },
      {
        storeName: '岡崎店',
        smLevel: 85,
        ssmLevel: 85,
        leaderCount: 1,
        newcomerCount: 0,
      },
      {
        storeName: '豊橋店',
        smLevel: 75,
        ssmLevel: 90,
        leaderCount: 1,
        newcomerCount: 4,
      },
    ],
  },
  {
    id: 'id_1',
    style: {
      background: '#FF6600',
    },
    areaName: '関西',
    skills: { sm: 65, ssm: 85, hr: 90, vmd: 65, cs: 65, stock: 75, pc: 60 },
    stores: [
      {
        storeName: '御堂筋店',
        smLevel: 80,
        ssmLevel: 80,
        leaderCount: 3,
        newcomerCount: 1,
      },
      {
        storeName: 'なんば店',
        smLevel: 75,
        ssmLevel: 65,
        leaderCount: 1,
        newcomerCount: 1,
      },
      {
        storeName: '新大阪店',
        smLevel: 80,
        ssmLevel: 70,
        leaderCount: 2,
        newcomerCount: 0,
      },
      {
        storeName: '東大阪店',
        smLevel: 70,
        ssmLevel: 85,
        leaderCount: 3,
        newcomerCount: 4,
      },
    ],
  },
];

export const talkData = [
  {
    day: 1,
    time: 9,
    members: 1,
  },
  {
    day: 2,
    time: 61,
    members: 5,
  },
  {
    day: 4,
    time: 10,
    members: 4,
  },
  {
    day: 5,
    time: 60,
    members: 2,
  },
];
