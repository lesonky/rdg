<template>
  <a-form :model="localConfig" :style="{ width: '100%' }" layout="vertical">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item field="name" label="列名">
          <a-input v-model="localConfig.name" placeholder="请输入列名..." />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="type" label="数据类型">
          <a-cascader
            v-model="localConfig.type"
            :options="SCHEMA_ITEM_TYPES"
            :default-value="localConfig.type"
            expand-trigger="hover"
            :style="{ width: '320px' }"
            placeholder="Please select ..."
            :field-names="{ value: 'type', label: 'name' }"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, reactive, watch } from 'vue';
import { SchemaConfig } from './types.d';
import { SCHEMA_ITEM_TYPES, DEFALUT_CONFIG } from './consts';

type configType = keyof typeof DEFALUT_CONFIG;

const props = defineProps<{ modelValue: SchemaConfig }>();
const emit = defineEmits<{
  (e: 'model-value:update', item: SchemaConfig): void;
}>();

const localConfig = reactive<SchemaConfig>({
  name: props.modelValue.name,
  type: props.modelValue.type,
  config: props.modelValue.config,
});

watch(
  () => localConfig.type,
  () => {
    localConfig.config = DEFALUT_CONFIG[localConfig.type as configType];
  }
);

watch(localConfig, () => {
  emit('model-value:update', localConfig);
});
</script>
<style lang="less" scoped></style>
