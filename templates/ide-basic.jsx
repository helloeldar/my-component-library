/**
 * Template: Basic IDE Window
 *
 * A single IDE screen with editor, project tree, and terminal.
 * Customize: project name, editor content, file tree, which panels are open.
 *
 * Usage: copy this file into your prototype project and edit the data below.
 */

import '@jetbrains/int-ui-kit/styles.css';
import { ThemeProvider, MainWindow } from '@jetbrains/int-ui-kit';

// ─── Your data ───────────────────────────────────────────────────────────────

const PROJECT_NAME = 'my-project';
const BRANCH_NAME = 'main';
const RUN_CONFIG = 'Application';
const PROJECT_COLOR = 'cobalt'; // amber | rust | olive | grass | ocean | sky | cobalt | violet | plum

const EDITOR_TABS = [
    { id: '1', label: 'App.tsx', icon: 'fileTypes/typeScript', closable: true },
    { id: '2', label: 'styles.css', icon: 'fileTypes/css', closable: true },
    { id: '3', label: 'package.json', icon: 'fileTypes/json', closable: true },
];

const EDITOR_CODE = `import React from 'react';

function App() {
    return (
        <div className="app">
            <h1>Hello World</h1>
        </div>
    );
}

export default App;`;

const PROJECT_TREE = [
    {
        id: 'root',
        label: PROJECT_NAME,
        icon: 'nodes/folder',
        isExpanded: true,
        children: [
            {
                id: 'src',
                label: 'src',
                icon: 'nodes/sourceRoot',
                isExpanded: true,
                children: [
                    { id: 'app', label: 'App.tsx', icon: 'fileTypes/typeScript' },
                    { id: 'styles', label: 'styles.css', icon: 'fileTypes/css' },
                ],
            },
            { id: 'pkg', label: 'package.json', icon: 'fileTypes/json' },
            { id: 'tsconfig', label: 'tsconfig.json', icon: 'fileTypes/json' },
        ],
    },
];

// Which panels are open on load: pick from your stripe items' ids
const OPEN_PANELS = ['project', 'terminal'];

// ─── Component ───────────────────────────────────────────────────────────────

export default function IDEBasicTemplate() {
    return (
        <ThemeProvider>
            <MainWindow
                projectName={PROJECT_NAME}
                projectColor={PROJECT_COLOR}
                branchName={BRANCH_NAME}
                runConfig={RUN_CONFIG}
                editorTabs={EDITOR_TABS}
                editorCode={EDITOR_CODE}
                editorLanguage="typescript"
                projectTreeData={PROJECT_TREE}
                defaultOpenToolWindows={OPEN_PANELS}
            />
        </ThemeProvider>
    );
}
