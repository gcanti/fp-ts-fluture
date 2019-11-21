import * as assert from 'assert'
import { ConcurrentFutureInstance, promise, reject, resolve, FutureInstance } from 'fluture'
import { array } from 'fp-ts/lib/Array'
import { concurrentFuture } from '../src/ConcurrentFuture'
import { future } from '../src/Future'

describe('Future', () => {
  it('should work with sequence (failure case)', done => {
    promise(array.sequence(future)([resolve(1), reject(new Error('ops'))]))
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
    const xs = await promise(array.sequence(future)([resolve(1), resolve(2)]))
    assert.deepEqual(xs, [1, 2])
  })

  it('should export an Alt instance', async () => {
    const f1: FutureInstance<Error, number> = future.alt(resolve(1), () => resolve(2))
    const f2: FutureInstance<Error, number> = future.alt(reject(new Error('1')), () => resolve(2))
    const f3: FutureInstance<Error, number> = future.alt(reject(new Error('1')), () => reject(new Error('2')))
    const n1 = await promise(f1)
    const n2 = await promise(f2)
    const n3 = await promise(f3).catch(() => 3)
    assert.deepEqual([n1, n2, n3], [1, 2, 3])
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
