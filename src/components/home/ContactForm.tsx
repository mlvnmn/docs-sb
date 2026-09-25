import { useContactForm } from '../../hooks/useContactForm';

export function ContactForm() {
  const { status, submit } = useContactForm();

  const buttonContent = () => {
    if (status === 'sending') {
      return (
        <>
          <span>Sending...</span> <i className="fa-solid fa-spinner fa-spin" />
        </>
      );
    }
    if (status === 'sent') {
      return (
        <>
          <span>Sent Successfully!</span> <i className="fa-solid fa-check" />
        </>
      );
    }
    if (status === 'error') {
      return (
        <>
          <span>Failed — Try Again</span> <i className="fa-solid fa-triangle-exclamation" />
        </>
      );
    }
    return (
      <>
        <span>Submit</span> <i className="fa-solid fa-arrow-up-right-from-square" />
      </>
    );
  };

  return (
    <div className="contact-form-card">
      <h3 className="form-heading">Fill your details. We'll get in touch with you.</h3>

      <form
        className="contact-form-box"
        id="contactForm"
        onSubmit={(e) => {
          e.preventDefault();
          submit(e.currentTarget);
        }}
      >
        <div className="form-group">
          <label htmlFor="contactName" className="form-label">
            What is your name?
          </label>
          <input type="text" id="contactName" name="name" placeholder="Full Name" required className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail" className="form-label">
            What's your email address?
          </label>
          <input
            type="email"
            id="contactEmail"
            name="email"
            placeholder="Email Address"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone" className="form-label">
            What's your phone number?
          </label>
          <div className="phone-input-row">
            <div className="country-pill">
              <span className="country-flag">🇮🇳</span>
              <span className="country-code">+91</span>
              <i className="fa-solid fa-chevron-down country-chevron" />
            </div>
            <input
              type="tel"
              id="contactPhone"
              name="phone"
              placeholder="Phone Number"
              required
              className="form-input phone-field"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contactMessage" className="form-label">
            What's your message?
          </label>
          <textarea
            id="contactMessage"
            name="message"
            rows={4}
            placeholder="Type your message here..."
            required
            className="form-textarea"
          />
        </div>

        <div className="form-submit-group">
          <button
            type="submit"
            className="contact-submit-btn"
            disabled={status === 'sending'}
            style={
              status === 'sent'
                ? { background: '#16a34a' }
                : status === 'error'
                  ? { background: '#dc2626' }
                  : undefined
            }
          >
            {buttonContent()}
          </button>
        </div>
      </form>
    </div>
  );
}
