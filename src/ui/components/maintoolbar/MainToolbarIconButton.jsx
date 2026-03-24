import ToolbarIconButton from '../iconbutton/IconButton';

/**
 * MainToolbarIconButton — icon button for the main application toolbar.
 * 40×40px wrapper with a 20px icon and 6px border-radius on the hover/pressed background.
 *
 * Matches Figma "Main Toolbar / Icon Button" component spec.
 * For regular tool-window toolbars use ToolbarIconButton (26×26px, 16px icon).
 */
function MainToolbarIconButton(props) {
    return <ToolbarIconButton {...props} variant="mainToolbar" />;
}

export default MainToolbarIconButton;
