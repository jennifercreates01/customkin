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
import JunctionNode from './JunctionNode'
import PersonNode from './PersonNode'

type TreeCanvasProps = {
  family: FamilyTree
}

const nodeTypes: NodeTypes = {
  person: PersonNode,
  junction: JunctionNode,
}

function TreeCanvas({ family }: TreeCanvasProps) {


  const personNodes = layoutFamilyGraph(family)

  const {
    junctionNodes,
    familyEdges,
  } = buildFamilyConnections(family, personNodes)



  const nodes = [
    ...personNodes,
    ...junctionNodes,
  ]

const edges = [
  ...familyEdges,
]

  return (
    <div className="flow-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
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