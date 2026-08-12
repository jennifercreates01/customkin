import {
  BaseEdge,
  type EdgeProps,
} from '@xyflow/react'

type FamilyEdgeData = {
  lineColor?: string
}

function FamilyEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  data,
}: EdgeProps) {
  const edgeData = data as FamilyEdgeData | undefined

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
      style={{
        ...style,
        stroke: edgeData?.lineColor ?? '#877b73',
      }}
    />
  )
}

export default FamilyEdge