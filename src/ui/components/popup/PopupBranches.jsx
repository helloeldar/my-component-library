import { useState, useRef, useEffect } from 'react';
import Popup from './Popup';
import PopupCell from './PopupCell';
import Icon from '../icon/Icon';
import Search from '../search/Search';
import './PopupBranches.css';

const LOCAL_BRANCHES = [
    { name: 'main', current: true },
    { name: 'feature_MATH-1563_genetic_algorithm', displayName: 'feature_MATH-1563_g...', hint: 'feature_MATH-1563_g...' },
    { name: 'feature_MATH-2875' },
];

const REMOTE_BRANCHES = [
    { name: 'feature_MATH-1563_genetic_algorithm' },
    { name: 'main' },
    { name: '3.6-release' },
    { name: '3.6.1-release' },
];

function BranchActionsPopup({ branchName, style }) {
    return (
        <Popup visible={true} className="popup-branch-actions" style={style}>
            <PopupCell type="line">Checkout</PopupCell>
            <PopupCell type="line">New Branch from '{branchName}'...</PopupCell>
            <PopupCell type="line">Checkout and Rebase onto 'main'</PopupCell>
            <PopupCell type="line" disabled>Checkout and Update</PopupCell>
            <PopupCell type="separator" />
            <PopupCell type="line">Compare with 'main'</PopupCell>
            <PopupCell type="line">Show Diff with Working Tree</PopupCell>
            <PopupCell type="separator" />
            <PopupCell type="line">Rebase 'main' onto '{branchName}'</PopupCell>
            <PopupCell type="line">Merge '{branchName}' into 'main'</PopupCell>
            <PopupCell type="separator" />
            <PopupCell type="line">New Worktree from '{branchName}'...</PopupCell>
            <PopupCell type="separator" />
            <PopupCell type="line" disabled>Update</PopupCell>
            <PopupCell type="line">Push...</PopupCell>
            <PopupCell type="separator" />
            <PopupCell type="line" shortcut="F2">Rename...</PopupCell>
            <PopupCell type="line">Delete</PopupCell>
        </Popup>
    );
}

function BranchItem({ branch, isActive, onSelect }) {
    const label = branch.displayName || branch.name;
    const ref = useRef(null);

    return (
        <div className="popup-branches-branch-wrapper" ref={ref}>
            <div
                className={`popup-branches-branch ${isActive ? 'popup-branches-branch-active' : ''}`}
                data-current={branch.current || undefined}
                onClick={() => onSelect(branch, ref.current)}
            >
                <div className="popup-branches-branch-icon">
                    <Icon name="vcs/vcs" size={16} />
                </div>
                <span className="popup-branches-branch-name text-ui-default">{label}</span>
                {branch.hint && (
                    <span className="popup-branches-branch-hint text-ui-default">{branch.hint}</span>
                )}
                {!branch.current && (
                    <div className="popup-branches-submenu">
                        <Icon name="general/chevronRight" size={16} />
                    </div>
                )}
            </div>
            {isActive && (
                <BranchActionsPopup
                    branchName={branch.name}
                    style={{
                        position: 'absolute',
                        left: '100%',
                        top: 0,
                        marginLeft: '2px',
                        zIndex: 1001,
                    }}
                />
            )}
        </div>
    );
}

function PopupBranches(props) {
    const [query, setQuery] = useState('');
    const [activeBranch, setActiveBranch] = useState(null);
    const popupRef = useRef(null);
    const isSearching = query.length > 0;
    const lowerQuery = query.toLowerCase();

    useEffect(() => {
        if (!activeBranch) return;
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setActiveBranch(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeBranch]);

    const handleBranchSelect = (branch) => {
        setActiveBranch(prev => prev?.name === branch.name ? null : branch);
    };

    const filteredLocal = LOCAL_BRANCHES.filter(b => b.name.toLowerCase().includes(lowerQuery));
    const filteredRemote = REMOTE_BRANCHES.filter(b => b.name.toLowerCase().includes(lowerQuery));
    const totalMatches = filteredLocal.length + filteredRemote.length;

    return (
        <div ref={popupRef}>
            <Popup visible={true} className="popup-branches" style={{ position: 'static', width: '450px', ...props.style }}>
                <div className="popup-branches-search-bar">
                    <Search
                        placeholder="Branches and actions"
                        showClose={isSearching}
                        value={query}
                        onChange={setQuery}
                        onClear={() => setQuery('')}
                    />
                    <div className="popup-branches-search-actions">
                        <div className="popup-branches-action-btn">
                            <Icon name="vcs/fetch" size={16} />
                        </div>
                        <div className="popup-branches-action-btn">
                            <Icon name="general/settings" size={16} />
                        </div>
                    </div>
                </div>

                {!isSearching && (
                    <>
                        <PopupCell type="line" icon="vcs/update" shortcut="⌘T">Update...</PopupCell>
                        <PopupCell type="line" icon="vcs/commit" shortcut="⌘K">Commit...</PopupCell>
                        <PopupCell type="line" icon="vcs/push" shortcut="⌘⇧K">Push...</PopupCell>

                        <PopupCell type="separator" />

                        <PopupCell type="line" icon="general/add">New Branch...</PopupCell>
                        <PopupCell type="line" iconGap>Checkout Tag or Revision...</PopupCell>

                        <PopupCell type="separator" />
                    </>
                )}

                {isSearching && totalMatches === 0 && (
                    <div className="popup-branches-empty text-ui-default">
                        '{query}' not found
                    </div>
                )}

                {filteredLocal.length > 0 && (
                    <Popup.TreeSection title="Local">
                        {filteredLocal.map(branch => (
                            <BranchItem
                                key={branch.name}
                                branch={branch}
                                isActive={activeBranch?.name === branch.name}
                                onSelect={handleBranchSelect}
                            />
                        ))}
                    </Popup.TreeSection>
                )}

                {filteredRemote.length > 0 && (
                    <Popup.TreeSection title="Remote">
                        {filteredRemote.map(branch => (
                            <BranchItem
                                key={`remote-${branch.name}`}
                                branch={branch}
                                isActive={activeBranch?.name === branch.name}
                                onSelect={handleBranchSelect}
                            />
                        ))}
                    </Popup.TreeSection>
                )}

                <div className="popup-branches-spacer" />
            </Popup>
        </div>
    );
}

export default PopupBranches;
