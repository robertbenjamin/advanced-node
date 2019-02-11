const https = require('https');
const { pbkdf2 } = require('crypto');
const fs = require('fs');

// process.env.UV_THREADPOOL_SIZE = 6;

const start = Date.now();

const queryGoogle = () => {
  https.request('https://google.com', res => {
    res.on('data', () => { });
    res.on('end', () => {
      console.log('query:', Date.now() - start);
    })
  }).end();
}

const runHash = () => {
  pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('hash:', Date.now() - start);
  });
}

// remember that the threadpool (by default) has 4 threads
// the https module does not use the node threadpool
queryGoogle();

// fs and crypto do use the threadpool
// since fs requires 2 thread cycles to run (get file stats
// then get the actual file), at least one hashing function
// will always complete before fs finishes, even though fs
// takes much less time to run
fs.readFile('multitask.js', 'utf8', () => {
  console.log('fs:', Date.now() - start);
});

runHash();
runHash();
runHash();
runHash();
