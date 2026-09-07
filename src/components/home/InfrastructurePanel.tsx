import { useState } from 'react';
import { infrastructureLabs, infrastructureOthers } from '../../data/infrastructure';
import type { InfrastructureLab } from '../../types/content';

type InfraTab = 'labs' | 'others';

const TAB_DATA: Record<InfraTab, InfrastructureLab[]> = {
  labs: infrastructureLabs,
  others: infrastructureOthers,
};

export function InfrastructurePanel() {
  const [activeTab, setActiveTab] = useState<InfraTab>('labs');

  return (
    <div className="infra-panel">
      <h2 className="infra-title">INFRASTRUCTURE</h2>

      <div className="infra-tab-switch">
        <img src="/assets/images/dept_logo.jpeg" alt="" className="infra-tab-logo" />
        <button
          type="button"
          className={`infra-tab${activeTab === 'labs' ? ' active' : ''}`}
          onClick={() => setActiveTab('labs')}
        >
          Labs
        </button>
        <button
          type="button"
          className={`infra-tab${activeTab === 'others' ? ' active' : ''}`}
          onClick={() => setActiveTab('others')}
        >
          Others
        </button>
      </div>

      <div className="infra-lab-list-outer">
        <div className={`infra-lab-list${activeTab === 'others' ? ' infra-lab-list--others' : ''}`}>
          <div className="infra-divider" aria-hidden="true" />

          {TAB_DATA[activeTab].map((lab, i) => (
            <div className={`infra-lab-row${i % 2 === 1 ? ' reverse' : ''}`} key={lab.id}>
              <div className="infra-lab-info">
                <span className="infra-lab-name">{lab.name}</span>
                {lab.description && <p className="infra-lab-desc">{lab.description}</p>}
              </div>

              <div className="infra-folder-wrap">
                <div className="folder-stack">
                  {lab.images.map((image, cardIndex) => (
                    <div className={`stack-card card-${cardIndex + 1}`} key={cardIndex}>
                      <img loading="lazy" decoding="async" src={image} alt={lab.name} className="stack-img" />
                    </div>
                  ))}

                  <div className="folder-back" />

                  <div className="folder-front">
                    <div className="folder-label-content">
                      <i className="fa-solid fa-folder-open folder-icon" />
                      <span className="folder-text">CS DEPARTMENT LABS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
