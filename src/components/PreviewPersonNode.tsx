import {
  Handle,
  Position,
  type NodeProps,
} from '@xyflow/react'

import type { CustomKinTheme } from '../types/theme'

type PreviewPersonNodeData = {
  label: string
  firstName: string
  theme: CustomKinTheme
}

function PreviewPersonNode({ data }: NodeProps) {
  const personData = data as PreviewPersonNodeData
  const theme = personData.theme

  return (
    <div
      className="preview-person"
      style={{
        color: theme.textColor,
      }}
    >
      <Handle
        id="parent-target"
        type="target"
        position={Position.Top}
        className="preview-person-handle"
      />

      <Handle
        id="partner-left"
        type="target"
        position={Position.Left}
        className="preview-person-handle"
      />

      <div
        className="preview-person-initial"
        style={{
          borderColor: theme.accentColor,
          color: theme.accentColor,
        }}
      >
        {personData.firstName.charAt(0)}
      </div>

      <strong>{personData.label}</strong>

      <Handle
        id="partner-right"
        type="source"
        position={Position.Right}
        className="preview-person-handle"
      />

      <Handle
        id="child-source"
        type="source"
        position={Position.Bottom}
        className="preview-person-handle"
      />
    </div>
  )
}

export default PreviewPersonNode