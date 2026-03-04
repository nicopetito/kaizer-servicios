interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, description, action }: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-kaizer-border bg-white">
      <div>
        <h1 className="text-xl font-bold text-kaizer-white">{title}</h1>
        {description && (
          <p className="text-sm text-kaizer-muted mt-0.5">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
