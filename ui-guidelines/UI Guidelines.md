# JetBrains UI Guidelines
Check this guidelines to understand our design principles and best practices.
Use these guidelines when creating designs.

The guidelines are synced from the [intellij-sdk-docs](https://github.com/JetBrains/intellij-sdk-docs) repository.
Web version:
https://plugins.jetbrains.com/docs/intellij/ui-guidelines-welcome.html


## Structure
- `images/` - UI component screenshots and illustrations
- `*.md` - Documentation topics for various UI components and principles

## Updating Guidelines
To update the guidelines, run:
```bash
./ui-guidelines/update-guidelines.sh
```
This will copy:
- `images/ui` → `ui-guidelines/images/`
- `topics/ui` → `ui-guidelines/`

## Overview
- UI Guidelines Welcome: [Local](ui_guidelines_welcome.md) | [Web](https://plugins.jetbrains.com/docs/intellij/ui-guidelines-welcome.html)
- User Interface Overview: [Local](ui_overview.md) | [Web](https://plugins.jetbrains.com/docs/intellij/ui-overview.html)

### Principles
- Principles: [Local](principles/) | [Web](https://plugins.jetbrains.com/docs/intellij/principles.html)
- Data Formats: [Local](principles/data_formats.md) | [Web](https://plugins.jetbrains.com/docs/intellij/data-formats.html)
- Icons Style: [Local](principles/icons_style.md) | [Web](https://plugins.jetbrains.com/docs/intellij/icons-style.html)
- Layout: [Local](principles/layout.md) | [Web](https://plugins.jetbrains.com/docs/intellij/layout.html)
    - Groups of Controls: [Local](principles/groups_of_controls.md) | [Web](https://plugins.jetbrains.com/docs/intellij/groups-of-controls.html)
- Mnemonics: [Local](principles/mnemonics.md) | [Web](https://plugins.jetbrains.com/docs/intellij/mnemonics.html)
- Platform Theme Colors: [Local](principles/platform_theme_colors.md) | [Web](https://plugins.jetbrains.com/docs/intellij/platform-theme-colors.html)
- Typography: [Local](principles/typography.md) | [Web](https://plugins.jetbrains.com/docs/intellij/typography.html)
- Validation Errors: [Local](principles/validation_errors.md) | [Web](https://plugins.jetbrains.com/docs/intellij/validation-errors.html)
- Window Sizes: [Local](principles/window_sizes.md) | [Web](https://plugins.jetbrains.com/docs/intellij/window-sizes.html)

### Writing UI Texts
- Capitalization: [Local](text/capitalization.md) | [Web](https://plugins.jetbrains.com/docs/intellij/capitalization.html)
- Inspections: [Local](text/inspections.md) | [Web](https://plugins.jetbrains.com/docs/intellij/inspections.html)
- Punctuation: [Local](text/punctuation.md) | [Web](https://plugins.jetbrains.com/docs/intellij/punctuation.html)
- Writing Short and Clear: [Local](text/writing_short.md) | [Web](https://plugins.jetbrains.com/docs/intellij/writing-short.html)

### Components
- Components: [Local](components/) | [Web](https://plugins.jetbrains.com/docs/intellij/components.html)
- Button: [Local](controls/button.md) | [Web](https://plugins.jetbrains.com/docs/intellij/button.html)
- Built-In Button: [Local](controls/built_in_button.md) | [Web](https://plugins.jetbrains.com/docs/intellij/built-in-button.html)
- Checkbox: [Local](controls/checkbox.md) | [Web](https://plugins.jetbrains.com/docs/intellij/checkbox.html)
- Combo Box: [Local](controls/combo_box.md) | [Web](https://plugins.jetbrains.com/docs/intellij/combo-box.html)
- Context Help: [Local](controls/context_help.md) | [Web](https://plugins.jetbrains.com/docs/intellij/context-help.html)
  - Empty State: [Local](controls/empty_state.md) | [Web](https://plugins.jetbrains.com/docs/intellij/empty-state.html)
  - Inline Help Text: [Local](controls/inline_help_text.md) | [Web](https://plugins.jetbrains.com/docs/intellij/inline-help-text.html)
  - Tooltip: [Local](controls/tooltip.md) | [Web](https://plugins.jetbrains.com/docs/intellij/tooltip.html)
- Description Text: [Local](controls/description_text.md) | [Web](https://plugins.jetbrains.com/docs/intellij/description-text.html)
- Drop-Down List: [Local](controls/drop_down.md) | [Web](https://plugins.jetbrains.com/docs/intellij/drop-down.html)
- Got It Tooltip: [Local](controls/got_it_tooltip.md) | [Web](https://plugins.jetbrains.com/docs/intellij/got-it-tooltip.html)
- Group Header: [Local](controls/group_header.md) | [Web](https://plugins.jetbrains.com/docs/intellij/group-header.html)
- Icon Button: [Local](controls/icon_button.md) | [Web](https://plugins.jetbrains.com/docs/intellij/icon-button.html)
- Input Field: [Local](controls/input_field.md) | [Web](https://plugins.jetbrains.com/docs/intellij/input-field.html)
- Link: [Local](controls/link.md) | [Web](https://plugins.jetbrains.com/docs/intellij/link.html)
- Notifications: [Local](controls/notification_types.md) | [Web](https://plugins.jetbrains.com/docs/intellij/notification-types.html)
  - Notification Balloon: [Local](controls/balloon.md) | [Web](https://plugins.jetbrains.com/docs/intellij/balloon.html)
  - Banner: [Local](controls/banner.md) | [Web](https://plugins.jetbrains.com/docs/intellij/banner.html)
- Progress Indicators: [Local](controls/progress_indicators.md) | [Web](https://plugins.jetbrains.com/docs/intellij/progress-indicators.html)
  - Loader: [Local](controls/loader.md) | [Web](https://plugins.jetbrains.com/docs/intellij/loader.html)
  - Progress Bar: [Local](controls/progress_bar.md) | [Web](https://plugins.jetbrains.com/docs/intellij/progress-bar.html)
  - Progress Text: [Local](controls/progress_text.md) | [Web](https://plugins.jetbrains.com/docs/intellij/progress-text.html)
- Radio Button: [Local](controls/radio_button.md) | [Web](https://plugins.jetbrains.com/docs/intellij/radio-button.html)
- Scrollbar: [Local](controls/scrollbar.md) | [Web](https://plugins.jetbrains.com/docs/intellij/scrollbar.html)
- Search Field: [Local](controls/search_field.md) | [Web](https://plugins.jetbrains.com/docs/intellij/search-field.html)
- Split Button: [Local](controls/split_button.md) | [Web](https://plugins.jetbrains.com/docs/intellij/split-button.html)
- Split Icon Button: [Local](controls/split_icon_button.md) | [Web](https://plugins.jetbrains.com/docs/intellij/split-icon-button.html)
- Table: [Local](controls/table.md) | [Web](https://plugins.jetbrains.com/docs/intellij/table.html)
- Tabs: [Local](controls/tabs.md) | [Web](https://plugins.jetbrains.com/docs/intellij/tabs.html)
- Text Area: [Local](controls/text_area.md) | [Web](https://plugins.jetbrains.com/docs/intellij/text-area.html)
- Toggle Button: [Local](controls/toggle_button.md) | [Web](https://plugins.jetbrains.com/docs/intellij/toggle-button.html)
- Toolbar: [Local](controls/toolbar.md) | [Web](https://plugins.jetbrains.com/docs/intellij/toolbar.html)
- Toolbar Drop-Down List: [Local](controls/toolbar_drop_down.md) | [Web](https://plugins.jetbrains.com/docs/intellij/toolbar-drop-down.html)
- Tool Window: [Local](controls/tool_window.md) | [Web](https://plugins.jetbrains.com/docs/intellij/tool-window.html)

### External Resources
- [Icons List (Full IntelliJ icons set)](https://intellij-icons.jetbrains.design)
- [UI Kit in Figma](https://www.figma.com/community/file/1227732692272811382/int-ui-kit)