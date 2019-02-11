// demonstration of the thread/worker pool

// optional:
// process.env.UV_THREADPOOL_SIZE = 10;
// if we increase the threadpool to the number of function calls,
// the entire program completes at the same time due to hyperthreading

// hyperthreading allows a core to run multiple threads in parallel at
// reduced CPU capacity

const { pbkdf2 } = require('crypto');

const start = Date.now();

// pbkdf2 is a pretty intensive task
// since Node defaults to 4 workers in the pool, these first 4 calls will
// complete around the same time, then the 5th will run

pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start);
});

// if we added more calls, libuv may decide to multithread these calls,
// which would result in more calls being run in parallel at slower speed

// optional:
// pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//   console.log('6:', Date.now() - start);
// });

// pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//   console.log('7:', Date.now() - start);
// });

// pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//   console.log('8:', Date.now() - start);
// });

// pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//   console.log('9:', Date.now() - start);
// });

// pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//   console.log('10:', Date.now() - start);
// });
