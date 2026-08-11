export type Person = {
  id: string
  firstName: string
  middleName?: string
  lastName?: string
  maidenName?: string
  birthDate?: string
  deathDate?: string
  photo?: string
}

export type RelationshipType =
  | 'parent'
  | 'partner'

export type BuilderRelationshipType =
  | 'parent'
  | 'partner'
  | 'child'
  | 'sibling'

export type Relationship = {
  id: string
  personAId: string
  personBId: string
  type: RelationshipType
}

export type FamilyTree = {
  id: string
  title: string
  people: Person[]
  relationships: Relationship[]
  theme: string
}