import { useEffect, useRef, useState } from 'react';
import '../../styles/Colors.css';

function useResolvedColor(variable) {
    const [value, setValue] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        function resolve() {
            if (!ref.current) return;
            const computed = getComputedStyle(ref.current).backgroundColor;
            setValue(computed);
        }
        resolve();
        const observer = new MutationObserver(resolve);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, [variable]);

    return { ref, value };
}

function ColorToken({ name, variable, description }) {
    const { ref, value } = useResolvedColor(variable);

    return (
        <div className="color-item">
            <div
                ref={ref}
                className="color-swatch"
                style={{ backgroundColor: `var(${variable})` }}
            />
            <div className="color-details">
                <div className="color-name">{name}</div>
                {description && (
                    <div className="color-value">{description}</div>
                )}
                <div className="color-variable">{variable}</div>
                {value && (
                    <div className="color-value" style={{ fontSize: '10px', opacity: 0.7 }}>{value}</div>
                )}
            </div>
        </div>
    );
}

function ColorGroup({ title, tokens }) {
    return (
        <div className="color-scale">
            <h3 className="color-scale-title">{title}</h3>
            <div className="color-palette">
                {tokens.map((token, i) => (
                    <ColorToken key={i} {...token} />
                ))}
            </div>
        </div>
    );
}

