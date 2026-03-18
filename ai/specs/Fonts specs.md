We use two typefaces: Inter for UI components and JetBrains Mono for code.
https://www.figma.com/design/zKwabe7qCf1c0LFu93997q/Int-UI-Kit--Islands?node-id=7989-86302&t=V8DOXcjhgUO6bzb3-4

## Important: Weight Mapping

Due to rendering inconsistencies between Figma and IntelliJ IDEs, all fonts with **Medium** weight (500) in Figma actually have **Regular** weight (400) in implementation.

- Figma Medium (500) → CSS `font-weight: 400` (Regular)
- Figma Semibold (600) → CSS `font-weight: 600` (Semibold)
- Figma Bold (700) → CSS `font-weight: 700` (Bold)

## UI Text Styles (Inter)

| Style             | CSS Class                   | Weight (CSS) | Size | Line-Height |
|-------------------|-----------------------------|--------------|------|-------------|
| H1                | `.text-ui-h1`               | 600          | 20px | 24px        |
| H2                | `.text-ui-h2`               | 600          | 16px | 20px        |
| Default           | `.text-ui-default`          | 400          | 13px | 16px        |
| Default semibold  | `.text-ui-default-semibold` | 600          | 13px | 16px        |
| Paragraph         | `.text-ui-paragraph`        | 400          | 13px | 18px        |
| Medium            | `.text-ui-small`            | 400          | 12px | 16px        |
| Medium semibold   | `.text-ui-small-semibold`   | 600          | 12px | 16px        |

## Editor Text Styles (JetBrains Mono)

| Style         | CSS Class                   | Weight (CSS) | Size | Line-Height |
|---------------|-----------------------------|--------------|------|-------------|
| Default       | `.text-editor-default`      | 400          | 13px | 22px        |
| Default bold  | `.text-editor-default-bold` | 700          | 13px | 22px        |
| Small         | `.text-editor-small`        | 400          | 12px | 22px        |
| Small bold    | `.text-editor-small-bold`   | 700          | 12px | 22px        |
