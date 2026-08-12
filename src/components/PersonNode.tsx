import {
  Handle,
  Position,
  type NodeProps,
} from '@xyflow/react'

import type { CustomKinTheme } from '../types/theme'

type PersonNodeData = {
  label: string
  firstName: string
  theme: CustomKinTheme
}

function PersonNode({ data }: NodeProps) {
  const personData = data as PersonNodeData
  const theme = personData.theme

  return (
    <div
      className="flow-person-card"
      style={{
        background: theme.cardBackground,
        borderColor: theme.cardBorder,
        color: theme.textColor,
      }}
    >
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

      <div
        className="flow-person-avatar"
        style={{
          background: theme.accentColor,
          color: '#ffffff',
        }}
      >
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