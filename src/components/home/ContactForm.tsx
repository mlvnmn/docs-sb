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
            What is your name?<span className="form-req">*</span>
          </label>
          <input type="text" id="contactName" name="name" placeholder="Full Name" required className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail" className="form-label">
            What's your email address?<span className="form-req">*</span>
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
            What's your phone number?<span className="form-req">*</span>
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
            What's your message?<span className="form-req">*</span>
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

        <div className="form-consent-group">
          <input type="checkbox" id="contactConsent" required className="consent-checkbox" />
          <label htmlFor="contactConsent" className="consent-text">
            By clicking submit, I agree to the{' '}
            <a href="#" className="policy-link">
              Terms &amp; Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="policy-link">
              Privacy Policy
            </a>{' '}
            and give my consent to receive updates through SMS/Email.
          </label>
        </div>

        <div className="form-submit-group">
          <button
            type="submit"
            className="contact-submit-btn"
            disabled={status === 'sending'}
            style={status === 'sent' ? { background: '#16a34a' } : undefined}
          >
            {buttonContent()}
          </button>
        </div>
      </form>
    </div>
  );
}
