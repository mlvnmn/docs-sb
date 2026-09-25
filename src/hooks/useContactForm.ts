import { useEffect, useRef, useState } from 'react';

export type ContactFormStatus = 'idle' | 'sending' | 'sent' | 'error';

// Google Forms has no CORS-enabled API, but its formResponse endpoint accepts
// a plain POST keyed by each field's entry.<id> name, so a no-backend site can
// still collect real submissions by posting straight to it in no-cors mode.
const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSfMLIHDcbhDwpyRFTzxcubHHwyTAKa9WQoN_E19x1AjaxcAMg/formResponse';

const FIELD_ENTRIES = {
  name: 'entry.667280591',
  email: 'entry.1667889705',
  phone: 'entry.1660689787',
  message: 'entry.991794932',
};

export function useContactForm() {
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const submit = async (form: HTMLFormElement) => {
    setStatus('sending');

    const data = new FormData(form);
    const params = new URLSearchParams();
    params.set(FIELD_ENTRIES.name, (data.get('name') as string) ?? '');
    params.set(FIELD_ENTRIES.email, (data.get('email') as string) ?? '');
    params.set(FIELD_ENTRIES.phone, (data.get('phone') as string) ?? '');
    params.set(FIELD_ENTRIES.message, (data.get('message') as string) ?? '');

    try {
      // mode: 'no-cors' makes the response opaque (we can't read status), but
      // Google Forms still records the submission; a thrown fetch here means
      // an actual network failure, which is what we surface as an error.
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });
      setStatus('sent');
      form.reset();

      const t = setTimeout(() => setStatus('idle'), 3000);
      timeouts.current.push(t);
    } catch {
      setStatus('error');

      const t = setTimeout(() => setStatus('idle'), 3000);
      timeouts.current.push(t);
    }
  };

  return { status, submit };
}
