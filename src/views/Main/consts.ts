export const SCHEMA_ITEM_TYPES = [
  {
    name: '整数',
    type: 'integer',
    children: [
      {
        name: '随机数',
        type: 'randomInteger',
      },
    ],
  },
  {
    name: '浮点数',
    type: 'float',
  },
  {
    name: '布尔值',
    type: 'boolean',
  },
  // {
  //   name: '经纬度',
  //   type: 'longlat',
  //   children: [
  //     {
  //       name: '经度',
  //       type: 'longitude',
  //     },
  //     {
  //       name: '纬度',
  //       type: 'latitude',
  //     },
  //   ],
  // },
  {
    name: '字符串',
    type: 'string',
    children: [
      {
        name: 'Email',
        type: 'email',
      },
      {
        name: 'GUID',
        type: 'guid',
      },
      {
        name: 'URL',
        type: 'url',
      },
      {
        name: '英文名',
        type: 'englishName',
      },
      {
        name: '中文名',
        type: 'chineseName',
      },
      {
        name: '地名',
        type: 'location',
      },
      {
        name: '随机字符串',
        type: 'randomString',
      },
      {
        name: '随机列表取值',
        type: 'randomPick',
      },
    ],
  },
  {
    name: '时间日期',
    type: 'datetime',
    children: [
      {
        name: '日期',
        type: 'date',
      },
      {
        name: '时间',
        type: 'time',
      },
      {
        name: '日期时间',
        type: 'dateTime',
      },
    ],
  },
  // {
  //   name: '占位图',
  //   type: 'holderImage',
  // },
  {
    name: '颜色',
    type: 'color',
  },
];

export const DEFALUT_CONFIG = {
  randomInteger: {
    min: 0,
    max: 1000,
  },
  float: {
    min: 0,
    max: 1000,
    point: 2,
  },
  boolean: {
    truePercentage: 50,
  },
  longitude: {
    center: '南京',
    delta: 40,
  },
  latitude: {
    center: '南京',
    delta: 40,
  },
  email: {},
  guid: {},
  url: {},
  englishName: {},
  chineseName: {},
  location: {
    level: 'city',
    includeLevel: false,
  },
  randomString: {
    minLength: 10,
    maxLength: 30,
  },
  randomPick: {
    items: '张三,李四,王二,麻子',
  },
  date: {
    formatter: 'yyyy-MM-dd',
  },
  time: {
    formatter: 'HH:mm:ss',
  },
  dateTime: {
    formatter: 'yyyy-MM-dd HH:mm:ss',
  },
  holderImage: {
    size: '100*100',
  },
  color: {
    type: 'hex',
  },
};

export default { SCHEMA_ITEM_TYPES, DEFALUT_CONFIG };
