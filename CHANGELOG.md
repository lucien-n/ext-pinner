# Changelog

## [1.1.4] - 2026-09-04

### Added

- Add english translation for `SettingsDialog`
- Add french translation for `SettingsDialog`

### Changed

- Every schema is now based on the pinner data schema
- Clarified the extension description to more accurately describe its tab collection management features.

## [1.1.3] - 2026-09-03

### Added

- New settings dialog accessible via the gear icon in the app header
- Add english translation
- Add french translation
- Add `@inlang/paraglide-js` 2.18.2
- Display empty placeholder for empty collections
- Show muted icon for muted tabs in app header recap

### Changed

- Add urls to a collection without specifying protocol (defaults to https)
- Animate collection tab addition/removal
- Display "Empty" instead of "0 tab" for empty collections

### Fixed

- Empty add manual tab input on submit
- Removed old pre-`LinkPreview` preview from app header recap
- Updated `LinkPreview` styling to work with `items-center`
- Call `updatedPinnedTab` on any tabs update

## [1.1.2] - 2026-09-03

### Added

- Build and auto publish extension to the Chrome Web Store workflow

## [1.1.1] - 2026-09-03

### Added

- Migrate storage
- Persist muted state
- Show tab count in folded state
- Create collection on Enter pressed while input focused
- Release workflow creates a release based on a tag and its associated changelog entry

### Fixed

- Listen to tabs changes for the app header tabs preview
- Reset `autoloadId` when the corresponding tab is removed from the collection
- Reset pinner data when migration fails & save a backup of invalid data
- Missing fields for dev chrome mock

## 1.0.0 - 2019-08-23

_Initial release._

[1.1.4]: https://github.com/lucien-n/ext-pinner/releases/tag/v1.1.4
[1.1.3]: https://github.com/lucien-n/ext-pinner/releases/tag/v1.1.3
[1.1.2]: https://github.com/lucien-n/ext-pinner/releases/tag/v1.1.2
[1.1.1]: https://github.com/lucien-n/ext-pinner/releases/tag/v1.1.1
