import { beforeEach, describe, expect, it } from 'vitest'
import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

let list: NumberWatchedList

describe('Watched List', () => {
  beforeEach(() => {
    list = new NumberWatchedList([1, 2, 3])
  })

  it('should be able to check if item exists', () => {
    const item = list.exists(list.getItems()[0])
    expect(item).toBe(true)
  })

  it('should be able to create a watched list with initial items', () => {
    expect(list.currentItems).toHaveLength(3)
  })

  it('should be able to add new items to the list', () => {
    list.add(4)

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4])
  })

  it('should be able to remove items from the list', () => {
    list.remove(2)

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([2])
  })

  it('should be able to add an item, even it was previously removed', () => {
    list.remove(2)
    list.add(2)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getNewItems()).toEqual([])
    expect(list.getRemovedItems()).toEqual([])
  })

  it('should be able to remove an item, even it was previously added', () => {
    list.add(4)
    list.remove(4)

    expect(list.currentItems).toHaveLength(3)
    expect(list.getNewItems()).toEqual([])
    expect(list.getRemovedItems()).toEqual([])
  })

  it('should be able to update watched list items', () => {
    list.update([1, 3, 5])

    expect(list.currentItems).toHaveLength(3)
    expect(list.getNewItems()).toEqual([5])
    expect(list.getRemovedItems()).toEqual([2])
  })
})
