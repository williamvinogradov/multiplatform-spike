const fs = require('fs');
const process = require('node:process');
const colors = require('colors');

// functions
function setLibVersion(libJsonPath, targetJsonPath) {
    const libPackageJson = fs.readFileSync(libJsonPath, 'utf-8');
    const libPackage = JSON.parse(libPackageJson);
    const { name, version } = libPackage;

    const playgroundPackageJson = fs.readFileSync(targetJsonPath, 'utf-8');
    const playgroundPackage = JSON.parse(playgroundPackageJson);
    playgroundPackage.dependencies[name] = version;

    fs.writeFileSync(targetJsonPath, JSON.stringify(playgroundPackage, null, 2));

    return { name, version }
}

function printHelp() {
    console.info(`${'=== help ==='.cyan}`);
    console.info(`syntax: node set-lib-version.js ${'<dist_package_json_path> <target_package_json_path>'.green}`);
    console.info('\nparams: ');
    console.info( `  - ${'<dist_package_json_path>'.green} is path to library package.json`);
    console.info( `  - ${'<target_package_json_path>'.green} is path to target project package.json\n`);
    console.info(`for example: node set-lib-version.js ${'./dist/angular/package.json ./playgrounds/angular/package.json'.green}\n`);
}

function runScript() {
    const [,, libPath, targetPath] = process.argv;
    const { name, version } = setLibVersion(libPath, targetPath);
    console.info(`${'info'.cyan}: ${name} package version set: ${version.toString().green}`);
}


//script
console.info('=== set lib version ==='.cyan);

const [,,firstArg] = process.argv;

switch (firstArg) {
    case '--help':
        printHelp();
        break;
    default:
        runScript();
        break;
}
