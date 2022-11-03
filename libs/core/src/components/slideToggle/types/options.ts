import {TTextPosition} from './index';

/* models */
interface ModelOptions {
  value: boolean;
}

/* configs */
interface ConfigOptions {
  text: string;
  textPosition: TTextPosition;
}

/* templates */
interface TemplateOptions {
  indicatorView: unknown;
  textView: unknown;
}

interface SlideToggleOptions
  extends ModelOptions, ConfigOptions, TemplateOptions {
}

export {
  ModelOptions,
  ConfigOptions,
  TemplateOptions,
  SlideToggleOptions,
}
