import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import ballotData from "@/instructions/ballot.json";

export function BallotInstructions() {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <FileText className="size-4 sm:size-5" />
          {ballotData.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-6">
          {ballotData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              <h3 className="font-semibold text-sm sm:text-base">
                {section.title}
              </h3>
              <ol className="space-y-2 sm:space-y-3">
                {section.instructions.map((instruction, instIndex) => (
                  <li key={instIndex} className="flex gap-3">
                    <span className="mt-0.5 size-5 shrink-0 text-primary font-semibold">
                      {instIndex + 1}.
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed flex-1">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

