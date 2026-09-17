import type { FacultyMember } from '../../types/content';
import { FacultyCardArch } from './FacultyCardArch';
import { FacultyCardPill } from './FacultyCardPill';
import { FacultyCardHorizontal } from './FacultyCardHorizontal';
import { FacultyCardTallPhoto } from './FacultyCardTallPhoto';
import { FacultyCardCenterSplit } from './FacultyCardCenterSplit';

interface FacultyClusterProps {
  id: string;
  members: FacultyMember[];
  eager?: boolean;
  wideTallPhoto?: boolean;
}

export function FacultyCluster({ id, members, eager = false, wideTallPhoto = false }: FacultyClusterProps) {
  const [arch, pill, horizA, horizB, tall, split] = members;

  return (
    <section className="fg-cluster" id={id}>
      <FacultyCardArch member={arch} eager={eager} />
      <FacultyCardPill member={pill} eager={eager} />
      <div className="fg-stack">
        <FacultyCardHorizontal member={horizA} eager={eager} />
        <FacultyCardHorizontal member={horizB} mirror eager={eager} />
      </div>
      <FacultyCardTallPhoto member={tall} wide={wideTallPhoto} eager={eager} />
      <FacultyCardCenterSplit member={split} eager={eager} />
    </section>
  );
}
