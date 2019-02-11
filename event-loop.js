// pseudocode to represent the node event loop
// node file.js

const pendingTimers = [];
// these are run by os helpers. e.g. networking
const pendingOSTasks = [];
// these operations can run in the libuv threadpool
const pendingOperations = [];

// new timers, tasks, ops are recorded from file.js running
file.runContents();

const shouldContinue = () => {
  // 1. pending setTimeout, setInterval, setImmediate?
  // 2. pending OS tasks (e.g. http server listening to port)?
  // 3. pending long running operations (e.g. fs)?

  return pendingTimers.length ||
         pendingOSTasks.length ||
         pendingOperations.length;
}

// entire body executes in one 'tick'
while(shouldContinue()) {
  // 1. node looks at pendingTimers
  //    checks if any functions are ready to be called
  //    (call setTimeout + setInterval callbacks)

  // 2. node looks at pendingOSTasks and
  //    pendingOperations, and calls relevant callbacks
  //    - tasks running here are in the threadpool

  // 3. pause execution, continue when...
  //    - a new pendingOSTask is done
  //    - a new pendingOperation is done
  //    - a timer is about to complete

  // 4. node looks at pendingTimers
  //    (call setImmediate callbacks)

  // 5. handle any 'close' events
}

// exit back to terminal
