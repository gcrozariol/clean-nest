import { expect, test } from 'vitest'
import { UniqueEntityID } from './unique-entity-id'

test('Get unique entity id value', () => {
  const result = new UniqueEntityID('unique-id')

  expect(result.toValue()).toBe('unique-id')
})
