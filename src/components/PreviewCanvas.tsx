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
import PreviewPersonNode from './PreviewPersonNode'
import UnionEdge from './UnionEdge'
import UnionPointNode from './UnionPointNode'

type PreviewCanvasProps = {
  family: FamilyTree
  themeId: ThemeId
}

const nodeTypes: NodeTypes = {
  person: PreviewPersonNode,
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

  const personNodes = layoutFamilyGraph(family, {
  nodeWidth: 150,
  nodeHeight: 72,
  partnerGap: 24,
  rootUnitGap: 80,
  generationGap: 150,
  childSpacing: 210,
  rootWidth: 380,
}).map((node) => ({
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

  return (
  <div className="preview-stage">
    <div
      className="preview-artwork"
      style={{
        background: selectedTheme.canvasBackground,
        color: selectedTheme.textColor,
      }}
    >
      <header className="preview-artwork-header">
        <p
          className="preview-artwork-eyebrow"
          style={{
            color: selectedTheme.accentColor,
          }}
        >
          OUR FAMILY
        </p>

        <h2>{family.title}</h2>

        <div
          className="preview-artwork-divider"
          style={{
            background: selectedTheme.accentColor,
          }}
        />
      </header>

      <div className="preview-tree">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
fitViewOptions={{
  padding: 0.04,
  maxZoom: 1.35,
}}
minZoom={0.5}
maxZoom={1.35}
          proOptions={{ hideAttribution: true }}
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

      <footer className="preview-artwork-footer">
        CustomKin
        <span>.</span>
      </footer>
    </div>
  </div>
)
}

export default PreviewCanvas