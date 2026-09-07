import { useEffect, useRef, useState } from 'react';

export type ContactFormStatus = 'idle' | 'sending' | 'sent';

export function useContactForm() {
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const submit = (form: HTMLFormElement) => {
    setStatus('sending');

    const t1 = setTimeout(() => {
      setStatus('sent');
      form.reset();

      const t2 = setTimeout(() => {
        setStatus('idle');
      }, 3000);
      timeouts.current.push(t2);
    }, 700);
    timeouts.current.push(t1);
  };

  return { status, submit };
}
