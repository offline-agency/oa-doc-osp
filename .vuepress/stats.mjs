// Live repository figures read in the browser from the public GitHub and Packagist APIs.
// Results are cached for an hour; any failure leaves the placeholder '–' in place.
const ttl = 60 * 60 * 1000

async function cached(url, pick) {
  const key = `oa-stats:${url}`
  try {
    const hit = JSON.parse(localStorage.getItem(key) || 'null')
    if (hit && Date.now() - hit.at < ttl) return hit.value
  } catch {}
  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!response.ok) return null
    const value = pick(await response.json())
    try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), value })) } catch {}
    return value
  } catch {
    return null
  }
}

export const downloads = name => cached(`https://packagist.org/packages/${name}/stats.json`, data => data?.downloads?.total ?? null)
// One organisation listing covers every repository, which keeps unauthenticated pages within GitHub's rate limit.
let organisationRequest
const organisation = () => organisationRequest ||= cached('https://api.github.com/orgs/offline-agency/repos?per_page=100', data => Array.isArray(data)
  ? Object.fromEntries(data.map(item => [item.full_name.toLowerCase(), { stars: item.stargazers_count, openIssues: item.open_issues_count }])) : null)
export const repository = async repo => (await organisation())?.[repo.toLowerCase()] ?? null
export const openPulls = repo => cached(`https://api.github.com/repos/${repo}/pulls?state=open&per_page=100`, data => Array.isArray(data) ? data.length : null)
export const latestRelease = repo => cached(`https://api.github.com/repos/${repo}/releases/latest`, data => data?.published_at || null)

export const formatCount = n => typeof n !== 'number' ? '–' : n >= 1e6 ? `${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M` : n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n)
export const formatDate = when => when ? new Date(when).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '–'
