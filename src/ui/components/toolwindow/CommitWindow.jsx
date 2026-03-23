import { useState } from 'react';
import ToolWindow from './ToolWindow';
import TreeNode from '../tree/TreeNode';
import Checkbox from '../checkbox/Checkbox';
import Button from '../button/Button';
import ToolbarIconButton from '../iconbutton/IconButton';
import './CommitWindow.css';

const DEFAULT_PREVIOUS_COMMIT = `Fix NullPointerException in FunctionUtils.evaluateAll()

The method failed when the input list contained null entries.
Added a null-check guard before delegating to AdapterScript.

Fixes #1042`;

const defaultFiles = [
    {
        id: 'changes',
        label: 'Changes',
        count: '2 files',
        isExpanded: true,
        children: [
            { id: 'adapter', label: 'AdapterScript.java', path: '~/IdeaProjects/FastMath/src/main/java/com/example', icon: 'fileTypes/java', status: 'modified' },
            { id: 'function', label: 'FunctionUtils.java', path: '~/IdeaProjects/FastMath/src/main/java/com/example', icon: 'fileTypes/java', status: 'modified' },
        ],
    },
    {
        id: 'unversioned',
        label: 'Unversioned Files',
        count: '1 file',
        isExpanded: false,
        children: [
            { id: 'newhelper', label: 'NewHelper.java', path: '~/IdeaProjects/FastMath/src/main/java/com/example', icon: 'fileTypes/java', status: 'added' },
        ],
    },
];

/** Compute status counts for checked files. Returns array of {label, status} segments. */
function buildStatusSegments(checkedIds, groups) {
    const counts = { modified: 0, added: 0, deleted: 0 };
    groups.forEach(group => {
        group.children.forEach(file => {
            if (checkedIds.has(file.id) && counts[file.status] !== undefined) {
                counts[file.status]++;
            }
        });
    });
    const segments = [];
    if (counts.modified > 0) segments.push({ label: `${counts.modified} modified`, status: 'modified' });
    if (counts.added > 0)    segments.push({ label: `${counts.added} added`,    status: 'added' });
    if (counts.deleted > 0)  segments.push({ label: `${counts.deleted} deleted`, status: 'deleted' });
    return segments;
}

/** Derive group checkbox state from its children and checked set */
function groupCheckState(group, checkedIds) {
    const total = group.children.length;
    if (total === 0) return { checked: false, indeterminate: false };
    const checkedCount = group.children.filter(f => checkedIds.has(f.id)).length;
    if (checkedCount === 0) return { checked: false, indeterminate: false };
    if (checkedCount === total) return { checked: true, indeterminate: false };
    return { checked: false, indeterminate: true };
}

/**
 * CommitWindow - VCS Commit tool window component.
 *
 * Shows staged/unstaged file changes in a tree with checkbox selection,
 * an "Amend" option, commit message textarea, and Commit / Commit and Push buttons.
 *
 * Checkbox logic:
 * - Clicking a group checkbox checks/unchecks all its children at once.
 * - Children can be toggled one by one.
 * - Group shows indeterminate state when partially selected.
 *
 * The status summary (bottom right) counts selected files by git status:
 * modified / added / deleted. Hidden when nothing is selected.
 *
 * Matches Figma node 27921:15443.
 *
 * @param {string} title - Window title
 * @param {number|string} width - Window width
 * @param {number|string} height - Window height
 * @param {Array} files - Tree groups with children (each child has status field)
 * @param {string} commitMessage - Controlled commit message value
 * @param {Function} onCommit - Called with (message, amend, checkedFileIds)
 * @param {Function} onCommitAndPush - Called with (message, amend, checkedFileIds)
 * @param {string} previousCommitMessage - Message loaded into textarea when Amend is checked
 * @param {string} className - Additional CSS classes
 */
