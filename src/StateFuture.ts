/**
 * @since 0.6.5
 */
import { IO } from 'fp-ts/lib/IO'
import { Monad3 } from 'fp-ts/lib/Monad'
import { MonadThrow3 } from 'fp-ts/lib/MonadThrow'
import { State } from 'fp-ts/lib/State'
import { getStateM } from 'fp-ts/lib/StateT'
import { Task } from 'fp-ts/lib/Task'
import * as E from 'fp-ts/lib/Either'
import { pipeable, pipe } from 'fp-ts/lib/pipeable'
import { Bifunctor3 } from 'fp-ts/lib/Bifunctor'
import { Alt3 } from 'fp-ts/lib/Alt'
import { MonadTask3 } from 'fp-ts/lib/MonadTask'
import { ChainRec3 } from 'fp-ts/lib/ChainRec'
import * as F from './Future'

const T = getStateM(F.future)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind3<R, E, A> {
    StateFuture: StateFuture<R, E, A>
  }
}

/**
 * @since 0.6.5
 */
export const URI = 'StateFuture'

/**
 * @since 0.6.5
 */
export type URI = typeof URI

/**
 * @since 0.6.5
 */
export interface StateFuture<S, E, A> {
  (s: S): F.Future<E, [A, S]>
}

/**
 * @since 0.6.5
 */
export const evalState: <S, E, A>(ma: StateFuture<S, E, A>, s: S) => F.Future<E, A> = T.evalState

/**
 * @since 0.6.5
 */
export const execState: <S, E, A>(ma: StateFuture<S, E, A>, s: S) => F.Future<E, S> = T.execState

/**
 * @since 0.6.5
 */
export function left<S, E, A = never>(e: E): StateFuture<S, E, A> {
  return fromFuture(F.left(e))
}

/**
 * @since 0.6.5
 */
export const right: <S, E = never, A = never>(a: A) => StateFuture<S, E, A> = T.of

/**
 * @since 0.6.5
 */
export function rightTask<S, E = never, A = never>(ma: Task<A>): StateFuture<S, E, A> {
  return fromFuture(F.rightTask(ma))
}

/**
 * @since 0.6.5
 */
export function leftTask<S, E, A = never>(me: Task<E>): StateFuture<S, E, A> {
  return fromFuture(F.leftTask(me))
}

/**
 * @since 0.6.5
 */
export const fromFuture: <S, E, A>(ma: F.Future<E, A>) => StateFuture<S, E, A> = T.fromM

/**
 * @since 0.6.5
 */
export function rightIO<S, E = never, A = never>(ma: IO<A>): StateFuture<S, E, A> {
  return fromFuture(F.rightIO(ma))
}

/**
 * @since 0.6.5
 */
export function leftIO<S, E, A = never>(me: IO<E>): StateFuture<S, E, A> {
  return fromFuture(F.leftIO(me))
}

/**
 * @since 0.6.5
 */
export const rightState: <S, A>(ma: State<S, A>) => StateFuture<S, never, A> = T.fromState

/**
 * @since 0.6.5
 */
export function leftState<S, E>(me: State<S, E>): StateFuture<S, E, never> {
  return s => F.left(me(s)[0])
}

/**
 * @since 0.6.5
 */
export function orElse<S, E, M, A>(
  f: (e: E) => StateFuture<S, M, A>
): (ma: StateFuture<S, E, A>) => StateFuture<S, M, A> {
  return ma => c =>
    pipe(
      ma(c),
      F.orElse(e => f(e)(c))
    )
}

/**
 * @since 0.6.5
 */
export const get: <S>() => StateFuture<S, never, S> = T.get

/**
 * @since 0.6.5
 */
export const put: <S>(s: S) => StateFuture<S, never, void> = T.put

/**
 * @since 0.6.5
 */
export const modify: <S>(f: (s: S) => S) => StateFuture<S, never, void> = T.modify

/**
 * @since 0.6.5
 */
export const gets: <S, A>(f: (s: S) => A) => StateFuture<S, never, A> = T.gets

/**
 * @since 0.6.5
 */
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => E.Either<E, B>
): <S>(...a: A) => StateFuture<S, E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @since 0.6.5
 */
export function chainEitherK<E, A, B>(
  f: (a: A) => E.Either<E, B>
): <S>(ma: StateFuture<S, E, A>) => StateFuture<S, E, B> {
  return chain<any, E, A, B>(fromEitherK(f))
}

/**
 * @since 0.6.5
 */
export function fromFutureK<E, A extends Array<unknown>, B>(
  f: (...a: A) => F.Future<E, B>
): <S>(...a: A) => StateFuture<S, E, B> {
  return (...a) => fromFuture(f(...a))
}

/**
 * @since 0.6.5
 */
export function chainFutureK<E, A, B>(
  f: (a: A) => F.Future<E, B>
): <S>(ma: StateFuture<S, E, A>) => StateFuture<S, E, B> {
  return chain<any, E, A, B>(fromFutureK(f))
}

type MonadStateFuture = Monad3<URI> &
  MonadThrow3<URI> &
  Bifunctor3<URI> &
  Alt3<URI> &
  ChainRec3<URI> &
  MonadThrow3<URI> &
  MonadTask3<URI>

/**
 * @since 0.6.5
 */
export const stateFuture: MonadStateFuture = {
  URI,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  throwError: left,
  alt: (fx, f) => c =>
    pipe(
      fx(c),
      F.alt(() => f()(c))
    ),
  bimap: (fea, f, g) => c =>
    pipe(
      fea(c),
      F.bimap(f, ([a, c]) => [g(a), c])
    ),
  chainRec: <S, E, A, B>(a: A, f: (a: A) => StateFuture<S, E, E.Either<A, B>>): StateFuture<S, E, B> =>
    (function recur(a: A): StateFuture<S, E, B> {
      return stateFuture.chain(f(a), E.fold(recur, right))
    })(a),
  mapLeft: (fea, f) => c => pipe(fea(c), F.mapLeft(f)),
  fromIO: rightIO,
  fromTask: rightTask
}

/**
 * Like `stateFuture` but `ap` is sequential
 * @since 0.6.5
 */
export const stateFutureSeq: typeof stateFuture = {
  ...stateFuture,
  ap: (mab, ma) => T.chain(mab, f => T.map(ma, f))
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
  filterOrElse,
  fromEither,
  fromOption,
  fromPredicate
} = pipeable(stateFuture)

const chainRec = stateFuture.chainRec

export {
  /**
   * @since 0.6.5
   */
  alt,
  /**
   * @since 0.6.5
   */
  ap,
  /**
   * @since 0.6.5
   */
  apFirst,
  /**
   * @since 0.6.5
   */
  apSecond,
  /**
   * @since 0.6.5
   */
  bimap,
  /**
   * @since 0.6.5
   */
  chain,
  /**
   * @since 0.6.5
   */
  chainFirst,
  /**
   * @since 0.6.5
   */
  flatten,
  /**
   * @since 0.6.5
   */
  map,
  /**
   * @since 0.6.5
   */
  mapLeft,
  /**
   * @since 0.6.5
   */
  filterOrElse,
  /**
   * @since 0.6.5
   */
  fromEither,
  /**
   * @since 0.6.5
   */
  fromOption,
  /**
   * @since 0.6.5
   */
  fromPredicate,
  /**
   * @since 0.6.5
   */
  chainRec
}
