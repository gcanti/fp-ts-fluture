import { Future, map, of, ap, chain, bimap } from 'fluture'
import { Monad } from 'fp-ts/lib/Monad'
import { Bifunctor } from 'fp-ts/lib/Bifunctor'

export const URI = 'Fluture'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    Fluture: Future<L, A>
  }
}

declare module 'fluture' {
  interface Future<L, R> {
    _A: R
    _L: L
    _URI: URI
  }
}

export const fluture: Monad<URI> & Bifunctor<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  bimap
}
