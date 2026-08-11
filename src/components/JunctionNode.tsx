import {
  Handle,
  Position,
} from '@xyflow/react'

function JunctionNode() {
  return (
    <div className="junction-node">
      <Handle
        id="junction-left"
        type="target"
        position={Position.Left}
        className="junction-handle"
      />

      <Handle
        id="junction-right"
        type="target"
        position={Position.Right}
        className="junction-handle"
      />

      <Handle
        id="junction-source"
        type="source"
        position={Position.Bottom}
        className="junction-handle"
      />
    </div>
  )
}

export default JunctionNode