import {getRollupConfig} from "./rollup.utils";

const OUTPUT_DIR = '../../dist/react';
const COMPONENTS = [
    'slideToggle',
    'simpleGrid',
    'pager',
];

export default getRollupConfig(COMPONENTS, OUTPUT_DIR);
