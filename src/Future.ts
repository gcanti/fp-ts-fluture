import { Next, Done, FutureInstance, Future } from 'fluture'
import { Monad2 } from 'fp-ts/lib/Monad'
import { Bifunctor2 } from 'fp-ts/lib/Bifunctor'
import { ChainRec2 } from 'fp-ts/lib/ChainRec'
import { Either } from 'fp-ts/lib/Either'

export const URI = 'Fluture/Future'

export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    'Fluture/Future': FutureInstance<L, A>
  }
}

declare module 'fluture' {
  interface Future<L, R> {
    _A: R
    _L: L
    _URI: URI
  }
}

const chainRec = <L, A, B>(a: A, f: (a: A) => FutureInstance<L, Either<A, B>>): FutureInstance<L, B> => {
  return Future.chainRec<L, A, B>((next, done, value) => f(value).map(e => e.fold<Next<A> | Done<B>>(next, done)), a)
}

const map = <L, A, B>(fa: FutureInstance<L, A>, f: (a: A) => B): FutureInstance<L, B> => {
  return fa.map(f)
}

const chain = <L, A, B>(fa: FutureInstance<L, A>, f: (a: A) => FutureInstance<L, B>): FutureInstance<L, B> => {
  return fa.chain(f)
}

const bimap = <L, A, M, B>(fla: FutureInstance<L, A>, f: (l: L) => M, g: (a: A) => B): FutureInstance<M, B> => {
  return fla.bimap(f, g)
}

export const future: Monad2<URI> & Bifunctor2<URI> & ChainRec2<URI> = {
  URI,
  map,
  of: Future.of,
  ap: Future.ap,
  chain,
  bimap,
  chainRec
}
