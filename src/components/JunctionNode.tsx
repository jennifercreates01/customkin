import {
  Handle,
  Position,
} from '@xyflow/react'

function JunctionNode() {
  return (
    <div
      style={{
        width: 0,
        height: 0,
        position: 'relative',
      }}
    >
      <Handle
        id="junction-left"
        type="target"
        position={Position.Left}
        style={{
          width: 1,
          height: 1,
          minWidth: 0,
          minHeight: 0,
          opacity: 0,
        }}
      />

      <Handle
        id="junction-right"
        type="target"
        position={Position.Right}
        style={{
          width: 1,
          height: 1,
          minWidth: 0,
          minHeight: 0,
          opacity: 0,
        }}
      />

      <Handle
        id="junction-source"
        type="source"
        position={Position.Bottom}
        style={{
          width: 1,
          height: 1,
          minWidth: 0,
          minHeight: 0,
          opacity: 0,
        }}
      />
    </div>
  )
}

export default JunctionNode