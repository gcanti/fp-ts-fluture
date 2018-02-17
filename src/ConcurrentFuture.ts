import { Par, ConcurrentFuture } from 'fluture'
import { Alternative2 } from 'fp-ts/lib/Alternative'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    ConcurrentFuture: ConcurrentFuture<L, A>
  }
}

declare module 'fluture' {
  interface ConcurrentFuture<L, R> {
    _A: R
    _L: L
    _URI: URI
  }
}

export const URI = 'ConcurrentFuture'

export type URI = typeof URI

const map = <L, A, B>(fa: ConcurrentFuture<L, A>, f: (a: A) => B): ConcurrentFuture<L, B> => {
  return Par.map(f, fa)
}

export const concurrentFuture: Alternative2<URI> = {
  URI: URI,
  map,
  of: Par.of,
  ap: Par.ap,
  alt: Par.alt,
  zero: Par.zero
}
