import { Next, Done, FutureInstance, Future } from 'fluture'
import { Monad2 } from 'fp-ts/lib/Monad'
import { Bifunctor2 } from 'fp-ts/lib/Bifunctor'
import { ChainRec2 } from 'fp-ts/lib/ChainRec'
import { Either, fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { Alt2 } from 'fp-ts/lib/Alt'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    'Fluture/Future': FutureInstance<E, A>
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
export const future: Monad2<URI> & Bifunctor2<URI> & ChainRec2<URI> & Alt2<URI> = {
  URI,
  map: (fa, f) => fa.map(f),
  of: Future.of,
  ap: Future.ap,
  chain: (fa, f) => fa.chain(f),
  bimap: (fea, f, g) => fea.bimap(f, g),
  mapLeft: (fea, f) => fea.mapRej(f),
  chainRec: <E, A, B>(a: A, f: (a: A) => FutureInstance<E, Either<A, B>>): FutureInstance<E, B> =>
    Future.chainRec<E, A, B>(
      (next, done, value) =>
        f(value).map(e =>
          pipe(
            e,
            fold<A, B, Next<A> | Done<B>>(next, done)
          )
        ),
      a
    ),
  alt: (fx, f) => fx.alt(f())
}
