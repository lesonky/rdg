import { DEFALUT_CONFIG } from './consts';
import { Random } from 'mockjs';

type configType = keyof typeof DEFALUT_CONFIG;
import { SchemaConfig } from './types.d';

export default function (type: configType, schemaConfig: SchemaConfig) {
  const ramdomConfig = schemaConfig.config;
  switch (type) {
    case 'randomInteger':
      return Random.integer(ramdomConfig.min, ramdomConfig.max);
    case 'float':
      return Random.float(
        ramdomConfig.min,
        ramdomConfig.max,
        ramdomConfig.point,
        ramdomConfig.point
      );
    case 'boolean':
      return Random.boolean(ramdomConfig.truePercentage, 100, true);
    case 'email':
      return Random.email();
    case 'guid':
      return Random.guid();
    case 'url':
      return Random.url('http');
    case 'location':
      return Random[ramdomConfig.level](ramdomConfig.includeLevel);
    case 'randomString':
      return Random.string(ramdomConfig.minLength, ramdomConfig.maxLength);
    case 'randomPick':
      return Random.pick(ramdomConfig.items.split(','));
    case 'date':
      return Random.date(ramdomConfig.formatter);
    case 'time':
      return Random.date(ramdomConfig.formatter);
    case 'dateTime':
      return Random.date(ramdomConfig.formatter);
    case 'color':
      return Random[ramdomConfig.type || 'color']();
    case 'englishName':
      return Random.name();
    case 'chineseName':
      return Random.cname();
    default:
      return '';
  }
}
