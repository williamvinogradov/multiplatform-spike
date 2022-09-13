import {getRollupConfig} from "./rollup.utils";

const OUTPUT_DIR = '../../dist/core';
const COMPONENTS = [
    'slideToggle',
    'simpleGrid',
    'pager'
];

export default  getRollupConfig(COMPONENTS, OUTPUT_DIR);
