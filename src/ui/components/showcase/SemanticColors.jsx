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
        title: 'Layer System',
        tokens: [
            { name: 'Layer 0 Bg', variable: '--layer-0-bg', description: 'layer/layer-0-bg' },
            { name: 'Layer 0 Border', variable: '--layer-0-border', description: 'layer/layer-0-border' },
            { name: 'Layer 0 Bg Inline', variable: '--layer-0-bg-inline', description: 'layer/layer-0-bg-inline' },
            { name: 'Layer 1 Bg', variable: '--layer-1-bg', description: 'layer/layer-1-bg' },
            { name: 'Layer 1 Border', variable: '--layer-1-border', description: 'layer/layer-1-border' },
            { name: 'Layer 1 Bg Inline', variable: '--layer-1-bg-inline', description: 'layer/layer-1-bg-inline' },
            { name: 'Layer 2 Bg', variable: '--layer-2-bg', description: 'layer/layer-2-bg' },
            { name: 'Layer 2 Border', variable: '--layer-2-border', description: 'layer/layer-2-border' },
            { name: 'Layer 2 Bg Inline', variable: '--layer-2-bg-inline', description: 'layer/layer-2-bg-inline' },
        ]
    },
    {
        title: 'Core',
        tokens: [
            { name: 'Transparent Hovered', variable: '--core-bg-transparent-hovered', description: 'core/core-bg-transparent-hovered' },
            { name: 'Transparent Pressed', variable: '--core-bg-transparent-pressed', description: 'core/core-bg-transparent-pressed' },
            { name: 'Border Transparent', variable: '--core-border-transparent', description: 'core/core-border-transparent' },
        ]
    },
    {
        title: 'Accent',
        tokens: [
            { name: 'Brand Bg', variable: '--accent-brand-bg', description: 'accent/accent-brand-bg' },
            { name: 'Brand Border', variable: '--accent-brand-border', description: 'accent/accent-brand-border' },
            { name: 'Brand Bg Secondary', variable: '--accent-brand-bg-secondary', description: 'accent/accent-brand-bg-secondary' },
            { name: 'Brand Border Secondary', variable: '--accent-brand-border-secondary', description: 'accent/accent-brand-border-secondary' },
            { name: 'Brand Over Brand', variable: '--accent-brand-border-over-brand', description: 'accent/accent-brand-border-over-brand' },
            { name: 'Success Bg', variable: '--accent-success-bg', description: 'accent/accent-success-bg' },
            { name: 'Success Border', variable: '--accent-success-border', description: 'accent/accent-success-border' },
            { name: 'Warning Bg', variable: '--accent-warning-bg', description: 'accent/accent-warning-bg' },
            { name: 'Warning Border', variable: '--accent-warning-border', description: 'accent/accent-warning-border' },
            { name: 'Error Bg', variable: '--accent-error-bg', description: 'accent/accent-error-bg' },
            { name: 'Error Border', variable: '--accent-error-border', description: 'accent/accent-error-border' },
            { name: 'Neutral Bg', variable: '--accent-neutral-bg', description: 'accent/accent-neutral-bg' },
        ]
    },
    {
        title: 'Text',
        tokens: [
            { name: 'Default', variable: '--text-default', description: 'text/text-default' },
            { name: 'Muted', variable: '--text-muted', description: 'text/text-muted' },
            { name: 'Secondary', variable: '--text-secondary', description: 'text/text-secondary' },
            { name: 'Disabled', variable: '--text-disabled', description: 'text/text-disabled' },
            { name: 'Over Accent', variable: '--text-over-accent', description: 'text/text-over-accent' },
            { name: 'Link', variable: '--text-link', description: 'text/text-link' },
            { name: 'Success', variable: '--text-success', description: 'text/text-success' },
            { name: 'Warning', variable: '--text-warning', description: 'text/text-warning' },
            { name: 'Error', variable: '--text-error', description: 'text/text-error' },
        ]
    },
    {
        title: 'Container',
        tokens: [
            { name: 'Tool Window Bg', variable: '--tool-window-bg', description: 'container/tool-window-bg' },
            { name: 'Tool Window Border', variable: '--tool-window-border', description: 'container/tool-window-border' },
            { name: 'Popup Bg', variable: '--popup-bg', description: 'container/popup-bg' },
            { name: 'Popup Border', variable: '--popup-border', description: 'container/popup-border' },
            { name: 'Editor Bg', variable: '--editor-bg', description: 'container/editor-bg' },
            { name: 'Dialog Bg', variable: '--dialog-bg', description: 'container/dialog-bg' },
            { name: 'Dialog Border', variable: '--dialog-border', description: 'container/dialog-border' },
            { name: 'Main Window Bg', variable: '--main-window-bg', description: 'container/main-window-bg' },
            { name: 'Main Window Border', variable: '--main-window-border', description: 'container/main-window-border' },
        ]
    },
    {
        title: 'Control',
        tokens: [
            { name: 'Bg', variable: '--control-bg', description: 'control/control-bg' },
            { name: 'Bg Disabled', variable: '--control-bg-disabled', description: 'control/control-bg-disabled' },
            { name: 'Bg Raised', variable: '--control-bg-raised', description: 'control/control-bg-raised' },
            { name: 'Border', variable: '--control-border', description: 'control/control-border' },
            { name: 'Border Disabled', variable: '--control-border-disabled', description: 'control/control-border-disabled' },
            { name: 'Border Raised', variable: '--control-border-raised', description: 'control/control-border-raised' },
            { name: 'Border Raised Hovered', variable: '--control-border-raised-hovered', description: 'control/control-border-raised-hovered' },
            { name: 'Brand Bg', variable: '--control-brand-bg', description: 'control/control-brand-bg' },
            { name: 'Focus Border Brand', variable: '--control-focus-border-brand', description: 'control/control-focus-border-brand' },
            { name: 'Focus Border Error', variable: '--control-focus-border-error', description: 'control/control-focus-border-error' },
            { name: 'Focus Border Warning', variable: '--control-focus-border-warning', description: 'control/control-focus-border-warning' },
            { name: 'Focus Border Success', variable: '--control-focus-border-success', description: 'control/control-focus-border-success' },
            { name: 'Bg Small', variable: '--control-bg-small', description: 'control/control-bg-small' },
            { name: 'Border Small', variable: '--control-border-small', description: 'control/control-border-small' },
        ]
    },
    {
        title: 'Toolbar',
        tokens: [
            { name: 'Bg Hovered', variable: '--toolbar-bg-hovered', description: 'toolbar/toolbar-bg-hovered' },
            { name: 'Bg Pressed', variable: '--toolbar-bg-pressed', description: 'toolbar/toolbar-bg-pressed' },
            { name: 'Selected Bg', variable: '--toolbar-selected-bg', description: 'toolbar/toolbar-selected-bg' },
            { name: 'Selected Bg Active', variable: '--toolbar-selected-bg-active', description: 'toolbar/toolbar-selected-bg-active' },
            { name: 'Run Bg', variable: '--toolbar-run-bg', description: 'toolbar/toolbar-run-bg' },
            { name: 'Run Bg Hovered', variable: '--toolbar-run-bg-hovered', description: 'toolbar/toolbar-run-bg-hovered' },
            { name: 'Stop Bg', variable: '--toolbar-stop-bg', description: 'toolbar/toolbar-stop-bg' },
            { name: 'Stop Bg Hovered', variable: '--toolbar-stop-bg-hovered', description: 'toolbar/toolbar-stop-bg-hovered' },
            { name: 'Icon Over Accent', variable: '--toolbar-icon-over-accent', description: 'toolbar/toolbar-icon-over-accent' },
        ]
    },
    {
        title: 'Feedback',
        tokens: [
            { name: 'Bg', variable: '--feedback-bg', description: 'feedback/feedback-bg' },
            { name: 'Border', variable: '--feedback-border', description: 'feedback/feedback-border' },
            { name: 'Brand Bg', variable: '--feedback-brand-bg', description: 'feedback/feedback-brand-bg' },
            { name: 'Brand Border', variable: '--feedback-brand-border', description: 'feedback/feedback-brand-border' },
            { name: 'Success Bg', variable: '--feedback-success-bg', description: 'feedback/feedback-success-bg' },
            { name: 'Success Border', variable: '--feedback-success-border', description: 'feedback/feedback-success-border' },
            { name: 'Warning Bg', variable: '--feedback-warning-bg', description: 'feedback/feedback-warning-bg' },
            { name: 'Warning Border', variable: '--feedback-warning-border', description: 'feedback/feedback-warning-border' },
            { name: 'Error Bg', variable: '--feedback-error-bg', description: 'feedback/feedback-error-bg' },
            { name: 'Error Border', variable: '--feedback-error-border', description: 'feedback/feedback-error-border' },
            { name: 'Control Border', variable: '--feedback-control-border', description: 'feedback/feedback-control-border' },
        ]
    },
    {
        title: 'Selection',
        tokens: [
            { name: 'Active', variable: '--selection-bg-active', description: 'selection/selection-bg-active' },
            { name: 'Active Muted', variable: '--selection-bg-active-muted', description: 'selection/selection-bg-active-muted' },
            { name: 'Inactive', variable: '--selection-bg-inactive', description: 'selection/selection-bg-inactive' },
            { name: 'Hovered', variable: '--selection-bg-hovered', description: 'selection/selection-bg-hovered' },
        ]
    },
    {
        title: 'Icon',
        tokens: [
            { name: 'Default Stroke', variable: '--icon-default-stroke', description: 'icon/icon-default-stroke' },
            { name: 'Default Fill', variable: '--icon-default-fill', description: 'icon/icon-default-fill' },
            { name: 'Muted Stroke', variable: '--icon-muted-stroke', description: 'icon/icon-muted-stroke' },
            { name: 'Secondary Stroke', variable: '--icon-secondary-stroke', description: 'icon/icon-secondary-stroke' },
            { name: 'Over Accent', variable: '--icon-over-accent', description: 'icon/icon-over-accent' },
            { name: 'Monochrome', variable: '--icon-monochrome', description: 'icon/icon-monochrome' },
            { name: 'Disabled', variable: '--icon-disabled', description: 'icon/icon-disabled' },
            { name: 'Blue Stroke', variable: '--icon-blue-stroke', description: 'icon/icon-blue-stroke' },
            { name: 'Blue Fill', variable: '--icon-blue-fill', description: 'icon/icon-blue-fill' },
            { name: 'Green Stroke', variable: '--icon-green-stroke', description: 'icon/icon-green-stroke' },
            { name: 'Green Fill', variable: '--icon-green-fill', description: 'icon/icon-green-fill' },
            { name: 'Red Stroke', variable: '--icon-red-stroke', description: 'icon/icon-red-stroke' },
            { name: 'Red Fill', variable: '--icon-red-fill', description: 'icon/icon-red-fill' },
            { name: 'Yellow Stroke', variable: '--icon-yellow-stroke', description: 'icon/icon-yellow-stroke' },
            { name: 'Yellow Fill', variable: '--icon-yellow-fill', description: 'icon/icon-yellow-fill' },
            { name: 'Orange Stroke', variable: '--icon-orange-stroke', description: 'icon/icon-orange-stroke' },
            { name: 'Orange Fill', variable: '--icon-orange-fill', description: 'icon/icon-orange-fill' },
            { name: 'Teal Stroke', variable: '--icon-teal-stroke', description: 'icon/icon-teal-stroke' },
            { name: 'Teal Fill', variable: '--icon-teal-fill', description: 'icon/icon-teal-fill' },
            { name: 'Purple Stroke', variable: '--icon-purple-stroke', description: 'icon/icon-purple-stroke' },
            { name: 'Purple Fill', variable: '--icon-purple-fill', description: 'icon/icon-purple-fill' },
        ]
    },
    {
        title: 'Tab',
        tokens: [
            { name: 'Selected Bg Active', variable: '--tab-selected-bg-active', description: 'tab/tab-selected-bg-active' },
            { name: 'Selected Bg Inactive', variable: '--tab-selected-bg-inactive', description: 'tab/tab-selected-bg-inactive' },
            { name: 'Selected Border Active', variable: '--tab-selected-border-active', description: 'tab/tab-selected-border-active' },
            { name: 'Selected Border Inactive', variable: '--tab-selected-border-inactive', description: 'tab/tab-selected-border-inactive' },
            { name: 'Bg Hovered', variable: '--tab-bg-hovered', description: 'tab/tab-bg-hovered' },
        ]
    },
    {
        title: 'Popup',
        tokens: [
            { name: 'Complex Header Bg', variable: '--popup-complex-header-bg', description: 'popup/popup-complex-header-bg' },
            { name: 'Complex Header Border', variable: '--popup-complex-header-border', description: 'popup/popup-complex-header-border' },
            { name: 'Footer Bg', variable: '--popup-footer-bg', description: 'popup/popup-footer-bg' },
            { name: 'Completion Match Text', variable: '--popup-completion-match-text', description: 'popup/popup-completion-match-text' },
        ]
    },
    {
        title: 'Got It Tooltip',
        tokens: [
            { name: 'Background', variable: '--got-it-bg', description: 'got-it/got-it-bg' },
            { name: 'Border', variable: '--got-it-border', description: 'got-it/got-it-border' },
            { name: 'Text Link', variable: '--got-it-text-link', description: 'got-it/got-it-text-link' },
            { name: 'Text Step', variable: '--got-it-text-step', description: 'got-it/got-it-text-step' },
        ]
    },
    {
        title: 'Scrollbar',
        tokens: [
            { name: 'Background', variable: '--scrollbar-bg', description: 'scrollbar/scrollbar-bg' },
            { name: 'Background Hovered', variable: '--scrollbar-bg-hovered', description: 'scrollbar/scrollbar-bg-hovered' },
        ]
    },
    {
        title: 'Toggle',
        tokens: [
            { name: 'Off Bg', variable: '--toggle-off-bg', description: 'toggle/toggle-off-bg' },
            { name: 'Button Bg', variable: '--toggle-button-bg', description: 'toggle/toggle-button-bg' },
            { name: 'Border', variable: '--toggle-border', description: 'toggle/toggle-border' },
        ]
    },
    {
        title: 'Badge',
        tokens: [
            { name: 'Blue Bg', variable: '--badge-blue-bg', description: 'badge/badge-blue-bg' },
            { name: 'Blue Text', variable: '--badge-blue-text', description: 'badge/badge-blue-text' },
            { name: 'Blue Bg Secondary', variable: '--badge-blue-bg-secondary', description: 'badge/badge-blue-bg-secondary' },
            { name: 'Blue Text Secondary', variable: '--badge-blue-text-secondary', description: 'badge/badge-blue-text-secondary' },
            { name: 'Green Bg', variable: '--badge-green-bg', description: 'badge/badge-green-bg' },
            { name: 'Green Text', variable: '--badge-green-text', description: 'badge/badge-green-text' },
            { name: 'Purple Bg Secondary', variable: '--badge-purple-bg-secondary', description: 'badge/badge-purple-bg-secondary' },
            { name: 'Gray Bg Secondary', variable: '--badge-gray-bg-secondary', description: 'badge/badge-gray-bg-secondary' },
            { name: 'Disabled Bg', variable: '--badge-bg-disabled', description: 'badge/badge-bg-disabled' },
            { name: 'Disabled Text', variable: '--badge-text-disabled', description: 'badge/badge-text-disabled' },
        ]
    },
    {
        title: 'Shadow',
        tokens: [
            { name: 'Popup', variable: '--shadow-popup', description: 'shadow/shadow-popup' },
            { name: 'Dialog', variable: '--shadow-dialog', description: 'shadow/shadow-dialog' },
            { name: 'Editor Tooltip', variable: '--shadow-editor-tooltip', description: 'shadow/shadow-editor-tooltip' },
            { name: 'Main Window', variable: '--shadow-main-window', description: 'shadow/shadow-main-window' },
            { name: 'Notification', variable: '--shadow-notification', description: 'shadow/shadow-notification' },
        ]
    },
];

function SemanticColors() {
    return (
        <div className="component-showcase">
            <h1>Semantic Colors</h1>
            <p className="component-description">
                Theme-aware color tokens synced from <code>figma-exports/Int UI Kit Islands. Semantic colors.json</code>.
                Groups match the Figma collection structure. Swatches automatically reflect the current theme.
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
