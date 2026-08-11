import type { FamilyTree, Person } from '../types/family'

export type Generation = {
  level: number
  people: Person[]
}

export function getGenerations(family: FamilyTree): Generation[] {
  const levels = new Map<string, number>()

  family.people.forEach((person) => {
    levels.set(person.id, 0)
  })

  const parentRelationships = family.relationships.filter(
    (relationship) => relationship.type === 'parent'
  )

  const partnerRelationships = family.relationships.filter(
    (relationship) => relationship.type === 'partner'
  )

  let changed = true
  let passes = 0
  const maxPasses = family.people.length * 2

  while (changed && passes < maxPasses) {
    changed = false
    passes += 1

    parentRelationships.forEach((relationship) => {
      const parentLevel = levels.get(relationship.personAId) ?? 0
      const childLevel = levels.get(relationship.personBId) ?? 0

      const requiredChildLevel = parentLevel + 1

      if (childLevel < requiredChildLevel) {
        levels.set(relationship.personBId, requiredChildLevel)
        changed = true
      }
    })

    partnerRelationships.forEach((relationship) => {
      const personALevel = levels.get(relationship.personAId) ?? 0
      const personBLevel = levels.get(relationship.personBId) ?? 0

      const partnerLevel = Math.max(personALevel, personBLevel)

      if (personALevel !== partnerLevel) {
        levels.set(relationship.personAId, partnerLevel)
        changed = true
      }

      if (personBLevel !== partnerLevel) {
        levels.set(relationship.personBId, partnerLevel)
        changed = true
      }
    })
  }

  const generationMap = new Map<number, Person[]>()

  family.people.forEach((person) => {
    const level = levels.get(person.id) ?? 0
    const people = generationMap.get(level) ?? []

    people.push(person)
    generationMap.set(level, people)
  })

  return Array.from(generationMap.entries())
    .sort(([levelA], [levelB]) => levelA - levelB)
    .map(([level, people]) => ({
      level,
      people,
    }))
}