function CommitWindow({
    title = 'Commit',
    width = 360,
    height = 606,
    files = defaultFiles,
    commitMessage: controlledMessage,
    previousCommitMessage = DEFAULT_PREVIOUS_COMMIT,
    onCommit,
    onCommitAndPush,
    className = '',
}) {
    const [amend, setAmend] = useState(false);
    // Snapshot of the message before amend was activated, so we can restore it on uncheck
    const [preAmendMessage, setPreAmendMessage] = useState('');
    const [message, setMessage] = useState(controlledMessage ?? '');

    const handleAmendChange = (checked) => {
        if (checked) {
            setPreAmendMessage(message);
            setMessage(previousCommitMessage);
        } else {
            setMessage(preAmendMessage);
        }
        setAmend(checked);
    };

    // Expand/collapse state per group id
    const [expanded, setExpanded] = useState(() =>
        Object.fromEntries(files.map(f => [f.id, f.isExpanded]))
    );

    // Checked file ids — all files checked by default
    const [checkedIds, setCheckedIds] = useState(() => {
        const all = new Set();
        files.forEach(g => g.children.forEach(f => all.add(f.id)));
        return all;
    });

    const handleGroupToggle = (groupId) => {
        setExpanded(prev => ({ ...prev, [groupId]: !prev[groupId] }));
    };

    const handleGroupCheck = (group) => {
        const { checked, indeterminate } = groupCheckState(group, checkedIds);
        const childIds = group.children.map(f => f.id);
        setCheckedIds(prev => {
            const next = new Set(prev);
            if (!checked && !indeterminate) {
                // none checked → check all
                childIds.forEach(id => next.add(id));
            } else {
                // some or all checked → uncheck all
                childIds.forEach(id => next.delete(id));
            }
            return next;
        });
    };

    const handleFileCheck = (fileId) => {
        setCheckedIds(prev => {
            const next = new Set(prev);
            if (next.has(fileId)) {
                next.delete(fileId);
            } else {
                next.add(fileId);
            }
            return next;
        });
    };

    const statusSegments = buildStatusSegments(checkedIds, files);

    return (
        <ToolWindow
            title={title}
            width={width}
            height={height}
            actions={['more', 'minimize']}
            className={`commit-window ${className}`}
        >
            {/* Toolbar */}
            <div className="commit-toolbar">
                <ToolbarIconButton icon="general/refresh" tooltip="Refresh" />
                <ToolbarIconButton icon="vcs/revert" tooltip="Rollback" />
                <ToolbarIconButton icon="vcs/patch" tooltip="Create Patch" />
                <ToolbarIconButton icon="aiAssistant/aiAssistantColored" tooltip="AI Self-Review" />
                <ToolbarIconButton icon="general/show" tooltip="Show" />
                <ToolbarIconButton icon="general/expandAll" tooltip="Expand All" />
                <ToolbarIconButton icon="general/collapseAll" tooltip="Collapse All" />
            </div>

            {/* File Tree */}
            <div className="commit-tree">
                {files.map(group => {
                    const { checked, indeterminate } = groupCheckState(group, checkedIds);
                    const isExpanded = expanded[group.id] ?? group.isExpanded;
                    return (
                        <TreeNode
                            key={group.id}
                            level={1}
                            hasChildren={group.children.length > 0}
                            isExpanded={isExpanded}
                            onToggle={() => handleGroupToggle(group.id)}
                            prefix={
                                <Checkbox
                                    checked={checked}
                                    indeterminate={indeterminate}
                                    onChange={() => handleGroupCheck(group)}
                                />
                            }
                            label={
                                <>
                                    <span className="commit-group-label text-ui-default-semibold">{group.label}</span>
                                    <span className="commit-group-count text-ui-default">{group.count}</span>
                                </>
                            }
                        >
                            {group.children.map(file => (
                                <TreeNode
                                    key={file.id}
                                    level={2}
                                    hasChildren={false}
                                    icon={file.icon}
                                    prefix={
                                        <Checkbox
                                            checked={checkedIds.has(file.id)}
                                            onChange={() => handleFileCheck(file.id)}
                                        />
                                    }
                                    label={
                                        <>
                                            <span className={`commit-file-name commit-status-${file.status} text-ui-default`}>{file.label}</span>
                                            <span className="commit-file-path text-ui-default">{file.path}</span>
                                        </>
                                    }
                                />
                            ))}
                        </TreeNode>
                    );
                })}
            </div>

            {/* Bottom Panel */}
            <div className="commit-bottom-panel">
                {/* Amend toolbar */}
                <div className="commit-amend-toolbar">
                    <div className="commit-amend-left">
                        <Checkbox
                            label="Amend"
                            checked={amend}
                            onChange={handleAmendChange}
                        />
                        <ToolbarIconButton icon="general/history" tooltip="Show History" />
                        <ToolbarIconButton icon="aiAssistant/aiAssistantColored" tooltip="Generate Commit Message" />
                    </div>
                    {statusSegments.length > 0 && (
                        <span className="commit-modified-count text-ui-default">
                            {statusSegments.map((seg, i) => (
                                <span key={seg.status}>
                                    {i > 0 && <span className="commit-status-modified">, </span>}
                                    <span className={`commit-status-${seg.status}`}>{seg.label}</span>
                                </span>
                            ))}
                        </span>
                    )}
                </div>

                {/* Commit Message */}
                <div className="commit-message-area">
                    <textarea
                        className="commit-message-textarea text-ui-default"
                        placeholder="Commit message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                {/* Buttons */}
                <div className="commit-actions">
                    <div className="commit-buttons">
                        <Button
                            type="primary"
                            onClick={() => onCommit && onCommit(message, amend, checkedIds)}
                        >
                            Commit
                        </Button>
                        <Button
                            type="secondary"
                            onClick={() => onCommitAndPush && onCommitAndPush(message, amend, checkedIds)}
                        >
                            Commit and Push...
                        </Button>
                    </div>
                    <ToolbarIconButton icon="general/settings" tooltip="Commit Options" />
                </div>
            </div>
        </ToolWindow>
    );
}

export default CommitWindow;
