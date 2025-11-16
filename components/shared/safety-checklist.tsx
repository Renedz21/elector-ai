"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";

const checklistItems = [
  "Llevar DNI original",
  "Llevar cédula de sufragio original",
  "Llegar con anticipación al local",
  "Planificar la ruta con anticipación",
  "Verificar horario de apertura",
  "Evitar llevar objetos de valor innecesarios",
  "Mantener documentos en lugar seguro",
  "Respetar indicaciones del personal",
];

const STORAGE_KEY = "elector_safety_checklist";

export function SafetyChecklist() {
  const [checkedItemsArray, setCheckedItemsArray] = useLocalStorage<number[]>(
    STORAGE_KEY,
    [],
    {
      serializer: (value) => JSON.stringify(value),
      deserializer: (value) => {
        try {
          return JSON.parse(value);
        } catch {
          return [];
        }
      },
    }
  );

  const checkedItems = new Set(checkedItemsArray);

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItemsArray(Array.from(newChecked));
  };

  const allChecked = checkedItems.size === checklistItems.length;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Shield className="size-4 sm:size-5" />
          Checklist de seguridad
        </CardTitle>
        {allChecked && (
          <p className="text-xs sm:text-sm text-primary font-medium mt-2">
            ¡Todo listo para el día de la votación!
          </p>
        )}
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <ul className="space-y-2 sm:space-y-3">
          {checklistItems.map((item, index) => {
            const isChecked = checkedItems.has(index);
            return (
              <li
                key={index}
                onClick={() => toggleItem(index)}
                className={cn(
                  "flex items-center gap-3 p-2 sm:p-3 rounded-md cursor-pointer transition-colors",
                  isChecked
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "flex size-5 sm:size-6 items-center justify-center rounded border-2 shrink-0 transition-colors",
                    isChecked
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/30"
                  )}
                >
                  {isChecked && <Check className="size-3 sm:size-4" />}
                </div>
                <span className="text-xs sm:text-sm leading-relaxed flex-1">
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

