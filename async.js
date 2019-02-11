// example of a random os task

const https = require('https');

const start = Date.now();

const queryGoogle = () => {
  https.request('https://google.com', res => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log(Date.now() - start);
    })
  }).end();
}

queryGoogle();
queryGoogle();
queryGoogle();
queryGoogle();
queryGoogle();
queryGoogle();

// all 6 calls complete simutaneously, assuming 6 cores
// libuv delegates these async calls to os helpers that runs the request
// this is entirely separate from the threadpool libuv uses
// because of this, there's no blocking related to node's event loop
