import * as assert from 'assert'
import { reject, of, ConcurrentFuture } from 'fluture'
import { fluture, chainRec, concurrentFluture } from '../src'
import { sequence } from 'fp-ts/lib/Traversable'
import * as array from 'fp-ts/lib/Array'
import { right } from 'fp-ts/lib/Either'

describe('Fluture bindings', () => {
  it('should work with sequence (failure case)', done => {
    sequence(fluture, array)([of(1), reject('ops')])
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
    return sequence(fluture, array)([of(1), of(2)]).promise().then(xs => {
      assert.deepEqual(xs, [1, 2])
    })
  })

  it('should export a ChainRec instance', () => {
    return chainRec(a => of(right(a)), 1).promise().then(n => {
      assert.strictEqual(n, 1)
    })
  })

  it('should export an Alt instance', () => {
    const z: ConcurrentFuture<never, number> = concurrentFluture.alt(
      concurrentFluture.of(1),
      concurrentFluture.of(2)
    ) as any
    return z.sequential.promise().then(n => {
      assert.strictEqual(n, 2)
    })
  })

  it('should export an Alternative instance', () => {
    const z: ConcurrentFuture<never, number> = concurrentFluture.alt<number>(
      concurrentFluture.of(1),
      concurrentFluture.zero()
    ) as any
    return z.sequential.promise().then(n => {
      assert.strictEqual(n, 1)
    })
  })
})
