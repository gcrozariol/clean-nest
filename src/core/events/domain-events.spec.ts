import { describe, expect, it, vi } from 'vitest'
import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber registered
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Creating an i.e. answer but not persisting it
    const aggregate = CustomAggregate.create()

    // Making sure the event was created but not dispatched
    expect(aggregate.domainEvents).toHaveLength(1)

    // Saving the i.e. answer to the database, therefore dispatching the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Making sure to remove the event after dispatch
    expect(aggregate.domainEvents).toHaveLength(0)

    // Making sure the callback was triggered
    expect(callbackSpy).toHaveBeenCalled()
  })
})
