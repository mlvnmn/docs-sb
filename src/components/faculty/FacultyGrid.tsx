import { useFaculty } from '../../hooks/useFaculty';
import { FacultyCard } from './FacultyCard';

export function FacultyGrid() {
  const faculty = useFaculty();

  return (
    <div className="people-grid" id="facultyGrid">
      {faculty.map((member, i) => (
        <FacultyCard member={member} eager={i < 3} key={member.id} />
      ))}
    </div>
  );
}
