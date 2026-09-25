# Data and behavior contract

This is the normative specification for the **one-week, 6-8-hour edition of Evidence Before Action**. It covers one schema and one in-memory dataset. When a library default differs, follow this contract. Removed features from the longer draft are not assessed.

## 1. Dataset provenance and reference date

All supplied tickets are fictional, generated for this assignment, and contain no real people, buildings, or service records. You may copy and modify them for the coursework. The generator uses a fixed seed; the data is a teaching scenario, not a statistically representative sample.

Every age calculation uses **2026-04-01 at 00:00 UTC**. Do not use the current clock, the computer's locale, or the date of import.

| File | Purpose |
| --- | --- |
| `data/verification.csv` | Eight records for independent manual predictions. |
| `data/campus-tickets.csv` | 240 valid records for the participant session and recommendation. |
| `data/edge-cases.csv` | A mix of valid and invalid records, with a UTF-8 BOM, CRLF record endings, quoted commas/quotes, and a newline inside a quoted field. |
| `data/invalid-header.csv` | A fatal schema mismatch. |
| `data/malformed.csv` | Fatal CSV syntax: an unterminated quoted field. |
| `data/empty.csv` | Header only; no new active dataset can be loaded. |

Only these six small files are assigned; the largest has 240 records. Supplemental stress datasets and generators are kept separately for instructor use and are **not student deliverables or performance tests**.

## 2. CSV decoding and normalization

Files use UTF-8, with an optional initial BOM. Support LF and CRLF record endings, quoted fields, doubled quotes inside quoted fields, and embedded newlines. CSV delimiters are commas. Invalid text encoding and other delimiters are outside the required input format.

The first logical CSV record must be the header; do not skip blank records before it. The header must contain these **eight names exactly once**, in any order:

```text
ticket_id,zone,category,priority,opened_on,closed_on,estimated_hours,summary
```

Strip an initial BOM and trim surrounding whitespace from header names and field values. Case remains significant except in the search UI. Preserve internal whitespace and embedded newlines in summaries. Do not correct spelling, substitute enum values, or coerce bad numbers into zero.

| Field | Valid normalized value |
| --- | --- |
| `ticket_id` | String matching `^T-[0-9]{5}$`; the stable record identity. |
| `zone` | `North`, `Central`, or `South`. |
| `category` | `Access`, `Comfort`, or `Technology`. |
| `priority` | `Low`, `Normal`, or `High`. |
| `opened_on` | A real Gregorian date in exact `YYYY-MM-DD` form, from `2026-01-01` through `2026-04-01`, inclusive. Reject impossible dates such as February 30. |
| `closed_on` | Empty becomes `null` (open). Otherwise, a real date in the same format, not before `opened_on` and not after `2026-04-01`. |
| `estimated_hours` | Empty becomes `null` (unknown). Otherwise, a decimal string matching `^[0-9]+(\.[0-9]{1,2})?$`, whose numeric value is from 0 through 80 inclusive. Normalize to a number. No signs, exponents, suffixes, `NaN`, or infinity. A literal `0` is a known estimate. |
| `summary` | Nonempty text, at most 240 JavaScript string code units after trimming. Treat all content literally, including markup and strings beginning with `=`. |

Missing/duplicate/unrecognized header names, unterminated CSV quoting, file-reading failure, and size/record-limit violations are **fatal**: retain the previous dataset. A record with the wrong number of fields or an invalid field is **rejected individually**. Never load a partial result after a fatal error.

Ignore completely empty records and records whose fields are all whitespace; they count neither as accepted nor rejected. For diagnostics, number the remaining **logical data records** starting at 1 after the header, not physical text lines. A quoted newline does not create another record. A rejected record may have multiple reasons, but count it once.

For duplicate normalized IDs, the **first otherwise valid record wins**; later otherwise valid records with that ID are rejected as duplicates. An invalid record does not reserve an ID. Do not merge duplicates. On any nonfatal import:

```text
nonblank data records = accepted records + rejected records
```

Safety limits: **5 MiB = 5,242,880 bytes** per file, checked before reading, and **10,000 nonblank logical data records**, including rejected records. Equality is allowed; more than either is fatal. These are validation guards, not a benchmarking assignment. Load the valid subset of a nonfatal mixed file and prominently report what was rejected. Zero accepted records means there is nothing to load.

## 3. Import transaction and lifetime

Disable the file picker while reading. Reading does not change active records, filters, sort, page, or the active file's report. A failed, canceled, or zero-accepted-record attempt preserves them. Report a failed attempt separately so it cannot be mistaken for the active file's diagnostics.

After successful validation, replace the dataset, filename, and counts together; reset search to empty, zone/status to `all`, sort to `opened-asc`, and page to 1. No separate preview/approval step is required. Selecting the same file again must work.

Ignore unfinished read results after the import component unmounts. A dedicated clear-session button and concurrent-import support are not required.

Keep all application data and settings in memory. Do not use local/session storage or IndexedDB. Tell users that reload loses the session; the download keeps analysis evidence but cannot restore a session.

