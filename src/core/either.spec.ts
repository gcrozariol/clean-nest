import { expect, test } from 'vitest'
import { Either, left, right } from './either'

function doSomething(x: boolean): Either<string, number> {
  if (x) {
    return right(10)
  } else {
    return left('error')
  }
}

test('Success result', () => {
  const result = doSomething(true)

  expect(result.value).toEqual(10)

  expect(result.isLeft()).toEqual(false)
  expect(result.isRight()).toEqual(true)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.value).toEqual('error')

  expect(result.isLeft()).toEqual(true)
  expect(result.isRight()).toEqual(false)
})
