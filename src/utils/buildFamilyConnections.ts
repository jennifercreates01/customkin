import type { Edge, Node } from '@xyflow/react'
import type { FamilyTree } from '../types/family'
import { getUnions } from './familyUnits'

const NODE_WIDTH = 180
const NODE_HEIGHT = 120

export type FamilyConnections = {
  unionNodes: Node[]
  unionEdges: Edge[]
  childEdges: Edge[]
}

export function buildFamilyConnections(
  family: FamilyTree,
  personNodes: Node[]
): FamilyConnections {
  const unionNodes: Node[] = []
  const unionEdges: Edge[] = []
  const childEdges: Edge[] = []

  const unions = getUnions(family)

  unions.forEach((union) => {
    if (union.partners.length !== 2) {
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

    const leftNode =
      personA.position.x <= personB.position.x
        ? personA
        : personB

    const rightNode =
      personA.position.x <= personB.position.x
        ? personB
        : personA

    const leftHandleX =
      leftNode.position.x + NODE_WIDTH

    const rightHandleX =
      rightNode.position.x

    const unionX =
      (leftHandleX + rightHandleX) / 2

    const unionY =
      leftNode.position.y + NODE_HEIGHT / 2

    const unionNodeId = `${union.id}-node`
unionNodes.push({
  id: unionNodeId,
  type: 'unionPoint',

  position: {
    x: unionX - 1,
    y: unionY - 1,
  },

  width: 2,
  height: 2,

  data: {},

  draggable: false,
  selectable: false,
})

    unionEdges.push({
      id: `${union.id}-partners`,
      source: leftNode.id,
      target: rightNode.id,
      sourceHandle: 'partner-right',
      targetHandle: 'partner-left',
      type: 'union',
    })

    union.children.forEach((child) => {
      childEdges.push({
        id: `${union.id}-${child.id}`,
        source: unionNodeId,
        target: child.id,
        sourceHandle: 'union-source',
        targetHandle: 'parent-target',
        type: 'family',
      })
    })
  })

  return {
    unionNodes,
    unionEdges,
    childEdges,
  }
}