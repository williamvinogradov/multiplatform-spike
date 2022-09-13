import {TAngularTemplateObsolete} from '../types';

function castUnknownToTemplate(template: unknown): TAngularTemplateObsolete {
  return template as TAngularTemplateObsolete;
}

export {
  castUnknownToTemplate,
}
