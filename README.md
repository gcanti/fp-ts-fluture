[fp-ts](https://github.com/gcanti/fp-ts) bindings for [Fluture](https://github.com/fluture-js/Fluture)

# Documentation

- [API Reference](https://gcanti.github.io/fp-ts-fluture)

# Example

```ts
import { reject, of } from 'fluture'
import { future } from 'fp-ts-fluture/lib/Future'
import { array } from 'fp-ts/lib/Array'

array
  .sequence(future)([of(1), reject('ops')])
  .fork(() => console.error('error'), xs => console.log(xs)) // => "error"
array
  .sequence(future)([of(1), of(2)])
  .fork(() => console.error('error'), xs => console.log(xs)) // => [1, 2]
```
