import gulp from "gulp";
import * as fs from "fs";
import { generateInfernoFromReactComponents } from "./gulp/inferno-from-react.js";
import "./gulp/js-bundles.js";

gulp.task("build-inferno", gulp.series(() => {
    return generateInfernoFromReactComponents('./src/generated');
}, (done) => {
    fs.rmSync("./src/generated/components/simpleGrid", { recursive: true });
    fs.rmSync("./src/generated/components/slideToggle", { recursive: true });
    fs.copyFileSync('./patch/dxPager.scss',
        './src/generated/components/pager/dxPager.scss');
    fs.copyFileSync('./patch/dxPager.js',
        './src/generated/components/pager/dxPager.js');
    fs.copyFileSync('./patch/types.js',
        './src/generated/components/pager/types/index.js');
    done()
}))