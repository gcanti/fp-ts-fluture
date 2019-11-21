import * as F from 'fluture'
import { Alt2 } from 'fp-ts/lib/Alt'
import { Bifunctor2 } from 'fp-ts/lib/Bifunctor'
import { Monad2 } from 'fp-ts/lib/Monad'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    'Fluture/Future': F.FutureInstance<E, A>
  }
}

/**
 * @since 0.5.0
 */
export const URI = 'Fluture/Future'

/**
 * @since 0.5.0
 */
export type URI = typeof URI

/**
 * @since 0.5.0
 */
export const future: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> = {
  URI,
  map: (fa, f) => F.map(f)(fa),
  of: F.resolve,
  ap: (fab, fa) => F.ap(fa)(fab),
  chain: (fa, f) => F.chain(f)(fa),
  bimap: (fea, f, g) => F.bimap(f)(g)(fea),
  mapLeft: (fea, f) => F.mapRej(f)(fea),
  alt: (fx, f) => F.alt(f())(fx)
}
