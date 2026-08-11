import {
  Handle,
  Position,
} from '@xyflow/react'

function UnionPointNode() {
  return (
    <div
      style={{
        width: 2,
        height: 2,
        opacity: 0,
        pointerEvents: 'none',
      }}
    >
      <Handle
        id="union-source"
        type="source"
        position={Position.Bottom}
        style={{
          width: 2,
          height: 2,
          minWidth: 2,
          minHeight: 2,
          border: 'none',
          background: 'transparent',
        }}
      />
    </div>
  )
}

export default UnionPointNode