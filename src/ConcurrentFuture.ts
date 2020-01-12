/**
 * @since 0.5.0
 */
import * as F from 'fluture'
import { Alternative2 } from 'fp-ts/lib/Alternative'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    'Fluture/ConcurrentFuture': F.ConcurrentFutureInstance<E, A>
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
  map: (fa, f) => F.map(f)(fa),
  of: F.Par['fantasy-land/of'],
  ap: (fab, fa) => F.ap(fa)(fab),
  alt: (fx, f) => F.alt(f())(fx),
  zero: F.Par['fantasy-land/zero']
}
