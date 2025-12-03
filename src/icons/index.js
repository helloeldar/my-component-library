// Icon registry and exports
// This file exports all icons organized by theme and category

// Light theme icons
export { ReactComponent as AddLight } from './light/add.svg';
export { ReactComponent as AutoscrollFromSourceLight } from './light/autoscrollFromSource.svg';
export { ReactComponent as AutoscrollToSourceLight } from './light/autoscrollToSource.svg';
export { ReactComponent as ChevronDownLight } from './light/chevronDown.svg';
export { ReactComponent as ChevronDownLargeLight } from './light/chevronDownLarge.svg';
export { ReactComponent as ChevronLeftLight } from './light/chevronLeft.svg';
export { ReactComponent as ChevronRightLight } from './light/chevronRight.svg';
export { ReactComponent as ChevronUpLight } from './light/chevronUp.svg';
export { ReactComponent as ChevronUpLargeLight } from './light/chevronUpLarge.svg';
export { ReactComponent as CloseLight } from './light/close.svg';
export { ReactComponent as CloseSmallLight } from './light/closeSmall.svg';
export { ReactComponent as CloseSmallHoveredLight } from './light/closeSmallHovered.svg';
export { ReactComponent as CollapseAllLight } from './light/collapseAll.svg';
export { ReactComponent as CopyLight } from './light/copy.svg';
export { ReactComponent as CssLight } from './light/css.svg';
export { ReactComponent as CutLight } from './light/cut.svg';
export { ReactComponent as DeleteLight } from './light/delete.svg';
export { ReactComponent as DownLight } from './light/down.svg';
export { ReactComponent as DownloadLight } from './light/download.svg';
export { ReactComponent as EditLight } from './light/edit.svg';
export { ReactComponent as FolderLight } from './light/folder.svg';
export { ReactComponent as FontLight } from './light/font.svg';
export { ReactComponent as HomeFolderLight } from './light/homeFolder.svg';
export { ReactComponent as JavaScriptLight } from './light/javaScript.svg';
export { ReactComponent as JsonLight } from './light/json.svg';
export { ReactComponent as LibraryFolderLight } from './light/libraryFolder.svg';

// Dark theme icons
export { ReactComponent as AddDark } from './dark/add.svg';
export { ReactComponent as AutoscrollFromSourceDark } from './dark/autoscrollFromSource.svg';
export { ReactComponent as AutoscrollToSourceDark } from './dark/autoscrollToSource.svg';
export { ReactComponent as ChevronDownDark } from './dark/chevronDown.svg';
export { ReactComponent as ChevronDownLargeDark } from './dark/chevronDownLarge.svg';
export { ReactComponent as ChevronLeftDark } from './dark/chevronLeft.svg';
export { ReactComponent as ChevronRightDark } from './dark/chevronRight.svg';
export { ReactComponent as ChevronUpDark } from './dark/chevronUp.svg';
export { ReactComponent as ChevronUpLargeDark } from './dark/chevronUpLarge.svg';
export { ReactComponent as CloseDark } from './dark/close.svg';
export { ReactComponent as CloseSmallDark } from './dark/closeSmall.svg';
export { ReactComponent as CloseSmallHoveredDark } from './dark/closeSmallHovered.svg';
export { ReactComponent as CollapseAllDark } from './dark/collapseAll.svg';
export { ReactComponent as CopyDark } from './dark/copy.svg';
export { ReactComponent as CssDark } from './dark/css.svg';
export { ReactComponent as CutDark } from './dark/cut.svg';
export { ReactComponent as DeleteDark } from './dark/delete.svg';
export { ReactComponent as DownDark } from './dark/down.svg';
export { ReactComponent as DownloadDark } from './dark/download.svg';
export { ReactComponent as EditDark } from './dark/edit.svg';
export { ReactComponent as FolderDark } from './dark/folder.svg';
export { ReactComponent as FontDark } from './dark/font.svg';
export { ReactComponent as HomeFolderDark } from './dark/homeFolder.svg';
export { ReactComponent as JavaScriptDark } from './dark/javaScript.svg';
export { ReactComponent as JsonDark } from './dark/json.svg';
export { ReactComponent as LibraryFolderDark } from './dark/libraryFolder.svg';

// Theme toggle icons (for theme switcher component)
export { ReactComponent as DarkThemeIcon } from './theme-toggle/dark-theme-icon.svg';
export { ReactComponent as LightThemeIcon } from './theme-toggle/light-theme-icon.svg';

// Common icons (theme-agnostic)
export { ReactComponent as IntelliJPlatformLogo } from './common/IntelliJPlatformLogo.svg';

// Icon collections for programmatic access
export const lightIcons = {
    add: 'AddLight',
    autoscrollFromSource: 'AutoscrollFromSourceLight',
    autoscrollToSource: 'AutoscrollToSourceLight',
    chevronDown: 'ChevronDownLight',
    chevronDownLarge: 'ChevronDownLargeLight',
    chevronLeft: 'ChevronLeftLight',
    chevronRight: 'ChevronRightLight',
    chevronUp: 'ChevronUpLight',
    chevronUpLarge: 'ChevronUpLargeLight',
    close: 'CloseLight',
    closeSmall: 'CloseSmallLight',
    closeSmallHovered: 'CloseSmallHoveredLight',
    collapseAll: 'CollapseAllLight',
    copy: 'CopyLight',
    css: 'CssLight',
    cut: 'CutLight',
    delete: 'DeleteLight',
    down: 'DownLight',
    download: 'DownloadLight',
    edit: 'EditLight',
    folder: 'FolderLight',
    font: 'FontLight',
    homeFolder: 'HomeFolderLight',
    javaScript: 'JavaScriptLight',
    json: 'JsonLight',
    libraryFolder: 'LibraryFolderLight'
};

export const darkIcons = {
    add: 'AddDark',
    autoscrollFromSource: 'AutoscrollFromSourceDark',
    autoscrollToSource: 'AutoscrollToSourceDark',
    chevronDown: 'ChevronDownDark',
    chevronDownLarge: 'ChevronDownLargeDark',
    chevronLeft: 'ChevronLeftDark',
    chevronRight: 'ChevronRightDark',
    chevronUp: 'ChevronUpDark',
    chevronUpLarge: 'ChevronUpLargeDark',
    close: 'CloseDark',
    closeSmall: 'CloseSmallDark',
    closeSmallHovered: 'CloseSmallHoveredDark',
    collapseAll: 'CollapseAllDark',
    copy: 'CopyDark',
    css: 'CssDark',
    cut: 'CutDark',
    delete: 'DeleteDark',
    down: 'DownDark',
    download: 'DownloadDark',
    edit: 'EditDark',
    folder: 'FolderDark',
    font: 'FontDark',
    homeFolder: 'HomeFolderDark',
    javaScript: 'JavaScriptDark',
    json: 'JsonDark',
    libraryFolder: 'LibraryFolderDark'
};

export const themeToggleIcons = {
    darkTheme: 'DarkThemeIcon',
    lightTheme: 'LightThemeIcon'
};

export const commonIcons = {
    intellijPlatformLogo: 'IntelliJPlatformLogo'
};
