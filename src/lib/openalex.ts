import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { z } from 'zod'

import { apiFetch } from '#/lib/api.ts'

export const SORT_OPTIONS = [
  { id: 'relevance_score:desc', label: 'Relevance' },
  { id: 'cited_by_count:desc', label: 'Most cited' },
  { id: 'publication_date:desc', label: 'Newest' },
  { id: 'publication_date:asc', label: 'Oldest' },
] as const

export type SortOptionId = (typeof SORT_OPTIONS)[number]['id']
export type OpenAccessFilter = 'any' | 'open' | 'closed'

export const OPENALEX_PER_PAGE = 25

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

export const exploreSearchSchema = z.object({
  q: z.string().optional().catch(undefined),
  oa: z.enum(['any', 'open', 'closed']).optional().catch(undefined),
  from: z.string().optional().catch(undefined),
  to: z.string().optional().catch(undefined),
  sort: z
    .enum([
      'relevance_score:desc',
      'cited_by_count:desc',
      'publication_date:desc',
      'publication_date:asc',
    ])
    .optional()
    .catch(undefined),
  cursor: z.string().optional().catch(undefined),
})

export type ExploreSearch = z.infer<typeof exploreSearchSchema>

export type SearchWorksParams = {
  search: string
  open_access: OpenAccessFilter
  from_year?: number
  to_year?: number
  sort: SortOptionId
  per_page: number
  cursor?: string
}

export type OpenAlexWork = {
  id: string
  doi: string | null
  display_name: string
  publication_year: number | null
  cited_by_count: number
  is_oa: boolean
  authors: Array<string>
  venue: string | null
  tags?: Array<string>
}

export type OpenAlexWorksResponse = {
  meta: {
    count: number
    per_page: number
    next_cursor: string | null
  }
  results: Array<OpenAlexWork>
}

export function parseYear(value: string): number | undefined {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed) || parsed < 1000 || parsed > 9999) {
    return undefined
  }
  return parsed
}

export function exploreSearchToFilters(search: ExploreSearch): OpenAlexFilters {
  return {
    search: search.q ?? '',
    openAccess: search.oa ?? DEFAULT_OPENALEX_FILTERS.openAccess,
    fromYear: search.from ?? '',
    toYear: search.to ?? '',
    sort: search.sort ?? DEFAULT_OPENALEX_FILTERS.sort,
  }
}

export function filtersToExploreSearch(
  filters: OpenAlexFilters,
  cursor?: string,
): ExploreSearch {
  const q = filters.search.trim()
  const from = filters.fromYear.trim()
  const to = filters.toYear.trim()

  return {
    ...(q ? { q } : {}),
    ...(filters.openAccess !== DEFAULT_OPENALEX_FILTERS.openAccess
      ? { oa: filters.openAccess }
      : {}),
    ...(from ? { from } : {}),
    ...(to ? { to } : {}),
    ...(filters.sort !== DEFAULT_OPENALEX_FILTERS.sort
      ? { sort: filters.sort }
      : {}),
    ...(cursor ? { cursor } : {}),
  }
}

export function toSearchWorksParams(
  filters: OpenAlexFilters,
  cursor?: string,
): SearchWorksParams {
  return {
    search: filters.search.trim(),
    open_access: filters.openAccess,
    from_year: parseYear(filters.fromYear),
    to_year: parseYear(filters.toYear),
    sort: filters.sort,
    per_page: OPENALEX_PER_PAGE,
    ...(cursor ? { cursor } : {}),
  }
}

export function searchWorksQueryOptions(
  params: SearchWorksParams,
  getToken: () => Promise<string | null>,
  enabled: boolean,
) {
  return queryOptions({
    queryKey: ['openalex', 'works', params],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      return apiFetch<OpenAlexWorksResponse>('/api/v1/openalex/works', {
        token,
        params: {
          search: params.search,
          open_access: params.open_access,
          from_year: params.from_year,
          to_year: params.to_year,
          sort: params.sort,
          per_page: params.per_page,
          cursor: params.cursor ?? '*',
        },
      })
    },
    enabled,
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  })
}
