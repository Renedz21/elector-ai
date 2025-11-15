import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

type InstructionListProps = {
  title: string;
  instructions: string[];
};

export function InstructionList({ title, instructions }: InstructionListProps) {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <ol className="space-y-2 sm:space-y-3">
          {instructions.map((instruction, index) => (
            <li key={index} className="flex gap-2 sm:gap-3">
              <CheckCircle2 className="mt-0.5 size-4 sm:size-5 shrink-0 text-primary" />
              <span className="text-xs sm:text-sm leading-relaxed flex-1">
                {instruction}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

