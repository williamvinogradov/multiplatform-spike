для сборки
npm install
npm link @dx/core
затем генерим сырцы из react:
npm run build
далее собираем бандл
npx gulp js-bundles-debug
открываем в Chrome index.html