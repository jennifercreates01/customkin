import type { FamilyTree, Person } from '../types/family'

export type Union = {
  id: string
  partners: Person[]
  children: Person[]
}

export function getUnions(family: FamilyTree): Union[] {
  const partnerRelationships = family.relationships.filter(
    (relationship) => relationship.type === 'partner'
  )

  return partnerRelationships.map((relationship) => {
    const partnerA = family.people.find(
      (person) => person.id === relationship.personAId
    )

    const partnerB = family.people.find(
      (person) => person.id === relationship.personBId
    )

    const partners = [partnerA, partnerB].filter(
      (person): person is Person => person !== undefined
    )

    const children = family.people.filter((child) => {
      const hasParentA = family.relationships.some(
        (parentRelationship) =>
          parentRelationship.type === 'parent' &&
          parentRelationship.personAId === relationship.personAId &&
          parentRelationship.personBId === child.id
      )

      const hasParentB = family.relationships.some(
        (parentRelationship) =>
          parentRelationship.type === 'parent' &&
          parentRelationship.personAId === relationship.personBId &&
          parentRelationship.personBId === child.id
      )

      return hasParentA && hasParentB
    })

    return {
      id: `union-${relationship.id}`,
      partners,
      children,
    }
  })
}