const semanticGroups = [
    {
        title: 'Text',
        tokens: [
            { name: 'Default', variable: '--text-default', description: 'text/text-default' },
            { name: 'Secondary', variable: '--text-secondary', description: 'text/text-secondary · hint' },
            { name: 'Muted', variable: '--text-muted', description: 'text/text-muted' },
            { name: 'Disabled', variable: '--text-disabled', description: 'text/text-disabled' },
            { name: 'Over Accent', variable: '--text-over-accent', description: 'text/text-over-accent' },
            { name: 'Warning', variable: '--text-warning', description: 'text/text-warning' },
        ]
    },
    {
        title: 'Link',
        tokens: [
            { name: 'Default', variable: '--text-link', description: 'text/text-link' },
            { name: 'Hover', variable: '--text-link-hover', description: 'text-link-hover' },
            { name: 'Pressed', variable: '--text-link-pressed', description: 'text-link-pressed' },
            { name: 'Visited', variable: '--text-link-visited', description: 'text-link-visited' },
        ]
    },
    {
        title: 'Background',
        tokens: [
            { name: 'Primary', variable: '--bg-primary', description: 'layer-0-bg · main window, editor' },
            { name: 'Secondary', variable: '--bg-secondary', description: 'layer-1-bg · popup, panels' },
            { name: 'Tertiary', variable: '--bg-tertiary', description: 'layer-2-bg' },
            { name: 'Elevated', variable: '--bg-elevated', description: 'popup/dialog bg' },
        ]
    },
    {
        title: 'Accent',
        tokens: [
            { name: 'Brand', variable: '--accent-brand-bg', description: 'accent/accent-brand-bg' },
            { name: 'Brand Hover', variable: '--accent-brand-bg-hovered', description: 'accent-brand-bg-hovered' },
            { name: 'Brand Pressed', variable: '--accent-brand-bg-pressed', description: 'accent-brand-bg-pressed' },
        ]
    },
    {
        title: 'Control',
        tokens: [
            { name: 'Background', variable: '--control-bg', description: 'control/control-bg' },
            { name: 'Background Hover', variable: '--control-bg-hover', description: 'control-bg-hover' },
            { name: 'Background Pressed', variable: '--control-bg-pressed', description: 'control-bg-pressed' },
            { name: 'Background Disabled', variable: '--control-bg-disabled', description: 'control/control-bg-disabled' },
            { name: 'Border', variable: '--control-border', description: 'control/control-border' },
            { name: 'Border Disabled', variable: '--control-border-disabled', description: 'control/control-border-disabled' },
            { name: 'Border Raised', variable: '--control-border-raised', description: 'control/control-border-raised' },
            { name: 'Focus Border Brand', variable: '--control-focus-border-brand', description: 'control/control-focus-border-brand' },
            { name: 'Focus Border Error', variable: '--control-focus-border-error', description: 'control/control-focus-border-error' },
        ]
    },
    {
        title: 'Selection',
        tokens: [
            { name: 'Active', variable: '--selection-bg-active', description: 'selection/selection-bg-active' },
            { name: 'Inactive', variable: '--selection-bg-inactive', description: 'selection/selection-bg-inactive' },
        ]
    },
    {
        title: 'Icon',
        tokens: [
            { name: 'Default Stroke', variable: '--icon-default-stroke', description: 'icon/icon-default-stroke' },
            { name: 'Secondary Stroke', variable: '--icon-secondary-stroke', description: 'icon/icon-secondary-stroke' },
            { name: 'Disabled', variable: '--icon-disabled', description: 'icon/icon-disabled' },
            { name: 'Green Stroke', variable: '--icon-green-stroke', description: 'icon/icon-green-stroke' },
        ]
    },
    {
        title: 'Toolbar',
        tokens: [
            { name: 'Button Hover', variable: '--icon-button-hover-bg', description: 'toolbar/toolbar-bg-hovered' },
            { name: 'Button Pressed', variable: '--icon-button-pressed-bg', description: 'toolbar/toolbar-bg-pressed' },
            { name: 'Run Background', variable: '--toolbar-run-bg', description: 'toolbar/toolbar-run-bg' },
            { name: 'Run Hover', variable: '--toolbar-run-bg-hovered', description: 'toolbar/toolbar-run-bg-hovered' },
            { name: 'Stop Background', variable: '--toolbar-stop-bg', description: 'toolbar/toolbar-stop-bg' },
            { name: 'Stop Hover', variable: '--toolbar-stop-bg-hovered', description: 'toolbar/toolbar-stop-bg-hovered' },
            { name: 'Icon Over Accent', variable: '--toolbar-icon-over-accent', description: 'toolbar/toolbar-icon-over-accent' },
        ]
    },
    {
        title: 'Feedback',
        tokens: [
            { name: 'Error Background', variable: '--feedback-error-bg', description: 'feedback/feedback-error-bg' },
            { name: 'Error Border', variable: '--feedback-error-border', description: 'feedback/feedback-error-border' },
            { name: 'Warning Background', variable: '--feedback-warning-bg', description: 'feedback/feedback-warning-bg' },
            { name: 'Warning Border', variable: '--feedback-warning-border', description: 'feedback/feedback-warning-border' },
            { name: 'Success Background', variable: '--feedback-success-bg', description: 'feedback/feedback-success-bg' },
            { name: 'Success Border', variable: '--feedback-success-border', description: 'feedback/feedback-success-border' },
        ]
    },
    {
        title: 'Tooltip',
        tokens: [
            { name: 'Background', variable: '--tooltip-bg', description: 'feedback/feedback-bg' },
            { name: 'Border', variable: '--tooltip-border', description: 'feedback/feedback-border' },
            { name: 'Text', variable: '--tooltip-text', description: 'text/text-default' },
            { name: 'Shortcut', variable: '--tooltip-shortcut', description: 'text/text-muted' },
        ]
    },
    {
        title: 'Got It Tooltip',
        tokens: [
            { name: 'Background', variable: '--got-it-bg', description: 'got-it/got-it-bg' },
            { name: 'Border', variable: '--got-it-border', description: 'got-it/got-it-border' },
            { name: 'Text Step', variable: '--got-it-text-step', description: 'got-it/got-it-text-step' },
            { name: 'Text Link', variable: '--got-it-text-link', description: 'got-it/got-it-text-link' },
        ]
    },
    {
        title: 'Input',
        tokens: [
            { name: 'Background', variable: '--input-bg', description: 'control/control-bg' },
            { name: 'Background Disabled', variable: '--input-bg-disabled', description: 'control/control-bg-disabled' },
            { name: 'Border', variable: '--input-border', description: 'control/control-border' },
            { name: 'Border Hover', variable: '--input-border-hover', description: 'control/control-border-raised' },
            { name: 'Border Focus', variable: '--input-border-focus', description: 'control/control-focus-border-brand' },
            { name: 'Border Error', variable: '--input-border-error', description: 'control/control-focus-border-error' },
            { name: 'Border Disabled', variable: '--input-border-disabled', description: 'control/control-border-disabled' },
        ]
    },
    {
        title: 'Tab',
        tokens: [
            { name: 'Hover', variable: '--tab-hover-bg', description: 'tab/tab-bg-hovered' },
            { name: 'Active Background', variable: '--tab-active-bg', description: 'tab/tab-selected-bg-active' },
            { name: 'Active Border', variable: '--tab-active-border', description: 'tab/tab-selected-border-active' },
            { name: 'Inactive Border', variable: '--tab-inactive-border', description: 'tab/tab-selected-border-inactive' },
        ]
    },
    {
        title: 'Popup',
        tokens: [
            { name: 'Background', variable: '--popup-bg', description: 'container/popup-bg' },
            { name: 'Border', variable: '--popup-border', description: 'container/popup-border' },
            { name: 'Cell Hover', variable: '--popup-cell-bg-hover', description: 'selection/selection-bg-active' },
        ]
    },
    {
        title: 'Dialog',
        tokens: [
            { name: 'Background', variable: '--dialog-bg', description: 'container/dialog-bg' },
            { name: 'Border', variable: '--dialog-border', description: 'container/dialog-border' },
            { name: 'Header Text', variable: '--dialog-header-text', description: 'text/text-default' },
        ]
    },
    {
        title: 'Tool Window',
        tokens: [
            { name: 'Background', variable: '--tool-window-bg', description: 'container/tool-window-bg' },
            { name: 'Border', variable: '--tool-window-border', description: 'container/tool-window-border' },
            { name: 'Header Background', variable: '--tool-window-header-bg', description: 'header bg' },
            { name: 'Header Border', variable: '--tool-window-header-border', description: 'header border' },
            { name: 'Action Icon', variable: '--tool-window-action-icon', description: 'icon/icon-secondary-stroke' },
            { name: 'Action Hover', variable: '--tool-window-action-bg-hover', description: 'core/core-bg-transparent-hovered' },
        ]
    },
    {
        title: 'Scrollbar',
        tokens: [
            { name: 'Track Hover', variable: '--scrollbar-track-hover', description: 'scrollbar track (on hover)' },
            { name: 'Thumb Visible', variable: '--scrollbar-thumb-visible', description: 'scrollbar/scrollbar-bg' },
            { name: 'Thumb Hover', variable: '--scrollbar-thumb-hover', description: 'scrollbar/scrollbar-bg-hovered' },
        ]
    },
    {
        title: 'Separator',
        tokens: [
            { name: 'Default', variable: '--separator', description: 'separator color' },
            { name: 'Opaque', variable: '--separator-opaque', description: 'opaque separator' },
            { name: 'Border Primary', variable: '--border-primary', description: 'container border' },
            { name: 'Border Secondary', variable: '--border-secondary', description: 'secondary border' },
        ]
    },
    {
        title: 'Badge',
        tokens: [
            { name: 'Blue Background', variable: '--badge-blue-bg', description: 'badge/badge-blue-bg' },
            { name: 'Blue Text', variable: '--badge-blue-text', description: 'badge/badge-blue-text' },
            { name: 'Blue Secondary Bg', variable: '--badge-blue-bg-secondary', description: 'badge/badge-blue-bg-secondary' },
            { name: 'Blue Secondary Text', variable: '--badge-blue-text-secondary', description: 'badge/badge-blue-text-secondary' },
            { name: 'Green Background', variable: '--badge-green-bg', description: 'badge/badge-green-bg' },
            { name: 'Green Text', variable: '--badge-green-text', description: 'badge/badge-green-text' },
            { name: 'Green Secondary Bg', variable: '--badge-green-bg-secondary', description: 'badge/badge-green-bg-secondary' },
            { name: 'Green Secondary Text', variable: '--badge-green-text-secondary', description: 'badge/badge-green-text-secondary' },
            { name: 'Purple Secondary Bg', variable: '--badge-purple-bg-secondary', description: 'badge/badge-purple-bg-secondary' },
            { name: 'Purple Secondary Text', variable: '--badge-purple-text-secondary', description: 'badge/badge-purple-text-secondary' },
            { name: 'Gray Secondary Bg', variable: '--badge-gray-bg-secondary', description: 'badge/badge-gray-bg-secondary' },
            { name: 'Disabled Background', variable: '--badge-bg-disabled', description: 'badge/badge-bg-disabled' },
            { name: 'Disabled Text', variable: '--badge-text-disabled', description: 'badge/badge-text-disabled' },
        ]
    },
    {
        title: 'Island Layout',
        tokens: [
            { name: 'Background', variable: '--island-bg', description: 'container/main-window-bg' },
            { name: 'Editor Background', variable: '--island-editor-bg', description: 'container/editor-bg' },
        ]
    },
];

function SemanticColors() {
    return (
        <div className="component-showcase">
            <h1>Semantic Colors</h1>
            <p className="component-description">
                Theme-aware color tokens sourced from the Figma Islands Semantic Colors collection.
                All swatches automatically reflect the current theme (light / dark).
            </p>

            <div className="color-scales">
                {semanticGroups.map((group, i) => (
                    <ColorGroup key={i} title={group.title} tokens={group.tokens} />
                ))}
            </div>
        </div>
    );
}

export default SemanticColors;
