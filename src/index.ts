import { Next, Done, Future, Par, ConcurrentFuture } from 'fluture'
import { Monad } from 'fp-ts/lib/Monad'
import { Bifunctor } from 'fp-ts/lib/Bifunctor'
import { Alternative } from 'fp-ts/lib/Alternative'
import { ChainRec } from 'fp-ts/lib/ChainRec'
import { Either } from 'fp-ts/lib/Either'

//
// Future
//

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

export function chainRec<L, A, B>(f: (a: A) => Future<L, Either<A, B>>, a: A): Future<L, B> {
  return Future.chainRec<L, A, B>((next, done, value) => f(value).map(e => e.fold<Next<A> | Done<B>>(next, done)), a)
}

export const fluture: Monad<URI> & Bifunctor<URI> & ChainRec<URI> = {
  URI,
  map: Future.map,
  of: Future.of,
  ap: Future.ap,
  chain: Future.chain,
  bimap: Future.bimap,
  chainRec
}

//
// ConcurrentFuture
//

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    ConcurrentFuture: ConcurrentFuture<L, A>
  }
}

declare module 'fluture' {
  interface ConcurrentFuture<L, R> {
    _A: R
    _L: L
    _URI: ConcurrentURI
  }
}

export const ConcurrentURI = 'ConcurrentFluture'

export type ConcurrentURI = typeof ConcurrentURI

export const concurrentFluture: Alternative<ConcurrentURI> = {
  URI: ConcurrentURI,
  map: Par.map,
  of: Par.of,
  ap: Par.ap,
  alt: Par.alt,
  zero: Par.zero
}
