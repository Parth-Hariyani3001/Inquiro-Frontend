export const SORT_OPTIONS = [
  { id: 'relevance_score:desc', label: 'Relevance' },
  { id: 'cited_by_count:desc', label: 'Most cited' },
  { id: 'publication_date:desc', label: 'Newest' },
  { id: 'publication_date:asc', label: 'Oldest' },
] as const

export type SortOptionId = (typeof SORT_OPTIONS)[number]['id']
export type OpenAccessFilter = 'any' | 'open' | 'closed'

export type OpenAlexFilters = {
  search: string
  openAccess: OpenAccessFilter
  fromYear: string
  toYear: string
  sort: SortOptionId
}

export const DEFAULT_OPENALEX_FILTERS: OpenAlexFilters = {
  search: '',
  openAccess: 'any',
  fromYear: '',
  toYear: '',
  sort: 'relevance_score:desc',
}

export type OpenAlexQueryParams = {
  search?: string
  filter?: string
  sort?: string
}

function yearToDate(year: string, bound: 'start' | 'end') {
  const parsed = Number.parseInt(year, 10)
  if (!Number.isFinite(parsed) || parsed < 1000 || parsed > 9999) {
    return null
  }
  return bound === 'start' ? `${parsed}-01-01` : `${parsed}-12-31`
}

export function buildOpenAlexQuery(
  filters: OpenAlexFilters,
): OpenAlexQueryParams {
  const parts: Array<string> = ['type:article']

  if (filters.openAccess === 'open') {
    parts.push('open_access.is_oa:true')
  } else if (filters.openAccess === 'closed') {
    parts.push('open_access.is_oa:false')
  }

  const fromDate = yearToDate(filters.fromYear, 'start')
  if (fromDate) {
    parts.push(`from_publication_date:${fromDate}`)
  }

  const toDate = yearToDate(filters.toYear, 'end')
  if (toDate) {
    parts.push(`to_publication_date:${toDate}`)
  }

  const query: OpenAlexQueryParams = {}
  const search = filters.search.trim()
  if (search) {
    query.search = search
  }
  if (parts.length > 0) {
    query.filter = parts.join(',')
  }

  query.sort = filters.sort
  return query
}

export function stringifyOpenAlexQuery(params: OpenAlexQueryParams) {
  const searchParams = new URLSearchParams()
  if (params.search) {
    searchParams.set('search', params.search)
  }
  if (params.filter) {
    searchParams.set('filter', params.filter)
  }
  if (params.sort) {
    searchParams.set('sort', params.sort)
  }
  const encoded = searchParams.toString()
  return encoded ? `?${encoded}` : '—'
}
