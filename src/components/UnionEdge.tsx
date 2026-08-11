import {
  BaseEdge,
  type EdgeProps,
} from '@xyflow/react'

function UnionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
}: EdgeProps) {
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
      style={style}
    />
  )
}

export default UnionEdge