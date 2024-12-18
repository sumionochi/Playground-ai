import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { PlaygroundTaskType } from "@/schema/playgroundTask";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { MapPinCheckInside } from "lucide-react";

export default function TaskMenu() {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion type="multiple" className="w-full" defaultValue={["extraction", "ai", "translation"]}>
        {/* Source Data Category */}
        {/* <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">Source Data</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={PlaygroundTaskType.LAUNCH_BROWSER} />
            <TaskMenuBtn taskType={PlaygroundTaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={PlaygroundTaskType.EXTRACT_TEXT_FROM_ELEMENT} />
          </AccordionContent>
        </AccordionItem> */}

        {/* AI Tasks Category */}
        <AccordionItem value="ai">
          <AccordionTrigger className="font-bold">AI Tasks</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={PlaygroundTaskType.SUMMARIZATION} />
            <TaskMenuBtn taskType={PlaygroundTaskType.WRITER} />
            <TaskMenuBtn taskType={PlaygroundTaskType.REWRITER} />
            <TaskMenuBtn taskType={PlaygroundTaskType.PROMPT} />
          </AccordionContent>
        </AccordionItem>

        {/* Translation Tasks Category */}
        <AccordionItem value="translation">
          <AccordionTrigger className="font-bold">Translation</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={PlaygroundTaskType.TRANSLATION} />
            <TaskMenuBtn taskType={PlaygroundTaskType.LANGUAGE_DETECTION} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

function TaskMenuBtn({ taskType }: { taskType: PlaygroundTaskType }) {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: React.DragEvent, type: PlaygroundTaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant="secondary"
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <div className="flex gap-2">
        <task.icon size={20} />
        <span>{task.label}</span>
      </div>
    </Button>
  );
}
