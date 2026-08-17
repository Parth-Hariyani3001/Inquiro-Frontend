/* eslint-disable @typescript-eslint/naming-convention */
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { Key, Selection } from 'react-aria-components'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type {
  OpenAccessFilter,
  OpenAlexFilters,
  SortOptionId,
} from '@/lib/openalex'

import {
  DEFAULT_OPENALEX_FILTERS,
  SORT_OPTIONS,
  buildOpenAlexQuery,
  stringifyOpenAlexQuery,
} from '@/lib/openalex'

const OPEN_ACCESS_OPTIONS: Array<{
  id: OpenAccessFilter
  label: string
}> = [
  { id: 'any', label: 'Any' },
  { id: 'open', label: 'Open' },
  { id: 'closed', label: 'Closed' },
]

function countActiveFilters(filters: OpenAlexFilters) {
  let count = 0
  if (filters.openAccess !== DEFAULT_OPENALEX_FILTERS.openAccess) count += 1
  if (filters.fromYear.trim()) count += 1
  if (filters.toYear.trim()) count += 1
  if (filters.sort !== DEFAULT_OPENALEX_FILTERS.sort) count += 1
  return count
}

function sortLabel(id: SortOptionId) {
  return SORT_OPTIONS.find((item) => item.id === id)?.label ?? id
}

function openAccessLabel(id: OpenAccessFilter) {
  return OPEN_ACCESS_OPTIONS.find((item) => item.id === id)?.label ?? id
}

export function OpenAlexSearch() {
  const [searchDraft, setSearchDraft] = useState('')
  const [filters, setFilters] = useState<OpenAlexFilters>(
    DEFAULT_OPENALEX_FILTERS,
  )
  const [draft, setDraft] = useState<OpenAlexFilters>(DEFAULT_OPENALEX_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const queryPreview = useMemo(
    () => stringifyOpenAlexQuery(buildOpenAlexQuery(filters)),
    [filters],
  )
  const activeCount = countActiveFilters(filters)

  function applySearch(event?: FormEvent) {
    event?.preventDefault()
    setFilters((current) => ({ ...current, search: searchDraft }))
  }

  function applyDraftFilters() {
    setFilters((current) => ({
      ...draft,
      search: current.search,
    }))
    setFiltersOpen(false)
  }

  function resetDraftFilters() {
    setDraft({ ...DEFAULT_OPENALEX_FILTERS, search: draft.search })
  }

  function updateFilter<K extends keyof OpenAlexFilters>(
    key: K,
    value: OpenAlexFilters[K],
  ) {
    setFilters((current) => ({ ...current, [key]: value }))
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function onSortChange(key: Key | null) {
    if (typeof key === 'string') {
      setDraft((current) => ({ ...current, sort: key as SortOptionId }))
    }
  }

  function onOpenAccessChange(selection: Selection) {
    if (selection === 'all') return
    const next = [...selection][0]
    if (typeof next === 'string') {
      setDraft((current) => ({
        ...current,
        openAccess: next as OpenAccessFilter,
      }))
    }
  }

  function setDraftFromYear(value: string) {
    setDraft((current) => ({ ...current, fromYear: value }))
  }

  function setDraftToYear(value: string) {
    setDraft((current) => ({ ...current, toYear: value }))
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <form className="flex flex-col gap-3" onSubmit={applySearch}>
        <div className="flex flex-col gap-2 sm:flex-row">
          <InputGroup className="flex-1">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              aria-label="Search OpenAlex"
              placeholder="Search papers, authors, or topics"
              value={searchDraft}
              onChange={(event) =>
                setSearchDraft(
                  typeof event === 'string' ? event : event.currentTarget.value,
                )
              }
            />
            <InputGroupAddon align="inline-end" className="px-0">
              <InputGroupButton size="sm" type="submit" variant="default">
                Search
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          <PopoverTrigger isOpen={filtersOpen} onOpenChange={setFiltersOpen}>
            <Button
              type="button"
              variant="outline"
              onPress={() => setDraft({ ...filters, search: searchDraft })}
            >
              <SlidersHorizontal data-icon="inline-start" />
              Filters
              {activeCount > 0 ? (
                <Badge variant="secondary">{activeCount}</Badge>
              ) : null}
            </Button>
            <Popover className="w-80" placement="bottom end">
              <PopoverHeader>
                <PopoverTitle>Filters</PopoverTitle>
                <PopoverDescription>
                  Narrow articles by access, year, and sort.
                </PopoverDescription>
              </PopoverHeader>
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel>Open access</FieldLabel>
                  <ToggleGroup
                    className="w-full"
                    selectedKeys={[draft.openAccess]}
                    selectionMode="single"
                    variant="outline"
                    onSelectionChange={onOpenAccessChange}
                  >
                    {OPEN_ACCESS_OPTIONS.map((item) => (
                      <ToggleGroupItem
                        key={item.id}
                        className="flex-1"
                        id={item.id}
                      >
                        {item.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field>
                    <FieldLabel htmlFor="from-year">From year</FieldLabel>
                    <Input
                      id="from-year"
                      inputMode="numeric"
                      placeholder="2018"
                      value={draft.fromYear}
                      onChange={(event) =>
                        setDraftFromYear(
                          typeof event === 'string'
                            ? event
                            : event.currentTarget.value,
                        )
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="to-year">To year</FieldLabel>
                    <Input
                      id="to-year"
                      inputMode="numeric"
                      placeholder="2026"
                      value={draft.toYear}
                      onChange={(event) =>
                        setDraftToYear(
                          typeof event === 'string'
                            ? event
                            : event.currentTarget.value,
                        )
                      }
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Sort</FieldLabel>
                  <Select
                    className="w-full"
                    placeholder="Relevance"
                    selectedKey={draft.sort}
                    onSelectionChange={onSortChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SORT_OPTIONS.map((item) => (
                          <SelectItem key={item.id} id={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onPress={resetDraftFilters}
                >
                  Reset
                </Button>
                <Button type="button" onPress={applyDraftFilters}>
                  Apply
                </Button>
              </div>
            </Popover>
          </PopoverTrigger>
        </div>

        {activeCount > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {filters.openAccess !== 'any' ? (
              <FilterChip
                label={`${openAccessLabel(filters.openAccess)} access`}
                onRemove={() => updateFilter('openAccess', 'any')}
              />
            ) : null}
            {filters.fromYear.trim() ? (
              <FilterChip
                label={`From ${filters.fromYear}`}
                onRemove={() => updateFilter('fromYear', '')}
              />
            ) : null}
            {filters.toYear.trim() ? (
              <FilterChip
                label={`To ${filters.toYear}`}
                onRemove={() => updateFilter('toYear', '')}
              />
            ) : null}
            {filters.sort !== DEFAULT_OPENALEX_FILTERS.sort ? (
              <FilterChip
                label={sortLabel(filters.sort)}
                onRemove={() =>
                  updateFilter('sort', DEFAULT_OPENALEX_FILTERS.sort)
                }
              />
            ) : null}
          </div>
        ) : null}

        <p className="font-mono text-xs text-muted-foreground">
          {queryPreview}
        </p>
      </form>

      <Empty className="flex-1 border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyTitle>Search OpenAlex to get started</EmptyTitle>
          <EmptyDescription>
            Build a query with the search bar and filters. Results will appear
            here in a later pass.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <Badge variant="secondary">
      {label}
      <Button
        aria-label={`Remove ${label}`}
        size="icon-xs"
        type="button"
        variant="ghost"
        onPress={onRemove}
      >
        <X />
      </Button>
    </Badge>
  )
}
