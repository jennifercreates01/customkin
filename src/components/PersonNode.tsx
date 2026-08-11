import {
  Handle,
  Position,
  type NodeProps,
} from '@xyflow/react'

type PersonNodeData = {
  label: string
  firstName: string
}

function PersonNode({ data }: NodeProps) {
  const personData = data as PersonNodeData

  return (
    <div className="flow-person-card">
      <Handle
        id="parent-target"
        type="target"
        position={Position.Top}
        className="person-handle"
      />

      <Handle
        id="partner-left"
        type="target"
        position={Position.Left}
        className="person-handle"
      />

      <div className="flow-person-avatar">
        {personData.firstName.charAt(0)}
      </div>

      <strong>{personData.label}</strong>

      <Handle
        id="partner-right"
        type="source"
        position={Position.Right}
        className="person-handle"
      />

      <Handle
        id="child-source"
        type="source"
        position={Position.Bottom}
        className="person-handle"
      />
    </div>
  )
}

export default PersonNode