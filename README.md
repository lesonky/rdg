# RDG 随机数据生成小工具
工作中经常需要用到一些随机数据,以excel文件的方式导入到系统中,但是自己填数据是在太麻烦了,于是就用node生成,依旧太麻烦了,于是又了这个小工具,通过mockjs来生成数据,并且写成excel文件

![大概就是这样的](http://assets.processon.com/chart_image/624865d67d9c080724769f12.png)  

# 功能列表
[X] 设置文件名称
[X] 设置数据量
[X] 字段添加
[X] 设置字段类型

```js
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
```
# 后续功能
1. 为每个字段添加配置项
2. 添加经纬度类型字段
3. 添加图片类型字段
