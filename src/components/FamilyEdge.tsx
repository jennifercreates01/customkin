import {
  BaseEdge,
  type EdgeProps,
} from '@xyflow/react'

function FamilyEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
}: EdgeProps) {
  const branchY =
    sourceY + (targetY - sourceY) * 0.45

  const path = [
    `M ${sourceX} ${sourceY}`,
    `L ${sourceX} ${branchY}`,
    `L ${targetX} ${branchY}`,
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

export default FamilyEdge