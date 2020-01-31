import * as assert from 'assert'
import { ConcurrentFutureInstance, fork, promise, reject, resolve, FutureInstance } from 'fluture'
import { array } from 'fp-ts/lib/Array'
import { left, right } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import * as _ from '../src/Future'
import { concurrentFuture } from '../src/ConcurrentFuture'

const double = (n: number): number => n * 2

describe('Future', () => {
  describe('Monad', () => {
    it('map', done => {
      fork(done)(x => {
        assert.deepStrictEqual(x, 2)
        done()
      })(_.future.map(_.right(1), double))
    })

    it('ap', done => {
      const mab = _.right(double)
      const ma = _.right(1)
      fork(done)(x => {
        assert.deepStrictEqual(x, 2)
        done()
      })(_.future.ap(mab, ma))
    })

    it('chain', done => {
      const ma = _.future.chain(_.right('foo'), a => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      const mab = _.future.chain(_.right('a'), a => (a.length > 2 ? _.right(a.length) : _.left('foo')))

      fork(done)(e1 => {
        assert.deepStrictEqual(e1, 3)
        fork(e2 => {
          assert.deepStrictEqual(e2, 'foo')
          done()
        })(done)(mab)
      })(ma)
    })
  })

  describe('Bifunctor', () => {
    it('bimap', done => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2

      const ma = _.bimap(f, g)(_.right(1))
      const mab = _.bimap(f, g)(_.left('foo'))

      fork(done)(e1 => {
        assert.deepStrictEqual(e1, false)
        fork(e2 => {
          assert.deepStrictEqual(e2, 3)
          done()
        })(done)(mab)
      })(ma)
    })

    it('mapLeft', done => {
      fork(x => {
        assert.deepStrictEqual(x, 2)
        done()
      })(done)(_.future.mapLeft(_.left(1), double))
    })
  })

  it('orElse', done => {
    const e1 = pipe(
      _.left('foo'),
      _.orElse(l => _.right(l.length))
    )
    const e2 = pipe(
      _.right(1),
      _.orElse(() => _.right(2))
    )

    fork(done)(x => {
      assert.deepStrictEqual(x, 3)
      fork(done)(x => {
        assert.deepStrictEqual(x, 1)
        done()
      })(e2)
    })(e1)
  })

  it('should work with sequence (failure case)', done => {
    promise(array.sequence(_.future)([resolve(1), reject(new Error('ops'))]))
      .then(() => {
        done(new Error('Expected rejection'))
      })
      .catch(err => {
        assert.ok(err)
        done()
      })
      .catch(done)
  })

  it('should work with sequence (success case)', async () => {
    const xs = await promise(array.sequence(_.future)([resolve(1), resolve(2)]))
    assert.deepEqual(xs, [1, 2])
  })

  it('should export an Alt instance', async () => {
    const f1: FutureInstance<Error, number> = _.future.alt(resolve(1), () => resolve(2))
    const f2: FutureInstance<Error, number> = _.future.alt(reject(new Error('1')), () => resolve(2))
    const f3: FutureInstance<Error, number> = _.future.alt(reject(new Error('1')), () => reject(new Error('2')))
    const n1 = await promise(f1)
    const n2 = await promise(f2)
    const n3 = await promise(f3).catch(() => 3)
    assert.deepEqual([n1, n2, n3], [1, 2, 3])
  })

  it('should export a ChainRec instance', async () => {
    const ma = _.future.chainRec(0, n => resolve(n < 20_000 ? left(n + 1) : right(n)))
    assert.strictEqual(await promise(ma), 20000)
  })

  it('futurify', done => {
    const api1 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const api2 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(undefined, 'ok')
    }
    const api3 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(new Error('ko'))
    }
    promise(_.futurify(api1)('foo'))
      .then(e1 => {
        assert.deepStrictEqual(e1, 'ok')
        promise(_.futurify(api2)('foo'))
          .then(e2 => {
            assert.deepStrictEqual(e2, 'ok')
            promise(_.futurify(api3)('foo'))
              .catch(e3 => {
                assert.deepStrictEqual(e3, new Error('ko'))
                done()
              })
              .catch(done)
          })
          .catch(done)
      })
      .catch(done)
  })
})

describe('ConcurrentFluture', () => {
  it('should export an Alt instance', async () => {
    const z: ConcurrentFutureInstance<Error, number> = concurrentFuture.alt(concurrentFuture.of(1), () =>
      concurrentFuture.of(2)
    )
    const n = await promise(z.sequential)
    assert.strictEqual(n, 1)
  })

  it('should export an Alternative instance', async () => {
    const z: ConcurrentFutureInstance<Error, number> = concurrentFuture.alt(concurrentFuture.of(1), () =>
      concurrentFuture.zero()
    )
    const n = await promise(z.sequential)
    assert.strictEqual(n, 1)
  })
})
