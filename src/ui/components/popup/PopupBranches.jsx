import PopupCell from './PopupCell';
import Icon from '../icon/Icon';
import './PopupBranches.css';

function PopupBranches(props) {
    let classes = ['popup popup-visible popup-branches'];
    if (props.className) classes.push(props.className);

    return (
        <div className={classes.join(' ')} style={{ position: 'static', width: '450px', ...props.style }}>
            {/* Search bar with action buttons */}
            <div className="popup-branches-search-bar">
                <div className="popup-branches-search-field">
                    <Icon name="toolwindows/find" size={16} className="popup-branches-search-icon" />
                    <span className="popup-branches-search-placeholder text-ui-default">Branches and actions</span>
                </div>
                <div className="popup-branches-search-actions">
                    <div className="popup-branches-action-btn">
                        <Icon name="vcs/fetch" size={16} />
                    </div>
                    <div className="popup-branches-action-btn">
                        <Icon name="general/settings" size={16} />
                    </div>
                </div>
            </div>

            {/* VCS action items */}
            <div className="popup-branches-items">
                <PopupCell type="line" icon="vcs/update" shortcut="⌘T">Update...</PopupCell>
                <PopupCell type="line" icon="vcs/commit" shortcut="⌘K">Commit...</PopupCell>
                <PopupCell type="line" icon="vcs/push" shortcut="⌘⇧K">Push...</PopupCell>

                <PopupCell type="separator" />

                <PopupCell type="line" icon="general/add">New Branch...</PopupCell>
                <PopupCell type="line" iconGap>Checkout Tag or Revision...</PopupCell>

                <PopupCell type="separator" />

                {/* Local branches tree section */}
                <div className="popup-branches-tree-header">
                    <div className="popup-branches-tree-chevron">
                        <Icon name="general/chevronDown" size={16} />
                    </div>
                    <span className="text-ui-default">Local</span>
                </div>

                <div className="popup-branches-branch" data-current="true">
                    <div className="popup-branches-branch-icon">
                        <Icon name="vcs/changes" size={16} />
                    </div>
                    <span className="popup-branches-branch-name text-ui-default">main</span>
                </div>

                <div className="popup-branches-branch">
                    <div className="popup-branches-branch-icon">
                        <Icon name="vcs/changes" size={16} />
                    </div>
                    <span className="popup-branches-branch-name text-ui-default">feature_MATH-1563_g...</span>
                    <span className="popup-branches-branch-hint text-ui-default">feature_MATH-1563_g...</span>
                    <div className="popup-branches-submenu">
                        <Icon name="general/chevronRight" size={16} />
                    </div>
                </div>

                <div className="popup-branches-branch">
                    <div className="popup-branches-branch-icon">
                        <Icon name="vcs/changes" size={16} />
                    </div>
                    <span className="popup-branches-branch-name text-ui-default">feature_MATH-2875</span>
                    <div className="popup-branches-submenu">
                        <Icon name="general/chevronRight" size={16} />
                    </div>
                </div>

                {/* Remote branches tree section */}
                <div className="popup-branches-tree-header">
                    <div className="popup-branches-tree-chevron">
                        <Icon name="general/chevronDown" size={16} />
                    </div>
                    <span className="text-ui-default">Remote</span>
                </div>

                <div className="popup-branches-branch">
                    <div className="popup-branches-branch-icon">
                        <Icon name="vcs/changes" size={16} />
                    </div>
                    <span className="popup-branches-branch-name text-ui-default">feature_MATH-1563_genetic_algorithm</span>
                    <div className="popup-branches-submenu">
                        <Icon name="general/chevronRight" size={16} />
                    </div>
                </div>

                <div className="popup-branches-branch">
                    <div className="popup-branches-branch-icon">
                        <Icon name="vcs/changes" size={16} />
                    </div>
                    <span className="popup-branches-branch-name text-ui-default">main</span>
                    <div className="popup-branches-submenu">
                        <Icon name="general/chevronRight" size={16} />
                    </div>
                </div>

                <div className="popup-branches-branch">
                    <div className="popup-branches-branch-icon">
                        <Icon name="vcs/changes" size={16} />
                    </div>
                    <span className="popup-branches-branch-name text-ui-default">3.6-release</span>
                    <div className="popup-branches-submenu">
                        <Icon name="general/chevronRight" size={16} />
                    </div>
                </div>

                <div className="popup-branches-branch">
                    <div className="popup-branches-branch-icon">
                        <Icon name="vcs/changes" size={16} />
                    </div>
                    <span className="popup-branches-branch-name text-ui-default">3.6.1-release</span>
                    <div className="popup-branches-submenu">
                        <Icon name="general/chevronRight" size={16} />
                    </div>
                </div>
            </div>

            <div className="popup-branches-spacer" />
        </div>
    );
}

export default PopupBranches;
