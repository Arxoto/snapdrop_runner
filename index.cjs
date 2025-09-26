const process = require('process');
const http = require('http');
const httpProxy = require('http-proxy');
const handler = require('serve-handler');

const { getAddressList } = require('./utils/address.cjs');
const { printQrcode } = require('./utils/qrcode.cjs');

// run server
const serverPort = 3000;
process.env.PORT = serverPort;
require('./snapdrop/server');

// proxy-server
const proxyWsServer = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: serverPort
  }
});

proxyWsServer.on('error', e => {
  console.error(e); // 链接中断会抛异常 但是不退出房间
});

// run client
const clientPort = 8081;
const mainServer = http.createServer((request, response) => {
  if (request.url.startsWith('/server')) {
    return proxyWsServer.web(request, response);
  }
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return handler(request, response, {
    "public": __dirname + "/client"
  });
});

// Listen to the `upgrade` event and proxy the WebSocket requests as well.
mainServer.on('upgrade', (req, socket, head) => {
  proxyWsServer.ws(req, socket, head);
});

mainServer.listen(clientPort, () => {
  console.log(`Running at http://localhost:${clientPort}`);

  const myAddressList = getAddressList();
  myAddressList.filter(ip => ip.startsWith('192.168.')).forEach(ip => {
    console.log(`visit for http://${ip}:${clientPort}`);
    if (!process.env.NOT_QRCODE) {
      printQrcode(`http://${ip}:${clientPort}`);
    }
  });
});
