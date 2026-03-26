/**
 * Template: Welcome Screen → IDE flow
 *
 * Two-screen prototype: start at the Welcome dialog, click a project to open the IDE.
 * Useful for prototyping onboarding, project switching, or first-run flows.
 *
 * Usage: copy this file into your prototype project and edit the data below.
 */

import '@jetbrains/int-ui-kit/styles.css';
import { useState } from 'react';
import { ThemeProvider, WelcomeDialog, MainWindow } from '@jetbrains/int-ui-kit';

// ─── Your data ───────────────────────────────────────────────────────────────

const IDE_TITLE = 'IntelliJ IDEA';
const IDE_VERSION = '2025.2';

const PROJECTS = [
    {
        id: 'payment',
        name: 'payment-service',
        path: '~/projects/payment-service',
        initials: 'PS',
        gradient: ['#3b82f6', '#1d4ed8'],
    },
    {
        id: 'auth',
        name: 'auth-module',
        path: '~/projects/auth-module',
        initials: 'AM',
        gradient: ['#8b5cf6', '#6d28d9'],
    },
    {
        id: 'frontend',
        name: 'frontend-app',
        path: '~/projects/frontend-app',
        initials: 'FA',
        gradient: ['#10b981', '#059669'],
    },
];

const EDITOR_TABS = [
    { id: '1', label: 'PaymentController.java', icon: 'fileTypes/java', closable: true },
    { id: '2', label: 'application.yml', icon: 'fileTypes/yaml', closable: true },
];

const EDITOR_CODE = `@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/charge")
    public ResponseEntity<PaymentResult> charge(
            @RequestBody @Valid ChargeRequest request) {
        return ResponseEntity.ok(paymentService.charge(request));
    }
}`;

const PROJECT_TREE = [
    {
        id: 'root',
        label: 'payment-service',
        icon: 'nodes/folder',
        isExpanded: true,
        children: [
            {
                id: 'src',
                label: 'src/main/java',
                icon: 'nodes/sourceRoot',
                isExpanded: true,
                children: [
                    { id: 'ctrl', label: 'PaymentController.java', icon: 'fileTypes/java' },
                    { id: 'svc', label: 'PaymentService.java', icon: 'fileTypes/java' },
                    { id: 'model', label: 'ChargeRequest.java', icon: 'fileTypes/java' },
                ],
            },
            { id: 'cfg', label: 'application.yml', icon: 'fileTypes/yaml' },
            { id: 'pom', label: 'pom.xml', icon: 'fileTypes/xml' },
        ],
    },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function WelcomeToIDETemplate() {
    const [screen, setScreen] = useState('welcome'); // 'welcome' | 'ide'
    const [openProject, setOpenProject] = useState(null);

    if (screen === 'welcome') {
        return (
            <ThemeProvider>
                <WelcomeDialog
                    ideTitle={IDE_TITLE}
                    ideVersion={IDE_VERSION}
                    projects={PROJECTS}
                    onProjectSelect={(id) => {
                        setOpenProject(PROJECTS.find(p => p.id === id));
                        setScreen('ide');
                    }}
                    onNewProject={() => setScreen('ide')}
                />
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider>
            <MainWindow
                projectName={openProject?.name ?? 'payment-service'}
                projectColor="cobalt"
                branchName="main"
                runConfig="PaymentApplication"
                editorTabs={EDITOR_TABS}
                editorCode={EDITOR_CODE}
                editorLanguage="java"
                projectTreeData={PROJECT_TREE}
                defaultOpenToolWindows={['project', 'terminal']}
            />
        </ThemeProvider>
    );
}
