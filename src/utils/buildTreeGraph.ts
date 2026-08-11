import type { FamilyTree, Person } from '../types/family'
import { getGenerations } from './treeLayout'

export type TreeNode = {
  id: string
  person: Person
  generation: number
}

export type TreeEdge = {
  id: string
  from: string
  to: string
  type: 'parent' | 'partner' | 'sibling'
}

export type TreeGraph = {
  nodes: TreeNode[]
  edges: TreeEdge[]
}

export function buildTreeGraph(family: FamilyTree): TreeGraph {
  const generations = getGenerations(family)

  const generationByPersonId = new Map<string, number>()

  generations.forEach((generation) => {
    generation.people.forEach((person) => {
      generationByPersonId.set(person.id, generation.level)
    })
  })

  const nodes: TreeNode[] = family.people.map((person) => ({
    id: person.id,
    person,
    generation: generationByPersonId.get(person.id) ?? 0,
  }))

  const edges: TreeEdge[] = family.relationships.map((relationship) => ({
    id: relationship.id,
    from: relationship.personAId,
    to: relationship.personBId,
    type: relationship.type,
  }))

  return {
    nodes,
    edges,
  }
}