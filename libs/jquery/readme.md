## Build steps
- ```npm install```
- Link the core lib: ```npm link @dx/core```
- Generate src from react lib: ```npm run build```
- Generate bundle via gulp: ```gulp js-bundles-debug```
- Open index.html in browser

## Troubleshooting
### Node Sass does not yet support your current environment
Run the next command in cli: ```npm rebuild node-sass```
