import './EmptyState.css';
import '../../styles/Typography.css';
import Link from '../link/Link';
import Icon from '../icon/Icon';

/**
 * Empty State component following IntelliJ UI Guidelines
 * https://plugins.jetbrains.com/docs/intellij/empty-state.html
 *
 * @param {Object} props
 * @param {string} props.explanation - Reason why the container is empty (e.g. "No datasources added.")
 * @param {string} props.actionText - Action link text (e.g. "Add data source...")
 * @param {string} props.actionShortcut - Keyboard shortcut for the action (e.g. "⌘N")
 * @param {function} props.onAction - Click handler for the action link
 * @param {string} props.helpText - Help link text (e.g. "Defining a database")
 * @param {string} props.helpHref - URL for the help link
 * @param {string} props.className - Additional CSS classes
 */
function EmptyState({
    explanation,
    actionText,
    actionShortcut,
    onAction,
    helpText,
    helpHref,
    className = '',
    ...rest
}) {
    return (
        <div className={`empty-state text-ui-default ${className}`.trim()} {...rest}>
            <p className="empty-state-explanation">{explanation}</p>

            {actionText && (
                <div className="empty-state-action">
                    <Link onClick={onAction}>{actionText}</Link>
                    {actionShortcut && (
                        <span className="empty-state-shortcut">{actionShortcut}</span>
                    )}
                </div>
            )}

            {helpText && (
                <div className="empty-state-help">
                    <Icon name="general/questionMark" size={16} />
                    <Link href={helpHref}>{helpText}</Link>
                </div>
            )}
        </div>
    );
}

export default EmptyState;
