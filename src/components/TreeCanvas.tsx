import {
  Background,
  Controls,
  ReactFlow,
  type NodeTypes,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import type { FamilyTree } from '../types/family'
import { buildFamilyConnections } from '../utils/buildFamilyConnections'
import { layoutFamilyGraph } from '../utils/layoutFamilyGraph'
import FamilyEdge from './FamilyEdge'
import PersonNode from './PersonNode'
import UnionEdge from './UnionEdge'
import UnionPointNode from './UnionPointNode'

type TreeCanvasProps = {
  family: FamilyTree
}

const nodeTypes: NodeTypes = {
  person: PersonNode,
  unionPoint: UnionPointNode,
}

const edgeTypes = {
  union: UnionEdge,
  family: FamilyEdge,
}

function TreeCanvas({ family }: TreeCanvasProps) {
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

  return (
    <div className="flow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
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