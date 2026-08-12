import {
  BaseEdge,
  type EdgeProps,
} from '@xyflow/react'

type UnionEdgeData = {
  lineColor?: string
}

function UnionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  data,
}: EdgeProps) {
  const edgeData = data as UnionEdgeData | undefined

  const centerX = (sourceX + targetX) / 2
  const centerY = (sourceY + targetY) / 2

  const path = [
    `M ${sourceX} ${sourceY}`,
    `L ${centerX} ${centerY}`,
    `L ${targetX} ${targetY}`,
  ].join(' ')

  return (
    <BaseEdge
      id={id}
      path={path}
      style={{
        ...style,
        stroke: edgeData?.lineColor ?? '#877b73',
      }}
    />
  )
}

export default UnionEdge