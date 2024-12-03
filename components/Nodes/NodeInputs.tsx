import { cn } from "@/lib/utils";
import { TaskParam } from "@/schema/playgroundTask";
import { Handle, Position, useEdges } from "@xyflow/react";
import { ReactNode } from "react";
import NodeField from "./NodeField";
import { ColorForHandle } from "./Common";

export function NodeInputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

export function NodeInput({ input, nodeId }: { input: TaskParam; nodeId: string }) {
  const edges = useEdges(); 
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          isConnectable={!isConnected}
          position={Position.Left}
          className={cn(
            "bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}