## 4. Analysis pipeline

In this order:

```text
accepted source records
  -> apply every active filter
  -> derive overall and per-zone metrics from all matches
  -> copy and sort matching records
  -> select the displayed page
```

Filters:

| Control | Meaning/default |
| --- | --- |
| Search | Trim query; case-insensitive substring match against `ticket_id` OR `summary`. Empty means all. |
| Zone | Exact match or `all` (default). |
| Status | `all` (default), `open` (`closed_on === null`), or `closed`. |

Combine the three controls with AND. Category and priority remain validated/displayed source fields, but do not need filter controls. A Reset filters action clears search and restores zone/status to `all`, **leaving the current sort order unchanged**.

Sorting has exactly two required modes:

- `opened-asc` (default): earliest `opened_on` first, then ticket ID ascending.
- `hours-desc`: largest known estimate first, unknown estimates last, then ticket ID ascending for ties (including unknowns).

String ordering of ticket IDs is ordinary ascending ASCII; zero-padding makes this deterministic. Do not sort the source array in place. Changing sort must not change metrics.

Use a fixed page size of **50** with Previous/Next controls. A filter/sort change, Reset filters, or a new successful import resets the page to 1. Disable unavailable Previous/Next actions. Changing pages must not change metrics or export membership. An empty result has explanatory text and disabled paging, not page 0 or an error.

## 5. Metrics and interpretation

Use UTC calendar-day differences; the data contains dates, not local-time instants. An open ticket is **overdue** when its age on the reference date is **at least 14 days**. A ticket opened on March 18 is overdue; one opened on March 19 is not. Closed tickets are never overdue-open tickets.

Every overall metric uses the entire current matching set. Grouped metrics use the same set partitioned by zone.

| Export field | Definition |
| --- | --- |
| `matchingCount` | Number of matching tickets, open and closed. |
| `openCount` | Number of matching tickets with no close date. |
| `overdueOpenCount` | Number of matching open tickets at least 14 days old. |
| `knownOpenHours` | Sum of non-null estimates on matching open tickets. Do not include closed-ticket estimates. |
| `knownOpenCount` | Number of matching open tickets with a non-null estimate, including zero. |
| `unknownOpenCount` | Number of matching open tickets with a null estimate. |

The last two counts must sum to `openCount`. Display **known effort with coverage**, for example `18.5 known hours; 7 of 9 open tickets have estimates`, not just `18.5 hours of work`. Coverage percentages, if shown, use `knownOpenCount / openCount`; when there are no open tickets, show `N/A`, not a percentage.

All six metrics are zero for an empty set. If open tickets exist but every estimate is missing, `knownOpenHours` is still numerically 0, but its label/coverage must make clear that total effort is **unknown**, not zero. Round hour totals once to at most two decimal places for display/export; do not round each input before summing.

Show all three zones in the fixed order **North, Central, South**, including zero-valued groups. Group totals must sum to overall totals (allowing at most 0.01 hours of rounding difference). Avoid averages of subgroup percentages.

Records describe reported tickets, not all incidents or campus population. Zone comparisons can be affected by category, priority, reporting practices, age, closures, and missing estimates. Filters help investigate these differences; they cannot establish causality.

## 6. Analysis JSON download

Download UTF-8 JSON named `analysis.json`. Use the following exact top-level fields; field order in JSON objects is irrelevant. There are no optional application-specific fields in the required snapshot.

| Field | Required contents |
| --- | --- |
| `schemaVersion` | Number `1`. |
| `asOf` | String `"2026-04-01"`. |
| `source` | Object with `fileName` (active filename), `acceptedCount`, `rejectedCount` from the successful import. |
| `filters` | Object with exactly `search` (trimmed string), `zone`, and `status`, using the control values defined above. |
| `sort` | `"opened-asc"` or `"hours-desc"`. |
| `metrics` | Object with exactly the six metric fields in section 5, as finite numbers. |
| `byZone` | Array of three objects in North/Central/South order, each with `zone` and a `metrics` object of the same shape. |
| `matchingRows` | All matching normalized records in the current sort order, not just the current page. Each has exactly the eight source fields. Non-null dates are `YYYY-MM-DD` strings, not timestamp strings; empty close dates/estimates are `null`, known estimates are numbers, and all other fields are strings. |

Export uses the **active** dataset, never an unfinished import. It is enabled whenever an active dataset exists, including a zero-match filter, and disabled otherwise. Accepted rows that do not match are intentionally absent: this is an analysis snapshot, **not a full backup**.

Do not include raw rejected rows, exclusion annotations, DOM markup, the current page, or wall-clock values. Browser downloads must not send their contents to a server. JSON avoids adding spreadsheet-specific CSV export semantics to this homework.

## 7. Assessment boundary

Expect the six assigned fixtures and small variations within these rules. The required automated work is the three cases in the handout; other interactions can be checked manually. There is no required stress-file run, profiling report, storage fault injection, complex read-race harness, or extra property-test suite. No new columns, formats, backend features, or unpublished business rules will be introduced.
