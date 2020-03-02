---
title: Future.ts
nav_order: 2
parent: Modules
---

# Future overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [Future (interface)](#future-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [bimap](#bimap)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [delay](#delay)
- [flatten](#flatten)
- [fold](#fold)
- [fromEither](#fromeither)
- [fromOption](#fromoption)
- [fromPredicate](#frompredicate)
- [future](#future)
- [futurify](#futurify)
- [left](#left)
- [leftIO](#leftio)
- [leftTask](#lefttask)
- [map](#map)
- [mapLeft](#mapleft)
- [orElse](#orelse)
- [right](#right)
- [rightIO](#rightio)
- [rightTask](#righttask)
- [swap](#swap)

---

# Future (interface)

**Signature**

```ts
export interface Future<E, A> extends F.FutureInstance<E, A> {}
```

Added in v0.6.4

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.5.0

# URI

**Signature**

```ts
export const URI: "Fluture/Future" = ...
```

Added in v0.5.0

# alt

**Signature**

```ts
<E, A>(that: () => Future<E, A>) => (fa: Future<E, A>) => Future<E, A>
```

Added in v0.6.4

# ap

**Signature**

```ts
<E, A>(fa: Future<E, A>) => <B>(fab: Future<E, (a: A) => B>) => Future<E, B>
```

Added in v0.6.4

# apFirst

**Signature**

```ts
<E, B>(fb: Future<E, B>) => <A>(fa: Future<E, A>) => Future<E, A>
```

Added in v0.6.4

# apSecond

**Signature**

```ts
<E, B>(fb: Future<E, B>) => <A>(fa: Future<E, A>) => Future<E, B>
```

Added in v0.6.4

# bimap

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Future<E, A>) => Future<G, B>
```

Added in v0.6.4

# chain

**Signature**

```ts
<E, A, B>(f: (a: A) => Future<E, B>) => (ma: Future<E, A>) => Future<E, B>
```

Added in v0.6.4

# chainFirst

**Signature**

```ts
<E, A, B>(f: (a: A) => Future<E, B>) => (ma: Future<E, A>) => Future<E, A>
```

Added in v0.6.4

# delay

**Signature**

```ts
export function delay(millis: number): <A>(ma: Future<never, A>) => Future<never, A> { ... }
```

Added in v0.6.4

# flatten

**Signature**

```ts
<E, A>(mma: Future<E, Future<E, A>>) => Future<E, A>
```

Added in v0.6.4

# fold

**Signature**

```ts
export function fold<E, A, B>(
  onLeft: (left: E) => Task<B>,
  onRight: (right: A) => Task<B>
): (ma: Future<E, A>) => Task<B> { ... }
```

Added in v0.6.4

# fromEither

**Signature**

```ts
<E, A>(ma: E.Either<E, A>) => Future<E, A>
```

Added in v0.6.4

# fromOption

**Signature**

```ts
<E>(onNone: () => E) => <A>(ma: Option<A>) => Future<E, A>
```

Added in v0.6.4

# fromPredicate

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Future<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Future<E, A>; }
```

Added in v0.6.4

# future

**Signature**

```ts
export const future: Monad2<URI> & Bifunctor2<URI> & ChainRec2<URI> & Alt2<URI> & MonadThrow2<URI> & MonadTask2<URI> = ...
```

Added in v0.5.0

# futurify

**Signature**

```ts
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
): (a: A, b: B, c: C, d: D, e: E) => Future<L, R> { ... }
```

Added in v0.6.4

# left

**Signature**

```ts
export const left: <E = never, A = never>(e: E) => Future<E, A> = ...
```

Added in v0.6.4

# leftIO

**Signature**

```ts
export function leftIO<E = never, A = never>(ma: IO<E>): Future<E, A> { ... }
```

Added in v0.6.4

# leftTask

**Signature**

```ts
export function leftTask<E = never, A = never>(ma: Task<E>): Future<E, A> { ... }
```

Added in v0.6.4

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Future<E, A>) => Future<E, B>
```

Added in v0.6.4

# mapLeft

**Signature**

```ts
<E, G>(f: (e: E) => G) => <A>(fa: Future<E, A>) => Future<G, A>
```

Added in v0.6.4

# orElse

**Signature**

```ts
export function orElse<E, A, M>(onLeft: (e: E) => Future<M, A>): (ma: Future<E, A>) => Future<M, A> { ... }
```

Added in v0.6.4

# right

**Signature**

```ts
export const right: <E = never, A = never>(a: A) => Future<E, A> = ...
```

Added in v0.6.4

# rightIO

**Signature**

```ts
export const rightIO: <E = never, A = never>(ma: IO<A>) => Future<E, A> = ...
```

Added in v0.6.4

# rightTask

**Signature**

```ts
export const rightTask: <E = never, A = never>(ma: Task<A>) => Future<E, A> = ...
```

Added in v0.6.4

# swap

**Signature**

```ts
export const swap: <E, A>(ma: Future<E, A>) => Future<A, E> = ...
```

Added in v0.6.4
