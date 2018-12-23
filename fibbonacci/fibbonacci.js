let map = {};

function fib(n) {
  if (!map.hasOwnProperty(n)) {
    if (n <= 1) {
      map[n] = n
    } else {
      map[n] = fib(n - 1) + fib(n - 2)
    }
  }
  return map[n]
}

console.log(fib(40));
