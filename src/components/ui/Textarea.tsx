import { cn } from '@/lib/utils';

export function Textarea({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>) {
  return (
    <textarea
      className={cn(
        'min-h-[80px] appearance-none rounded bg-neutral-100 px-3 py-2 text-base placeholder:text-neutral-500 hover:bg-neutral-200',
        'focus:bg-neutral-200 focus:outline-none focus:ring-0',
        className,
      )}
      {...props}
    />
  );
}
