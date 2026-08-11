import {
  Background,
  Controls,
  ReactFlow,
  type NodeMouseHandler,
  type NodeTypes,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import type { FamilyTree, Person } from '../types/family'
import { buildFamilyConnections } from '../utils/buildFamilyConnections'
import { layoutFamilyGraph } from '../utils/layoutFamilyGraph'
import FamilyEdge from './FamilyEdge'
import PersonNode from './PersonNode'
import UnionEdge from './UnionEdge'
import UnionPointNode from './UnionPointNode'

type TreeCanvasProps = {
  family: FamilyTree
  onSelectPerson: (person: Person) => void
}

const nodeTypes: NodeTypes = {
  person: PersonNode,
  unionPoint: UnionPointNode,
}

const edgeTypes = {
  union: UnionEdge,
  family: FamilyEdge,
}

function TreeCanvas({
  family,
  onSelectPerson,
}: TreeCanvasProps) {
  const personNodes = layoutFamilyGraph(family)

  const {
    unionNodes,
    unionEdges,
    childEdges,
  } = buildFamilyConnections(family, personNodes)

  const nodes = [
    ...personNodes,
    ...unionNodes,
  ]

  const edges = [
    ...unionEdges,
    ...childEdges,
  ]

  const handleNodeClick: NodeMouseHandler = (
    _event,
    node
  ) => {
    if (node.type !== 'person') {
      return
    }

    const person = family.people.find(
      (candidate) => candidate.id === node.id
    )

    if (person) {
      onSelectPerson(person)
    }
  }

  return (
    <div className="flow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={handleNodeClick}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default TreeCanvas