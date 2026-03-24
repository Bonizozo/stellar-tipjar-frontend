interface FormErrorProps {
  id: string;
  message?: string;
}

export function FormError({ id, message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} role="status" aria-live="polite" className="mt-1 text-xs text-error">
      {message}
    </p>
  );
}
