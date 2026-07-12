import { documentRequirements01to02 } from './document-requirements-01-02.js';
import { documentRequirements03to05 } from './document-requirements-03-05.js';
import { documentRequirements06to10 } from './document-requirements-06-10.js';
import { documentRequirements11to15 } from './document-requirements-11-15.js';
import { documentRequirements16to20 } from './document-requirements-16-20.js';
import { documentRequirements21to25 } from './document-requirements-21-25.js';
import { documentRequirements26to30 } from './document-requirements-26-30.js';
import { documentRequirements31to35 } from './document-requirements-31-35.js';
import { documentRequirements36to37 } from './document-requirements-36-37.js';
import { documentRequirements38to40 } from './document-requirements-38-40.js';
import { documentRequirements41to45 } from './document-requirements-41-45.js';
import { documentRequirements46to50 } from './document-requirements-46-50.js';

export const documentRequirements = {
  ...documentRequirements01to02,
  ...documentRequirements03to05,
  ...documentRequirements06to10,
  ...documentRequirements11to15,
  ...documentRequirements16to20,
  ...documentRequirements21to25,
  ...documentRequirements26to30,
  ...documentRequirements31to35,
  ...documentRequirements36to37,
  ...documentRequirements38to40,
  ...documentRequirements41to45,
  ...documentRequirements46to50,
};

export function attachDocumentRequirements(journey) {
  const byService = documentRequirements[journey.slug] || {};
  const services = journey.services.map(service => ({
    ...service,
    documentRequirements: byService[service.name] || {
      required: [],
      conditional: [],
      autoChecked: [],
      outputs: [],
      verificationStatus: 'verification-needed',
      sourceUrl: service.sourceUrl,
    },
  }));
  const documentCoverage = {
    total: services.length,
    verified: services.filter(service => service.documentRequirements.verificationStatus === 'verified').length,
    mapped: services.filter(service => byService[service.name]).length,
  };
  return { ...journey, services, documentCoverage };
}
