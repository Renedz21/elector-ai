"use client";

import { Filter } from "lucide-react";

type PlanFilterProps = {
  topics: string[];
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
};

export function PlanFilter({
  topics,
  selectedTopic,
  onTopicChange,
}: PlanFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="size-4" />
        <span>Filtrar por tema principal</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTopicChange("")}
          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
            selectedTopic === ""
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Todos
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicChange(topic)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedTopic === topic
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}

