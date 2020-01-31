/**
 * @since 0.5.0
 */
import * as F from 'fluture'
import * as E from 'fp-ts/lib/Either'
import { Task } from 'fp-ts/lib/Task'
import { IO } from 'fp-ts/lib/IO'
import { Alt2 } from 'fp-ts/lib/Alt'
import { Bifunctor2 } from 'fp-ts/lib/Bifunctor'
import { ChainRec2 } from 'fp-ts/lib/ChainRec'
import { Monad2 } from 'fp-ts/lib/Monad'
import { pipeable } from 'fp-ts/lib/pipeable'
import { MonadThrow2 } from 'fp-ts/lib/MonadThrow'
import { MonadTask2 } from 'fp-ts/lib/MonadTask'

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    'Fluture/Future': Future<E, A>
  }
}

/**
 * @since 0.5.0
 */
export const URI = 'Fluture/Future'

/**
 * @since 0.6.4
 */
export interface Future<E, A> extends F.FutureInstance<E, A> {}

/**
 * @since 0.6.4
 */
export const left: <E = never, A = never>(e: E) => Future<E, A> = F.reject

/**
 * @since 0.6.4
 */
export const right: <E = never, A = never>(a: A) => Future<E, A> = F.resolve

/**
 * @since 0.6.4
 */
export function leftIO<E = never, A = never>(ma: IO<E>): Future<E, A> {
  return F.swap(F.attempt(ma))
}

/**
 * @since 0.6.4
 */
export const rightIO: <E = never, A = never>(ma: IO<A>) => Future<E, A> = F.attempt

/**
 * @since 0.6.4
 */
export function leftTask<E = never, A = never>(ma: Task<E>): Future<E, A> {
  return F.swap(F.attemptP(ma))
}

/**
 * @since 0.6.4
 */
export const rightTask: <E = never, A = never>(ma: Task<A>) => Future<E, A> = F.attemptP

/**
 * @since 0.6.4
 */
export function orElse<E, A, M>(onLeft: (e: E) => Future<M, A>): (ma: Future<E, A>) => Future<M, A> {
  return F.chainRej(onLeft)
}

/**
 * @since 0.6.4
 */
export function fold<E, A, B>(
  onLeft: (left: E) => Task<B>,
  onRight: (right: A) => Task<B>
): (ma: Future<E, A>) => Task<B> {
  return ma => () => F.promise(F.coalesce<E, Task<B>>(onLeft)(onRight)(ma)).then(mb => mb())
}

/**
 * @since 0.6.4
 */
export const swap: <E, A>(ma: Future<E, A>) => Future<A, E> = F.swap

/**
 * @since 0.6.4
 */
export function futurify<L, R>(f: (cb: (e: L | null | undefined, r?: R) => void) => void): () => Future<L, R>
export function futurify<A, L, R>(
  f: (a: A, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A) => Future<L, R>
export function futurify<A, B, L, R>(
  f: (a: A, b: B, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B) => Future<L, R>
export function futurify<A, B, C, L, R>(
  f: (a: A, b: B, c: C, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C) => Future<L, R>
export function futurify<A, B, C, D, L, R>(
  f: (a: A, b: B, c: C, d: D, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D) => Future<L, R>
export function futurify<A, B, C, D, E, L, R>(
  f: (a: A, b: B, c: C, d: D, e: E, cb: (e: L | null | undefined, r?: R) => void) => void
): (a: A, b: B, c: C, d: D, e: E) => Future<L, R>
export function futurify<L, R>(f: Function): () => Future<L, R> {
  return function() {
    const args = Array.prototype.slice.call(arguments)
    return F.node(done => {
      const cbResolver = (e: L, r: R) => (e != null ? done(e) : done(null, r))
      f.apply(null, args.concat(cbResolver))
    })
  }
}

/**
 * @since 0.5.0
 */
export type URI = typeof URI

/**
 * @since 0.5.0
 */
export const future: Monad2<URI> & Bifunctor2<URI> & ChainRec2<URI> & Alt2<URI> & MonadThrow2<URI> & MonadTask2<URI> = {
  URI,
  map: (fa, f) => F.map(f)(fa),
  of: F.resolve,
  ap: (fab, fa) => F.ap(fa)(fab),
  chain: (fa, f) => F.chain(f)(fa),
  bimap: (fea, f, g) => F.bimap(f)(g)(fea),
  mapLeft: (fea, f) => F.mapRej(f)(fea),
  alt: (fx, f) => F.alt(f())(fx),
  chainRec: <E, A, B>(a: A, f: (a: A) => Future<E, E.Either<A, B>>): Future<E, B> =>
    (function recur(a: A): Future<E, B> {
      return future.chain(f(a), E.fold(recur, F.resolve))
    })(a),
  throwError: left,
  fromTask: F.attemptP,
  fromIO: F.attempt
}

/**
 * @since 0.6.4
 */
export function delay(millis: number): <A>(ma: Future<never, A>) => Future<never, A> {
  return chain(F.after(millis))
}

const {
  alt,
  ap,
  apFirst,
  apSecond,
  bimap,
  chain,
  chainFirst,
  flatten,
  map,
  mapLeft,
  fromEither,
  fromOption,
  fromPredicate
} = pipeable(future)

export {
  /**
   * @since 0.6.4
   */
  alt,
  /**
   * @since 0.6.4
   */
  ap,
  /**
   * @since 0.6.4
   */
  apFirst,
  /**
   * @since 0.6.4
   */
  apSecond,
  /**
   * @since 0.6.4
   */
  bimap,
  /**
   * @since 0.6.4
   */
  chain,
  /**
   * @since 0.6.4
   */
  chainFirst,
  /**
   * @since 0.6.4
   */
  flatten,
  /**
   * @since 0.6.4
   */
  map,
  /**
   * @since 0.6.4
   */
  mapLeft,
  /**
   * @since 0.6.4
   */
  fromEither,
  /**
   * @since 0.6.4
   */
  fromOption,
  /**
   * @since 0.6.4
   */
  fromPredicate
}
