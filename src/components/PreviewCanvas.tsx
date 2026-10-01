import {
  ReactFlow,
  type NodeTypes,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import type { FamilyTree } from '../types/family'
import type { ThemeId } from '../types/theme'
import { themes } from '../data/themes'
import { buildFamilyConnections } from '../utils/buildFamilyConnections'
import { layoutFamilyGraph } from '../utils/layoutFamilyGraph'

import FamilyEdge from './FamilyEdge'
import PersonNode from './PersonNode'
import UnionEdge from './UnionEdge'
import UnionPointNode from './UnionPointNode'

type PreviewCanvasProps = {
  family: FamilyTree
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

function PreviewCanvas({
  family,
  themeId,
}: PreviewCanvasProps) {
  const selectedTheme =
    themes.find((theme) => theme.id === themeId) ??
    themes[0]

  const personNodes = layoutFamilyGraph(family).map(
    (node) => ({
      ...node,
      data: {
        ...node.data,
        theme: selectedTheme,
      },
    })
  )

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

  return (
    <div
      className="preview-canvas"
      style={{
        background: selectedTheme.canvasBackground,
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      />
    </div>
  )
}

export default PreviewCanvas