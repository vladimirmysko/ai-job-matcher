'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

export function Button({
  className,
  disabled,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        'h-8 rounded bg-neutral-950 px-3 text-sm font-semibold text-white active:bg-neutral-800',
        'focus-visible:outline-none focus-visible:ring-0',
        'disabled:bg-neutral-100 disabled:text-neutral-400',
        className,
      )}
      disabled={disabled || pending}
      {...props}
    />
  );
}
