const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const groupFor = { 'current-release': 'Current integrations', 'historical-integration': 'Historical integrations' };
export function validateCatalog(homepage, packages) {
  const errors = [], used = new Set();
  const groups = new Set((homepage.projectTypes || []).map(group => group.title));
  for (const card of homepage.projects || []) {
    if (!['title','link','details','type'].every(key => nonempty(card[key]))) { errors.push('Empty or incomplete project card'); continue; }
    const source = packages.find(entry => entry.route === card.link);
    if (!source || !groupFor[source.status]) { errors.push(`Unverified catalog entry: ${card.title}`); continue; }
    if (!groups.has(card.type) || card.type !== groupFor[source.status]) errors.push(`${source.name}: ${source.status} belongs in ${groupFor[source.status]}`);
    if (used.has(card.link)) errors.push(`Duplicate catalog route: ${card.link}`);
    used.add(card.link);
  }
  for (const source of packages.filter(entry => groupFor[entry.status])) if (!used.has(source.route)) errors.push(`Missing catalog entry: ${source.name}`);
  return errors;
}
export function validateDocument(data, source) {
  const errors = [];
  if (!nonempty(data.title) || !nonempty(data.description)) errors.push(`${source.name}: missing title or description`);
  if (source.status === 'unverified-placeholder') {
    if (data.packageStatus !== source.status || data.packageVersion || data.sourceCommit) errors.push(`${source.name}: unverified page claims a release`);
    return errors;
  }
  if (String(data.packageVersion) !== source.selectedTag || data.sourceCommit !== source.commit) errors.push(`${source.name}: page release/SHA differs from manifest`);
  const distribution = source.distribution;
  if (!distribution || distribution.version.replace(/^v/, '') !== source.selectedTag.replace(/^v/, '') || distribution.sourceReference !== source.commit || distribution.distReference !== source.commit) errors.push(`${source.name}: selected release differs from verified distribution`);
  return errors;
}
