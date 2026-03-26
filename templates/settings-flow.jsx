/**
 * Template: IDE with Settings dialog
 *
 * IDE window with a custom Settings dialog that opens as an overlay.
 * Useful for prototyping settings pages, preference flows, or configuration screens.
 *
 * Usage: copy this file into your prototype project and edit the data below.
 */

import '@jetbrains/int-ui-kit/styles.css';
import { useState } from 'react';
import {
    ThemeProvider,
    MainWindow,
    SettingsDialog,
    DEFAULT_SETTINGS_TREE_ITEMS,
} from '@jetbrains/int-ui-kit';

// ─── Your data ───────────────────────────────────────────────────────────────

// Customize the settings tree — use DEFAULT_SETTINGS_TREE_ITEMS to start from the
// built-in tree and add your own items, or replace it entirely.
const SETTINGS_TREE = [
    ...DEFAULT_SETTINGS_TREE_ITEMS,
    // Add your own settings section:
    // { id: 'my-plugin', label: 'My Plugin', hasChildren: true, children: [
    //     { id: 'my-plugin-general', label: 'General' },
    //     { id: 'my-plugin-advanced', label: 'Advanced' },
    // ]},
];

// The settings page content shown on the right when an item is selected.
// Replace this with your custom settings UI.
function MySettingsContent() {
    return (
        <div style={{ padding: '20px 24px' }}>
            <p style={{ color: 'var(--text-primary)', fontSize: 13, marginBottom: 16 }}>
                Customize this panel with your settings UI.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                Use components from @jetbrains/int-ui-kit: Input, Toggle, Dropdown, Checkbox, etc.
            </p>
        </div>
    );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SettingsFlowTemplate() {
    const [showSettings, setShowSettings] = useState(false);

    const settingsOverlay = showSettings ? (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 500,
            }}
            onMouseDown={() => setShowSettings(false)}
        >
            <div onMouseDown={(e) => e.stopPropagation()}>
                <SettingsDialog
                    title="Settings"
                    treeItems={SETTINGS_TREE}
                    onClose={() => setShowSettings(false)}
                    buttons={[
                        { children: 'Cancel', onClick: () => setShowSettings(false) },
                        { children: 'OK', type: 'primary', onClick: () => setShowSettings(false) },
                        { children: 'Apply', onClick: () => {} },
                    ]}
                >
                    <MySettingsContent />
                </SettingsDialog>
            </div>
        </div>
    ) : null;

    return (
        <ThemeProvider>
            <MainWindow
                projectName="my-project"
                projectColor="cobalt"
                branchName="main"
                runConfig="Application"
                defaultOpenToolWindows={['project']}
                // Wire the toolbar's Settings button to open our dialog
                // (MainWindow already has this built-in via onSettings, but
                // we override it here via the overlays prop for full control)
                overlays={settingsOverlay}
                // Tip: to open settings from the toolbar's gear icon,
                // use the toolbar prop to pass a custom MainToolbar with onSettings:
                // toolbar={<MainToolbar ... onSettings={() => setShowSettings(true)} />}
            />
        </ThemeProvider>
    );
}
