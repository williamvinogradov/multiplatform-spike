import {TTemplate} from '../types';

function castUnknownToTemplate(template: unknown): TTemplate {
  return template as TTemplate;
}

export {
  castUnknownToTemplate,
}
