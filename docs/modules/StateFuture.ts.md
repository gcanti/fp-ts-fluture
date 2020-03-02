---
title: StateFuture.ts
nav_order: 4
parent: Modules
---

# StateFuture overview

Added in v0.6.5

---

<h2 class="text-delta">Table of contents</h2>

- [StateFuture (interface)](#statefuture-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [bimap](#bimap)
- [chain](#chain)
- [chainEitherK](#chaineitherk)
- [chainFirst](#chainfirst)
- [chainFutureK](#chainfuturek)
- [chainRec](#chainrec)
- [evalState](#evalstate)
- [execState](#execstate)
- [filterOrElse](#filterorelse)
- [flatten](#flatten)
- [fromEither](#fromeither)
- [fromEitherK](#fromeitherk)
- [fromFuture](#fromfuture)
- [fromFutureK](#fromfuturek)
- [fromOption](#fromoption)
- [fromPredicate](#frompredicate)
- [get](#get)
- [gets](#gets)
- [left](#left)
- [leftIO](#leftio)
- [leftState](#leftstate)
- [leftTask](#lefttask)
- [map](#map)
- [mapLeft](#mapleft)
- [modify](#modify)
- [orElse](#orelse)
- [put](#put)
- [right](#right)
- [rightIO](#rightio)
- [rightState](#rightstate)
- [rightTask](#righttask)
- [run](#run)
- [stateFuture](#statefuture)
- [stateFutureSeq](#statefutureseq)

---

# StateFuture (interface)

**Signature**

```ts
export interface StateFuture<S, E, A> {
  (s: S): F.Future<E, [A, S]>
}
```

Added in v0.6.5

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.6.5

# URI

**Signature**

```ts
export const URI: "StateFuture" = ...
```

Added in v0.6.5

# alt

**Signature**

```ts
<R, E, A>(that: () => StateFuture<R, E, A>) => (fa: StateFuture<R, E, A>) => StateFuture<R, E, A>
```

Added in v0.6.5

# ap

**Signature**

```ts
<R, E, A>(fa: StateFuture<R, E, A>) => <B>(fab: StateFuture<R, E, (a: A) => B>) => StateFuture<R, E, B>
```

Added in v0.6.5

# apFirst

**Signature**

```ts
<R, E, B>(fb: StateFuture<R, E, B>) => <A>(fa: StateFuture<R, E, A>) => StateFuture<R, E, A>
```

Added in v0.6.5

# apSecond

**Signature**

```ts
<R, E, B>(fb: StateFuture<R, E, B>) => <A>(fa: StateFuture<R, E, A>) => StateFuture<R, E, B>
```

Added in v0.6.5

# bimap

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fa: StateFuture<R, E, A>) => StateFuture<R, G, B>
```

Added in v0.6.5

# chain

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateFuture<R, E, B>) => (ma: StateFuture<R, E, A>) => StateFuture<R, E, B>
```

Added in v0.6.5

# chainEitherK

**Signature**

```ts
export function chainEitherK<E, A, B>(
  f: (a: A) => E.Either<E, B>
): <S>(ma: StateFuture<S, E, A>) => StateFuture<S, E, B> { ... }
```

Added in v0.6.5

# chainFirst

**Signature**

```ts
<R, E, A, B>(f: (a: A) => StateFuture<R, E, B>) => (ma: StateFuture<R, E, A>) => StateFuture<R, E, A>
```

Added in v0.6.5

# chainFutureK

**Signature**

```ts
export function chainFutureK<E, A, B>(
  f: (a: A) => F.Future<E, B>
): <S>(ma: StateFuture<S, E, A>) => StateFuture<S, E, B> { ... }
```

Added in v0.6.5

# chainRec

**Signature**

```ts
<R, E, A, B>(a: A, f: (a: A) => StateFuture<R, E, E.Either<A, B>>) => StateFuture<R, E, B>
```

Added in v0.6.5

# evalState

**Signature**

```ts
export const evalState: <S, E, A>(ma: StateFuture<S, E, A>, s: S) => F.Future<E, A> = ...
```

Added in v0.6.5

# execState

**Signature**

```ts
export const execState: <S, E, A>(ma: StateFuture<S, E, A>, s: S) => F.Future<E, S> = ...
```

Added in v0.6.5

# filterOrElse

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: StateFuture<R, E, A>) => StateFuture<R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: StateFuture<R, E, A>) => StateFuture<R, E, A>; }
```

Added in v0.6.5

# flatten

**Signature**

```ts
<R, E, A>(mma: StateFuture<R, E, StateFuture<R, E, A>>) => StateFuture<R, E, A>
```

Added in v0.6.5

# fromEither

**Signature**

```ts
<R, E, A>(ma: E.Either<E, A>) => StateFuture<R, E, A>
```

Added in v0.6.5

# fromEitherK

**Signature**

```ts
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => E.Either<E, B>
): <S>(...a: A) => StateFuture<S, E, B> { ... }
```

Added in v0.6.5

# fromFuture

**Signature**

```ts
export const fromFuture: <S, E, A>(ma: F.Future<E, A>) => StateFuture<S, E, A> = ...
```

Added in v0.6.5

# fromFutureK

**Signature**

```ts
export function fromFutureK<E, A extends Array<unknown>, B>(
  f: (...a: A) => F.Future<E, B>
): <S>(...a: A) => StateFuture<S, E, B> { ... }
```

Added in v0.6.5

# fromOption

**Signature**

```ts
<E>(onNone: () => E) => <R, A>(ma: Option<A>) => StateFuture<R, E, A>
```

Added in v0.6.5

# fromPredicate

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => StateFuture<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => StateFuture<R, E, A>; }
```

Added in v0.6.5

# get

**Signature**

```ts
export const get: <S>() => StateFuture<S, never, S> = ...
```

Added in v0.6.5

# gets

**Signature**

```ts
export const gets: <S, A>(f: (s: S) => A) => StateFuture<S, never, A> = ...
```

Added in v0.6.5

# left

**Signature**

```ts
export function left<S, E>(e: E): StateFuture<S, E, never> { ... }
```

Added in v0.6.5

# leftIO

**Signature**

```ts
export function leftIO<S, E>(me: IO<E>): StateFuture<S, E, never> { ... }
```

Added in v0.6.5

# leftState

**Signature**

```ts
export function leftState<S, E>(me: State<S, E>): StateFuture<S, E, never> { ... }
```

Added in v0.6.5

# leftTask

**Signature**

```ts
export function leftTask<S, E>(me: Task<E>): StateFuture<S, E, never> { ... }
```

Added in v0.6.5

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: StateFuture<R, E, A>) => StateFuture<R, E, B>
```

Added in v0.6.5

# mapLeft

**Signature**

```ts
<E, G>(f: (e: E) => G) => <R, A>(fa: StateFuture<R, E, A>) => StateFuture<R, G, A>
```

Added in v0.6.5

# modify

**Signature**

```ts
export const modify: <S>(f: (s: S) => S) => StateFuture<S, never, void> = ...
```

Added in v0.6.5

# orElse

**Signature**

```ts
export function orElse<S, E, M, A>(
  f: (e: E) => StateFuture<S, M, A>
): (ma: StateFuture<S, E, A>) => StateFuture<S, M, A> { ... }
```

Added in v0.6.5

# put

**Signature**

```ts
export const put: <S>(s: S) => StateFuture<S, never, void> = ...
```

Added in v0.6.5

# right

**Signature**

```ts
export const right: <S, A>(a: A) => StateFuture<S, never, A> = ...
```

Added in v0.6.5

# rightIO

**Signature**

```ts
export function rightIO<S, A>(ma: IO<A>): StateFuture<S, never, A> { ... }
```

Added in v0.6.5

# rightState

**Signature**

```ts
export const rightState: <S, A>(ma: State<S, A>) => StateFuture<S, never, A> = ...
```

Added in v0.6.5

# rightTask

**Signature**

```ts
export function rightTask<S, A>(ma: Task<A>): StateFuture<S, never, A> { ... }
```

Added in v0.6.5

# run

**Signature**

```ts
export function run<S, E, A>(ma: StateFuture<S, E, A>, s: S): F.Future<E, [A, S]> { ... }
```

Added in v0.6.5

# stateFuture

**Signature**

```ts
export const stateFuture: MonadStateFuture = ...
```

Added in v0.6.5

# stateFutureSeq

Like `stateFuture` but `ap` is sequential

**Signature**

```ts
export const stateFutureSeq: typeof stateFuture = ...
```

Added in v0.6.5
