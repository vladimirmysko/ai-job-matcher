import { cn } from '@/lib/utils';

export function Input({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <input
      className={cn(
        'h-10 appearance-none rounded bg-neutral-100 px-3 text-base placeholder:text-neutral-500 hover:bg-neutral-200',
        'focus:bg-neutral-200 focus:outline-none focus:ring-0',
        className,
      )}
      {...props}
    />
  );
}
