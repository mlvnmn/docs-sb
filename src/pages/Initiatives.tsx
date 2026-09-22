import '../styles/routes/coming-soon.css';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SmartLink } from '../components/shared/SmartLink';
import { Footer } from '../components/layout/Footer';

export function Initiatives() {
  useDocumentMeta(
    'Initiatives | Department of Computer Science | St Berchmans College Autonomous',
    'Department initiatives — coming soon.',
  );

  return (
    <>
      <section className="coming-soon-page">
        <div className="coming-soon-container">
          <h1 className="coming-soon-title">Coming Soon</h1>
          <SmartLink to="/" className="coming-soon-btn-ghost">
            Back To Home
          </SmartLink>
        </div>
      </section>
      <Footer />
    </>
  );
}
