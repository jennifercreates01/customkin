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
import { themes } from '../data/themes'
import type { ThemeId } from '../types/theme'

type TreeCanvasProps = {
  family: FamilyTree
  onSelectPerson: (person: Person) => void
  themeId: ThemeId
  
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
  themeId,
}: TreeCanvasProps) {
  const selectedTheme =
    themes.find((theme) => theme.id === themeId) ??
    themes[0]

 const personNodes = layoutFamilyGraph(family).map((node) => ({
  ...node,
  data: {
    ...node.data,
    theme: selectedTheme,
  },
}))

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
].map((edge) => ({
  ...edge,

  data: {
    ...edge.data,
    lineColor: selectedTheme.lineColor,
  },
}))

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
    <div
  className="flow-wrapper"
  style={{
    background: selectedTheme.canvasBackground,
  }}
>
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
        <Background
  color={selectedTheme.cardBorder}
  gap={20}
/>
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default TreeCanvas