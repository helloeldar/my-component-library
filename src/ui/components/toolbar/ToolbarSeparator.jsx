import './ToolbarSeparator.css';

/**
 * ToolbarSeparator - Divider line between toolbar action groups.
 * Matches Figma "Toolbar / Separator" component (node 5701:76320).
 *
 * @param {'vertical'|'horizontal'} orientation - Separator orientation (default: 'vertical')
 *   'vertical' renders a vertical line (used in horizontal toolbars)
 *   'horizontal' renders a horizontal line (used in vertical toolbars)
 * @param {string} className - Additional CSS classes
 */
function ToolbarSeparator({
    orientation = 'vertical',
    className = '',
    ...props
}) {
    const classes = [
        'toolbar-separator',
        `toolbar-separator-${orientation}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} role="separator" {...props}>
            <div className="toolbar-separator-line" />
        </div>
    );
}

export default ToolbarSeparator;
