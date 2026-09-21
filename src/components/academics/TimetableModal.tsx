import { useEffect } from 'react';
import type { TimetableSchedule } from '../../types/content';

interface TimetableModalProps {
  label: string | null;
  schedule: TimetableSchedule | null;
  onClose: () => void;
}

export function TimetableModal({ label, schedule, onClose }: TimetableModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (label) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [label, onClose]);

  if (!label || !schedule) return null;

  return (
    <div className="timetable-modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="timetable-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="timetable-modal-close" onClick={onClose} aria-label="Close timetable">
          <i className="fa-solid fa-xmark" />
        </button>

        <h3 className="timetable-modal-title">{label} — Timetable</h3>

        <div className="timetable-modal-scroll">
          <table className="timetable-table">
            <thead>
              <tr>
                <th>Day</th>
                {schedule.periodLabels.map((label) => (
                  <th key={label}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.rows.map((row) => (
                <tr key={row.day}>
                  <td className="timetable-day-cell">{row.day}</td>
                  {row.periods.map((period, index) => (
                    <td key={index} className={period.isLab ? 'timetable-lab-cell' : undefined}>
                      {period.isLab ? (
                        <span className="timetable-lab-badge">{period.subject}</span>
                      ) : (
                        <span className="timetable-subject">{period.subject}</span>
                      )}
                      {period.instructor && <span className="timetable-instructor">({period.instructor})</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
