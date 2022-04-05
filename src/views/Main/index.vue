<template>
  <HeaderBarVue></HeaderBarVue>
  <a-divider style="margin: 0" />
  <div class="rdg-main__container">
    <div class="rdg-main__left">
      <a-form :model="form" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item field="name" label="文件名">
              <a-input v-model="form.fileName" placeholder="请输入文件名..." />
              <!-- <a-button :style="{ marginLeft: '10px' }">选择模型</a-button> -->
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="post" label="数据量(行)">
              <a-input-number
                v-model="form.rowCount"
                placeholder="请输入数据量..."
                :min="1"
                :max="40000"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" style="align-items: center">
          <a-col :span="12">
            <div
              style="padding: 8px"
              :style="{
                color:
                  form.schemas.length * form.rowCount > 80000 ? 'red' : 'green',
              }"
            >
              {{ `${form.schemas.length}列*${form.rowCount}行` }}
            </div>
          </a-col>
          <a-col :span="6">
            <a-button style="width: 100%" type="primary" @click="preViewData">
              预览(最多100条)
            </a-button>
          </a-col>
          <a-col :span="6">
            <a-button style="width: 100%" type="primary" @click="addSchemaItem">
              新增数据列
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="schema-item__container">
        <div
          v-for="(item, index) in form.schemas"
          :key="item._id || `${item.type}_${index}`"
          class="schema-item"
        >
          <icon-close
            v-if="form.schemas.length > 1"
            class="schema-item__close"
            @click="removeSchemaItem(index)"
          />
          <SchemaItem
            :model-value="item"
            @model-value:update="updateSchemaItem($event, index)"
          ></SchemaItem>
        </div>
      </div>
    </div>
    <div class="rdg-main__right">
      <a-button
        v-if="!!tableData.data.length"
        class="download-btn"
        type="primary"
        @click="downloadExcel"
      >
        下载EXCEL文件
      </a-button>
      <a-table
        :columns="tableData.columns"
        :data="tableData.data"
        :pagination="false"
        :scroll="{ x: '100%', y: '100%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import HeaderBarVue from './HeaderBar.vue';
import SchemaItem from './SchemaItem.vue';
import { IconClose } from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';

import { DEFALUT_CONFIG } from './consts';
import { Random } from 'mockjs';
import rdg from './rdg';
import { zipObject } from 'lodash';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { DataConfig, SchemaConfig } from './types.d';
type configType = keyof typeof DEFALUT_CONFIG;

const form = reactive<DataConfig>({
  fileName: '自定义',
  rowCount: 100,
  schemas: [
    {
      _id: Random.guid(),
      name: `col${Random.increment(1)}`,
      type: 'randomInteger',
      config: DEFALUT_CONFIG.randomInteger,
    },
  ],
});

const tableData = reactive<{
  data: Array<{ [k: string]: any }>;
  columns: Array<{ title: string; dataIndex: string }>;
}>({
  data: [],
  columns: [],
});

const addSchemaItem = () => {
  form.schemas.push({
    _id: Random.guid(),
    name: `col${Random.increment(1)}`,
    type: 'randomInteger',
    config: DEFALUT_CONFIG.randomInteger,
  });
};

const removeSchemaItem = (index: number) => {
  form.schemas.splice(index, 1);
};

const updateSchemaItem = (item: SchemaConfig, index: number) => {
  form.schemas.splice(index, 1, item);
};

const preViewData = () => {
  const { schemas, rowCount = 100 } = form;
  const headers = schemas.map((item) => ({
    title: item.name,
    dataIndex: item._id || item.name,
    width: 100,
    cellStyle: { whiteSpace: 'nowrap' },
    stripe: true,
    ellipsis: true,
  }));
  const rows = Array.from({ length: Math.min(rowCount, 100) }, () =>
    schemas.map((item) => rdg(item.type as configType, item))
  );
  tableData.columns = headers;
  tableData.data = rows.map((row) =>
    zipObject(
      schemas.map((item) => item._id || item.name),
      row
    )
  );
};

const downloadExcel = () => {
  if (!checkAmount()) {
    Message.error('请保持:行数 * 列数 <= 80000');
    return;
  }
  const { schemas, rowCount = 100, fileName } = form;
  const headers = schemas.map((item) => item.name);
  const rows = Array.from({ length: rowCount }, () =>
    schemas.map((item) => rdg(item.type as configType, item))
  );

  // 开始构造 Excel 文件
  const workbook = new ExcelJS.Workbook();
  // Set Workbook Properties
  workbook.creator = 'RDG by wukoon';
  workbook.lastModifiedBy = 'RDG by wukoon';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  // 将工作簿添加一个sheet页sheet1
  const sheet1 = workbook.addWorksheet('sheet1');
  // 表头数据添加
  sheet1.columns = headers.map((item) => ({
    header: item,
    key: item,
    width: 12,
  }));
  // 表格内容添加
  rows.map((item) => sheet1.addRow(item));
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: 'application/octet-stream' }),
      fileName + '.' + 'xlsx'
    );
  });
};

const checkAmount = () => {
  const { schemas, rowCount = 100 } = form;
  return schemas.length * rowCount <= 80000;
};
</script>

<style lang="less" scoped>
.rdg-main__ {
  &container {
    height: calc(100% - 65px);
    display: flex;
  }
  &left {
    height: 100%;
    width: 800px;
    padding: 16px;
    .schema-item__container {
      height: calc(100% - 132px);
      overflow: auto;
    }
    .schema-item {
      padding: 16px;
      border: 1px solid #ddd;
      margin-top: 16px;
      position: relative;
    }
    .schema-item__close {
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: pointer;
      transition: color 0.3;
      &:hover {
        transition: color 0.3;
        color: rgb(0, 96, 250);
      }
    }
  }
  &right {
    height: 100%;
    flex: 1 1;
    padding: 16px;
    padding-top: 44px;
    padding-bottom: 34px;
    position: relative;
    .download-btn {
      position: absolute;
      top: 6px;
      right: 16px;
    }
  }
}
</style>
