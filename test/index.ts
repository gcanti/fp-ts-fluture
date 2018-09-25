import * as assert from 'assert'
import { reject, of, ConcurrentFutureInstance } from 'fluture'
import { future } from '../src/Future'
import { concurrentFuture } from '../src/ConcurrentFuture'
import { sequence } from 'fp-ts/lib/Traversable'
import { array } from 'fp-ts/lib/Array'
import { right } from 'fp-ts/lib/Either'

describe('Fluture bindings', () => {
  it('should work with sequence (failure case)', done => {
    sequence(future, array)([of(1), reject('ops')])
      .promise()
      .then(() => {
        done(new Error('Expected rejection'))
      })
      .catch(err => {
        assert.ok(err)
        done()
      })
      .catch(done)
  })

  it('should work with sequence (success case)', () => {
    return sequence(future, array)([of(1), of(2)])
      .promise()
      .then(xs => {
        assert.deepEqual(xs, [1, 2])
      })
  })

  it('should export a ChainRec instance', () => {
    return future
      .chainRec(1, a => of(right(a)))
      .promise()
      .then(n => {
        assert.strictEqual(n, 1)
      })
  })

  it('should export an Alt instance', () => {
    const z: ConcurrentFutureInstance<never, number> = concurrentFuture.alt(
      concurrentFuture.of(1),
      concurrentFuture.of(2)
    )
    return z.sequential.promise().then(n => {
      assert.strictEqual(n, 2)
    })
  })

  it('should export an Alternative instance', () => {
    const z: ConcurrentFutureInstance<never, number> = concurrentFuture.alt(
      concurrentFuture.of(1),
      concurrentFuture.zero()
    )
    return z.sequential.promise().then(n => {
      assert.strictEqual(n, 1)
    })
  })
})
