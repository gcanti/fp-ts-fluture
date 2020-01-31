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
- [URI (constant)](#uri-constant)
- [future (constant)](#future-constant)
- [left (constant)](#left-constant)
- [right (constant)](#right-constant)
- [rightIO (constant)](#rightio-constant)
- [rightTask (constant)](#righttask-constant)
- [swap (constant)](#swap-constant)
- [delay (function)](#delay-function)
- [fold (function)](#fold-function)
- [futurify (function)](#futurify-function)
- [leftIO (function)](#leftio-function)
- [leftTask (function)](#lefttask-function)
- [orElse (function)](#orelse-function)
- [alt (export)](#alt-export)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [bimap (export)](#bimap-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [flatten (export)](#flatten-export)
- [fromEither (export)](#fromeither-export)
- [fromOption (export)](#fromoption-export)
- [fromPredicate (export)](#frompredicate-export)
- [map (export)](#map-export)
- [mapLeft (export)](#mapleft-export)

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

# URI (constant)

**Signature**

```ts
export const URI: "Fluture/Future" = ...
```

Added in v0.5.0

# future (constant)

**Signature**

```ts
export const future: Monad2<URI> & Bifunctor2<URI> & ChainRec2<URI> & Alt2<URI> & MonadThrow2<URI> & MonadTask2<URI> = ...
```

Added in v0.5.0

# left (constant)

**Signature**

```ts
export const left: <E = ...
```

Added in v0.6.4

# right (constant)

**Signature**

```ts
export const right: <E = ...
```

Added in v0.6.4

# rightIO (constant)

**Signature**

```ts
export const rightIO: <E = ...
```

Added in v0.6.4

# rightTask (constant)

**Signature**

```ts
export const rightTask: <E = ...
```

Added in v0.6.4

# swap (constant)

**Signature**

```ts
export const swap: <E, A>(ma: Future<E, A>) => Future<A, E> = ...
```

Added in v0.6.4

# delay (function)

**Signature**

```ts
export function delay(millis: number): <A>(ma: Future<never, A>) => Future<never, A> { ... }
```

Added in v0.6.4

# fold (function)

**Signature**

```ts
export function fold<E, A, B>(
  onLeft: (left: E) => Task<B>,
  onRight: (right: A) => Task<B>
): (ma: Future<E, A>) => Task<B> { ... }
```

Added in v0.6.4

# futurify (function)

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

# leftIO (function)

**Signature**

```ts
export function leftIO<E = never, A = never>(ma: IO<E>): Future<E, A> { ... }
```

Added in v0.6.4

# leftTask (function)

**Signature**

```ts
export function leftTask<E = never, A = never>(ma: Task<E>): Future<E, A> { ... }
```

Added in v0.6.4

# orElse (function)

**Signature**

```ts
export function orElse<E, A, M>(onLeft: (e: E) => Future<M, A>): (ma: Future<E, A>) => Future<M, A> { ... }
```

Added in v0.6.4

# alt (export)

**Signature**

```ts
<E, A>(that: () => Future<E, A>) => (fa: Future<E, A>) => Future<E, A>
```

Added in v0.6.4

# ap (export)

**Signature**

```ts
<E, A>(fa: Future<E, A>) => <B>(fab: Future<E, (a: A) => B>) => Future<E, B>
```

Added in v0.6.4

# apFirst (export)

**Signature**

```ts
<E, B>(fb: Future<E, B>) => <A>(fa: Future<E, A>) => Future<E, A>
```

Added in v0.6.4

# apSecond (export)

**Signature**

```ts
<E, B>(fb: Future<E, B>) => <A>(fa: Future<E, A>) => Future<E, B>
```

Added in v0.6.4

# bimap (export)

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Future<E, A>) => Future<G, B>
```

Added in v0.6.4

# chain (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => Future<E, B>) => (ma: Future<E, A>) => Future<E, B>
```

Added in v0.6.4

# chainFirst (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => Future<E, B>) => (ma: Future<E, A>) => Future<E, A>
```

Added in v0.6.4

# flatten (export)

**Signature**

```ts
<E, A>(mma: Future<E, Future<E, A>>) => Future<E, A>
```

Added in v0.6.4

# fromEither (export)

**Signature**

```ts
<E, A>(ma: E.Either<E, A>) => Future<E, A>
```

Added in v0.6.4

# fromOption (export)

**Signature**

```ts
<E>(onNone: () => E) => <A>(ma: Option<A>) => Future<E, A>
```

Added in v0.6.4

# fromPredicate (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Future<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Future<E, A>; }
```

Added in v0.6.4

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Future<E, A>) => Future<E, B>
```

Added in v0.6.4

# mapLeft (export)

**Signature**

```ts
<E, G>(f: (e: E) => G) => <A>(fa: Future<E, A>) => Future<G, A>
```

Added in v0.6.4
