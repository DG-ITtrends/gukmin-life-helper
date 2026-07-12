const normalize = (value = '') => value.toLocaleLowerCase('ko-KR').replace(/\s+/g, ' ').trim();

export function filterJourneys(items, { query = '', category = '전체' } = {}) {
  const needle = normalize(query);
  return items.filter((item) => {
    const inCategory = category === '전체' || item.category === category;
    const haystack = normalize([
      item.title, item.summary, item.category,
      ...(item.agencies || []),
      ...(item.services || []).map((service) => service.name),
      ...(item.keywords || [])
    ].join(' '));
    return inCategory && (!needle || haystack.includes(needle));
  });
}

export function summarizeJourneys(items) {
  return {
    journeys: items.length,
    services: items.reduce((sum, item) => sum + item.services.length, 0),
    agencies: new Set(items.flatMap((item) => item.agencies)).size
  };
}

export function toggleComparison(selected, slug, limit = 3) {
  if (selected.includes(slug)) return selected.filter((item) => item !== slug);
  if (selected.length >= limit) return selected;
  return [...selected, slug];
}
