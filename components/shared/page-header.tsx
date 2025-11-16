type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8 space-y-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}
