import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

type SafetyCardProps = {
  title: string;
  recommendations: string[];
};

export function SafetyCard({ title, recommendations }: SafetyCardProps) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="size-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-sm leading-relaxed flex-1">
                {recommendation}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

