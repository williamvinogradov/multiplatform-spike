import { getRollupConfig } from './rollup.utils.mjs';

const OUTPUT_DIR = 'dist';
const COMPONENTS = [
  'radio-group',
];

export default getRollupConfig(COMPONENTS, OUTPUT_DIR);
