import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";
import legalData from "@/instructions/legal.json";

export function LegalFramework() {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Scale className="size-4 sm:size-5" />
          {legalData.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-6">
          {legalData.categories.map((category, catIndex) => (
            <div key={catIndex} className="space-y-3">
              <h3 className="font-semibold text-sm sm:text-base border-b pb-2">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.articles.map((article, artIndex) => (
                  <div key={artIndex} className="space-y-1">
                    <h4 className="font-medium text-xs sm:text-sm text-primary">
                      {article.title}
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {article.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

