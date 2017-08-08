import * as assert from 'assert'
import { reject, of } from 'fluture'
import { fluture } from '../src'
import { sequence } from 'fp-ts/lib/Traversable'
import * as array from 'fp-ts/lib/Array'

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
})
