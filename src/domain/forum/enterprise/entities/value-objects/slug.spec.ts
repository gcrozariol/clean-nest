import { test, expect } from 'vitest'
import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Title example')

  expect(slug.value).toEqual('title-example')
})
