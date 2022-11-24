import { getRollupConfig } from './rollup.utils.mjs';

const OUTPUT_DIR = 'dist';
const COMPONENTS = [
  'radio-group',
  'radio-button',
];

export default getRollupConfig(COMPONENTS, OUTPUT_DIR);
