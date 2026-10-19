export function rankSearchPages (pages) {
  return pages.filter(page => page.frontmatter?.search !== false && !(page.documentationVersion && !page.documentationVersion.snapshot)).map((page,index) => ({ page,index })).sort((a,b) => (a.page.documentationSearchRank ?? 1) - (b.page.documentationSearchRank ?? 1) || a.index-b.index).map(item => item.page)
}
