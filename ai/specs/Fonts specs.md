We use two typefaces: Inter for UI components and JetBrains Mono for code.
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7989-86302&t=V8DOXcjhgUO6bzb3-4

## Weight Mapping

Figma uses **Medium (500)** for most UI text. Our React library follows Figma weights directly.

> **Note:** The actual IntelliJ IDE maps Medium (500) → Regular (400) due to platform rendering differences. This library matches Figma, not the IDE renderer.

- Figma Medium (500) → CSS `font-weight: 500` (Medium)
- Figma Semibold (600) → CSS `font-weight: 600` (Semibold)
- Figma Bold (700) → CSS `font-weight: 700` (Bold)

## UI Text Styles (Inter)

Confirmed from Figma (node 3342:83343, Alert component):
- UI/H2: 16px / 600 / 20px
- UI/Paragraph: 13px / 500 / 18px
- UI/Default: 13px / 500 / 16px

| Style             | CSS Class                   | Figma Weight | CSS Weight | Size | Line-Height |
|-------------------|-----------------------------|-------------|------------|------|-------------|
| H1                | `.text-ui-h1`               | 600         | 600        | 20px | 24px        |
| H2                | `.text-ui-h2`               | 600         | 600        | 16px | 20px        |
| Default           | `.text-ui-default`          | 500         | 500        | 13px | 16px        |
| Default semibold  | `.text-ui-default-semibold` | 600         | 600        | 13px | 16px        |
| Paragraph         | `.text-ui-paragraph`        | 500         | 500        | 13px | 18px        |
| Medium            | `.text-ui-small`            | 500         | 500        | 12px | 16px        |
| Medium semibold   | `.text-ui-small-semibold`   | 600         | 600        | 12px | 16px        |

## Editor Text Styles (JetBrains Mono)

| Style         | CSS Class                   | Weight (CSS) | Size | Line-Height |
|---------------|-----------------------------|--------------|------|-------------|
| Default       | `.text-editor-default`      | 400          | 13px | 22px        |
| Default bold  | `.text-editor-default-bold` | 700          | 13px | 22px        |
| Small         | `.text-editor-small`        | 400          | 12px | 22px        |
| Small bold    | `.text-editor-small-bold`   | 700          | 12px | 22px        |
