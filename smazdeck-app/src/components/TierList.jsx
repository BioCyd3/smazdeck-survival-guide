import React from 'react';
import './TierList.css';

const TierList = ({ title, description, tiers }) => {
  const tierOrder = ['S', 'A', 'B', 'C', 'F'];

  return (
    <div className="tier-list">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="tiers-container">
        {tierOrder.map(tier => {
          const smazs = tiers[tier];
          if (!smazs || smazs.length === 0) return null;

          return (
            <div key={tier} className="tier-row">
              <div className={`tier-label tier-${tier.toLowerCase()}`}>
                {tier}
              </div>
              <div className="smaz-cards">
                {smazs.map(smaz => (
                  <div key={smaz.name} className="smaz-card">
                    <h3>{smaz.name}</h3>
                    {smaz.explanation && (
                      <p>
                        <strong>Explanation:</strong> {smaz.explanation}
                      </p>
                    )}
                    {smaz.synergies && (
                      <p>
                        <strong>Synergies:</strong> {smaz.synergies}
                      </p>
                    )}
                    {smaz.relevant_info && (
                      <p>
                        <strong>Info:</strong> {smaz.relevant_info}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TierList;
