[fp-ts](https://github.com/gcanti/fp-ts) bindings for [Fluture](https://github.com/fluture-js/Fluture)

# Documentation

- [API Reference](https://gcanti.github.io/fp-ts-fluture)

# Example

```ts
import { reject, resolve, fork } from 'fluture'
import { future } from 'fp-ts-fluture/lib/Future'
import { array } from 'fp-ts/lib/Array'

array
  .sequence(future)([resolve(1), reject('oops')])
  .pipe(fork(e => console.error('Error:', e))
    (console.log), // => "Error: oops"
  )
array
  .sequence(future)([resolve(1), resolve(2)])
  .pipe(fork(console.error)
    (console.log), // => [1, 2]
  )
```
