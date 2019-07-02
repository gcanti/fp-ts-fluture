import { Par, ConcurrentFutureInstance } from 'fluture'
import { Alternative2 } from 'fp-ts/lib/Alternative'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    'Fluture/ConcurrentFuture': ConcurrentFutureInstance<E, A>
  }
}

/**
 * @since 0.5.0
 */
export const URI = 'Fluture/ConcurrentFuture'

/**
 * @since 0.5.0
 */
export type URI = typeof URI

/**
 * @since 0.5.0
 */
export const concurrentFuture: Alternative2<URI> = {
  URI: URI,
  map: (fa, f) => Par.map(f, fa),
  of: Par.of,
  ap: Par.ap,
  alt: (fx, f) => Par.alt(fx, f()),
  zero: Par.zero
}
