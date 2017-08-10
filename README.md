# Features

```ts
import { fluture } from 'fp-ts-fluture'
```

- `Monad` instance
- `Bifunctor` instance
- `ChainRec` instance

```ts
import { concurrentFluture } from 'fp-ts-fluture'
```

- `Alternative` instance

# Example

```ts
import { reject, of } from 'fluture'
import { fluture } from 'fp-ts-fluture'
import { sequence } from 'fp-ts/lib/Traversable'
import * as array from 'fp-ts/lib/Array'

sequence(fluture, array)([of(1), reject('ops')]).fork(() => console.error('error'), xs => console.log(xs)) // => "error"
sequence(fluture, array)([of(1), of(2)]).fork(() => console.error('error'), xs => console.log(xs)) // => [1, 2]
```

