import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

type Activity = {
  title: string;
  date: string;
  time: string;
  description: string;
};

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg leading-tight">
          {activity.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3 sm:size-4" />
            <span>{activity.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-3 sm:size-4" />
            <span>{activity.time}</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed">
          {activity.description}
        </p>
      </CardContent>
    </Card>
  );
}

