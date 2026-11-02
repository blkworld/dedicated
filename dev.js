// One command for local development: npm run dev
// - builds images.json now
// - rebuilds it whenever a photo is added, renamed or removed in ./images
// - serves the site on port 3000 and reloads the page automatically
const liveServer = require('live-server');
const { build, watch } = require('./generate-gallery');

build();
watch();

liveServer.start({
  port: 3000,
  host: '0.0.0.0',
  open: false,
  noCssInject: true,
  ignore: 'node_modules',
  wait: 200,
  logLevel: 1
});
