import type { Edge, Node } from '@xyflow/react'
import type { FamilyTree } from '../types/family'
import { getUnions } from './familyUnits'

export type FamilyConnections = {
  junctionNodes: Node[]
  familyEdges: Edge[]
}

export function buildFamilyConnections(
  family: FamilyTree,
  personNodes: Node[]
): FamilyConnections {
  const junctionNodes: Node[] = []
  const familyEdges: Edge[] = []

  const unions = getUnions(family)

  unions.forEach((union) => {
    if (union.partners.length !== 2 || union.children.length === 0) {
      return
    }

    const [partnerA, partnerB] = union.partners

    const personA = personNodes.find(
      (node) => node.id === partnerA.id
    )

    const personB = personNodes.find(
      (node) => node.id === partnerB.id
    )

    if (!personA || !personB) {
      return
    }

    const junctionId = `junction-${union.id}`

  const NODE_WIDTH = 180
const NODE_HEIGHT = 120

const junctionX =
  (personA.position.x + personB.position.x + NODE_WIDTH) / 2

const junctionY =
  personA.position.y + NODE_HEIGHT / 2

    junctionNodes.push({
      id: junctionId,
      type: 'junction',
      position: {
        x: junctionX,
        y: junctionY,
      },
      data: {},
      draggable: false,
      selectable: false,
    })

    familyEdges.push({
      id: `${junctionId}-partner-a`,
      source: personA.id,
      target: junctionId,
      sourceHandle: 'partner-right',
      targetHandle: 'junction-left',
      type: 'straight',
    })

    familyEdges.push({
      id: `${junctionId}-partner-b`,
      source: personB.id,
      target: junctionId,
      sourceHandle: 'partner-left',
      targetHandle: 'junction-right',
      type: 'straight',
    })

    union.children.forEach((child) => {
      familyEdges.push({
        id: `${junctionId}-${child.id}`,
        source: junctionId,
        target: child.id,
        sourceHandle: 'junction-source',
        targetHandle: 'parent-target',
        type: 'step',
      })
    })
  })

  return {
    junctionNodes,
    familyEdges,
  }
}