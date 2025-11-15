import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

type Step = {
  number: number;
  title: string;
  description: string;
};

type InstructionsData = {
  title: string;
  phase: string;
  steps: Step[];
};

export function MesaInstructionsViewer({ data }: { data: InstructionsData }) {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-4 sm:space-y-6">
          {data.steps.map((step) => (
            <div key={step.number} className="flex gap-3 sm:gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm sm:text-base">
                  {step.number}
                </div>
                {step.number < data.steps.length && (
                  <div className="w-0.5 h-full bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4 sm:pb-6">
                <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

