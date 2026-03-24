import { useState } from 'react';
import ToolWindow from './ToolWindow';
import Icon from '../icon/Icon';
import Search from '../search/Search';
import ToolbarIconButton from '../iconbutton/IconButton';
import ToolbarSeparator from '../toolbar/ToolbarSeparator';
import ToolbarDropdown from '../toolbardropdown/ToolbarDropdown';
import './VCSLogWindow.css';

/* ─── Static data ───────────────────────────────────────────────────────────── */

const BRANCHES = {
    local: [
        { id: 'master', label: 'master', current: true },
        { id: 'feature', label: 'feature', hasChildren: true, expanded: false },
        { id: '36-release', label: '3.6-release' },
        { id: '361-release', label: '3.6.1-release' },
    ],
    remote: [
        {
            id: 'origin', label: 'origin', hasChildren: true, expanded: true,
            children: [
                { id: 'origin-master', label: 'master', current: true },
                { id: 'origin-36', label: '3.6-release' },
                { id: 'origin-361', label: '3.6.1-release' },
            ]
        },
    ],
    tags: [
        { id: 'tag-30', label: '3.0' },
    ],
};

// dotColor: 'blue' | 'orange' | 'gray'
// isHead: shows outer-ring style (HEAD of branch)
const COMMITS = [
    {
        id: 1, dotColor: 'blue', isHead: true,
        message: 'Empty project: conte...',
        refs: [{ type: 'remote', label: 'origin/master' }],
        author: 'John Sadowsky', date: '11.12.2020, 18:34',
    },
    {
        id: 2, dotColor: 'blue',
        messageLink: 'RUBY-29294', messageSuffix: ' adjust...',
        author: 'John Sadowsky', date: '20.11.2020, 16:12',
    },
    {
        id: 3, dotColor: 'blue',
        message: 'Merge pull request #...',
        author: 'Dmitry Dontsov', date: '16.11.2020, 12:21',
    },
    {
        id: 4, dotColor: 'blue',
        message: '[java] report non-ex...',
        author: 'Dmitry Dontsov', date: '8.10.2020, 18:31',
    },
    {
        id: 5, dotColor: 'blue',
        message: 'Wording',
        author: 'Xin Tung', date: '29.9.2020, 11:34',
    },
    {
        id: 6, dotColor: 'blue',
        message: '[draft] downgrade g...',
        author: 'Sergey Prigogin', date: '29.9.2020, 10:15',
    },
    {
        id: 7, dotColor: 'orange',
        message: 'fixup mac/linux/win all in c...',
        author: 'Xin Tung', date: '14.8.2020, 19:20',
    },
    {
        id: 8, dotColor: 'blue',
        message: 'Integration perform...',
        author: 'Sergey Prigogin', date: '14.8.2020, 15:12',
    },
    {
        id: 9, dotColor: 'blue',
        message: '[cwm] Enable conne...',
        author: 'Dmitry Dontsov', date: '14.8.2020, 12:43',
    },
    {
        id: 10, dotColor: 'blue',
        messageLink: '[todo] RUBY-29318...', messageSuffix: '',
        author: 'John Sadowsky', date: '11.8.2020, 10:02',
    },
    {
        id: 11, dotColor: 'gray',
        message: 'FIR IDE: mute newly...',
        author: 'Dmitry Dontsov', date: '10.8.2020, 18:53',
    },
];

const DETAILS_FILES = [
    {
        id: 'path', label: 'src/main/java/org/java/analysis', isPath: true, indent: 0,
        expanded: true,
        children: [
            { id: 'f1', label: 'BivariateFunction', icon: 'nodes/class', indent: 1 },
            { id: 'f2', label: 'FunctionUtils', icon: 'nodes/class', indent: 1 },
            { id: 'f3', label: 'MultivariateFunction', icon: 'nodes/classAbstract', indent: 1 },
        ],
    },
];

/* ─── Graph ──────────────────────────────────────────────────────────────────── */

const GRAPH_COLORS = {
    blue:   '#3574F0',
    orange: '#F2B181',
    gray:   '#6C707E',
};

// SVG-based dots — transparent ring gaps show through to any row background
// (selected / hover / default), no background color dependency needed.
function GraphDot({ color, isHead }) {
    if (isHead) {
        // Three concentric circles matching Figma node 49:28625
        // Outer ring (13px), middle ring (9px), inner solid dot (5px)
        return (
            <svg
                width="13" height="13"
                viewBox="0 0 13 13"
                fill="none"
                className="vcs-log-graph-dot-svg"
            >
                <circle cx="6.5" cy="6.5" r="6"   stroke={color} strokeWidth="1" />
                <circle cx="6.5" cy="6.5" r="4"   stroke={color} strokeWidth="1" />
                <circle cx="6.5" cy="6.5" r="2.5" fill={color} />
            </svg>
        );
    }
    // Regular commit: 9px solid circle matching Figma node 146:5208
    return (
        <svg
            width="9" height="9"
            viewBox="0 0 9 9"
            fill="none"
            className="vcs-log-graph-dot-svg"
        >
            <circle cx="4.5" cy="4.5" r="4.5" fill={color} />
        </svg>
    );
}

// Each commit row draws:
//   - top half of line   (if not first row)
//   - dot centered in cell
//   - bottom half of line (if not last row)
// This makes the line continuous while each row owns its segment.
function CommitGraph({ index, total, dotColor, isHead }) {
    const isFirst = index === 0;
    const isLast  = index === total - 1;
    const color     = GRAPH_COLORS[dotColor] || GRAPH_COLORS.blue;
    const lineColor = dotColor === 'gray' ? GRAPH_COLORS.gray : GRAPH_COLORS.blue;

    return (
        <div className="vcs-log-graph-col">
            {!isFirst && (
                <div
                    className="vcs-log-graph-line vcs-log-graph-line-top"
                    style={{ background: lineColor }}
                />
            )}
            {!isLast && (
                <div
                    className="vcs-log-graph-line vcs-log-graph-line-bottom"
                    style={{ background: lineColor }}
                />
            )}
            <GraphDot color={color} isHead={isHead} />
        </div>
    );
}

/* ─── Panel 1: Branches ─────────────────────────────────────────────────────── */

function BranchNode({ label, indent = 0, current, icon, hasChevron, expanded }) {
    const paddingLeft = 16 + indent * 18;
    return (
        <div className="vcs-log-tree-node" style={{ paddingLeft }}>
            {hasChevron ? (
                <span className="vcs-log-tree-chevron">
                    <Icon name={expanded ? 'general/chevronDown' : 'general/chevronRight'} size={16} />
                </span>
            ) : (
                <span className="vcs-log-tree-chevron-placeholder" />
            )}
            {icon && (
                <span className="vcs-log-tree-icon">
                    <Icon name={icon} size={16} />
                </span>
            )}
            {current && (
                <span className="vcs-log-branch-star">
                    <Icon name="nodes/star" size={16} />
                </span>
            )}
            <span className="vcs-log-tree-label">{label}</span>
        </div>
    );
}

function BranchesSidebar() {
    const [branchSearch, setBranchSearch] = useState('');

    return (
        <div className="vcs-log-branches">
            {/* Vertical toolbar */}
            <div className="vcs-log-branches-toolbar">
                <ToolbarIconButton iconName="general/chevronLeft" icon="general/chevronLeft" tooltip="Collapse Branches" />
                <ToolbarSeparator orientation="horizontal" />
                <ToolbarIconButton icon="general/add" tooltip="New Branch" />
                <ToolbarIconButton icon="vcs/fetch" tooltip="Fetch" />
                <ToolbarIconButton icon="vcs/update" tooltip="Update" />
                <ToolbarIconButton icon="general/delete" tooltip="Delete Branch" />
                <ToolbarIconButton icon="general/settings" tooltip="Settings" />
            </div>

            {/* Branch tree */}
            <div className="vcs-log-branches-tree-area">
                <Search
                    value={branchSearch}
                    onChange={setBranchSearch}
                    placeholder="Search branches"
                    showClose={false}
                    className="vcs-log-branches-search"
                />

                <div className="vcs-log-branch-tree">
                    {/* HEAD */}
                    <BranchNode label="HEAD (Current Branch)" indent={0} />

                    {/* Local */}
                    <BranchNode label="Local" indent={0} hasChevron expanded />
                    {BRANCHES.local.map(b => (
                        <BranchNode
                            key={b.id}
                            label={b.label}
                            indent={1}
                            current={b.current}
                            icon="general/vcs"
                            hasChevron={b.hasChildren}
                            expanded={b.expanded}
                        />
                    ))}

                    {/* Remote */}
                    <BranchNode label="Remote" indent={0} hasChevron expanded />
                    {BRANCHES.remote.map(r => (
                        <div key={r.id}>
                            <BranchNode
                                label={r.label}
                                indent={1}
                                icon="general/vcs"
                                hasChevron
                                expanded={r.expanded}
                            />
                            {r.expanded && r.children && r.children.map(child => (
                                <BranchNode
                                    key={child.id}
                                    label={child.label}
                                    indent={2}
                                    current={child.current}
                                    icon="general/vcs"
                                />
                            ))}
                        </div>
                    ))}

                    {/* Tags */}
                    <BranchNode label="Tags" indent={0} hasChevron expanded={false} />
                </div>
            </div>
        </div>
    );
}

/* ─── Panel 2: Commit Log ────────────────────────────────────────────────────── */

function CommitRow({ commit, index, total, selectedId, onSelect }) {
    const isSelected = commit.id === selectedId;

    return (
        <div
            className={`vcs-log-commit-row ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(commit.id)}
        >
            <CommitGraph
                index={index}
                total={total}
                dotColor={commit.dotColor}
                isHead={commit.isHead}
            />

            {/* Message */}
            <div className="vcs-log-commit-message-col">
                {commit.messageLink ? (
                    <span className="vcs-log-commit-message">
                        <span className="vcs-log-commit-link">{commit.messageLink}</span>
                        {commit.messageSuffix}
                    </span>
                ) : (
                    <span className="vcs-log-commit-message">{commit.message}</span>
                )}
                {commit.refs && commit.refs.map((ref, i) => (
                    <span key={i} className={`vcs-log-ref-badge ${ref.type}`}>
                        <Icon name="general/vcs" size={12} />
                        {ref.label}
                    </span>
                ))}
            </div>

            {/* Author */}
            <div className="vcs-log-commit-author">{commit.author}</div>

            {/* Date */}
            <div className="vcs-log-commit-date">{commit.date}</div>
        </div>
    );
}

function CommitLog({ selectedId, onSelect }) {
    return (
        <div className="vcs-log-commits">
            {/* Toolbar */}
            <div className="vcs-log-commits-toolbar">
                {/* Search field */}
                <div className="vcs-log-search-field">
                    <input placeholder="Text or hash" readOnly />
                    <button className="vcs-log-search-inline-btn" title="Search History">
                        <Icon name="inline/searchHistory" size={16} />
                    </button>
                    <button className="vcs-log-search-inline-btn" title="Match Case">
                        <Icon name="inline/matchCase" size={16} />
                    </button>
                    <button className="vcs-log-search-inline-btn" title="Regex">
                        <Icon name="inline/regex" size={16} />
                    </button>
                </div>

                {/* Filter buttons */}
                <ToolbarDropdown text="Branch" theme="dark" />
                <ToolbarDropdown text="User" theme="dark" />
                <ToolbarDropdown text="Time" theme="dark" />

                <ToolbarSeparator />

                <ToolbarIconButton icon="vcs/update" tooltip="Pull" />
                <ToolbarIconButton icon="vcs/fetch" tooltip="Fetch" />
                <ToolbarIconButton icon="general/show" tooltip="Show Details" />
                <ToolbarIconButton icon="general/refresh" tooltip="Refresh" />
                <ToolbarIconButton icon="general/moreVertical" tooltip="More" />
            </div>

            {/* Commit rows */}
            <div className="vcs-log-commit-table">
                {COMMITS.map((commit, index) => (
                    <CommitRow
                        key={commit.id}
                        commit={commit}
                        index={index}
                        total={COMMITS.length}
                        selectedId={selectedId}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}

/* ─── Panel 3: Commit Details ────────────────────────────────────────────────── */

function DetailsTreeNode({ node, indent = 0 }) {
    const paddingLeft = 10 + indent * 18;
    return (
        <>
            <div className="vcs-log-details-tree-node" style={{ paddingLeft }}>
                {node.isPath ? (
                    <>
                        <span className="vcs-log-tree-chevron">
                            <Icon name="general/chevronRight" size={16} />
                        </span>
                        <Icon name="nodes/folder" size={16} />
                        <span className="vcs-log-details-tree-label path">{node.label}</span>
                    </>
                ) : (
                    <>
                        <span className="vcs-log-tree-chevron-placeholder" />
                        {node.icon && <Icon name={node.icon} size={16} />}
                        <span className="vcs-log-details-tree-label">{node.label}</span>
                    </>
                )}
            </div>
            {node.expanded && node.children && node.children.map(child => (
                <DetailsTreeNode key={child.id} node={child} indent={indent + 1} />
            ))}
        </>
    );
}

function CommitDetails() {
    return (
        <div className="vcs-log-details">
            {/* Toolbar — no custom bg, uses tool-window default */}
            <div className="vcs-log-details-toolbar">
                <div className="vcs-log-details-toolbar-left">
                    <ToolbarIconButton icon="general/locate" tooltip="Locate in Branch Tree" />
                    <ToolbarIconButton icon="vcs/update" tooltip="Revert" />
                    <ToolbarIconButton icon="general/show" tooltip="Show Diff" />
                    <ToolbarSeparator />
                    <ToolbarIconButton icon="general/expandAll" tooltip="Expand All" />
                    <ToolbarIconButton icon="general/collapseAll" tooltip="Collapse All" />
                </div>
                <ToolbarIconButton icon="general/moreVertical" tooltip="More" />
            </div>

            {/* Repo header */}
            <div className="vcs-log-details-header">
                <span className="vcs-log-details-repo">FastMath</span>
                <span className="vcs-log-details-meta">3 files ~/IdeaProjects/fastmath</span>
            </div>

            {/* File tree */}
            <div className="vcs-log-details-tree">
                {DETAILS_FILES.map(node => (
                    <DetailsTreeNode key={node.id} node={node} />
                ))}
            </div>

            {/* Commit info */}
            <div className="vcs-log-commit-info">
                <div className="vcs-log-commit-info-title">
                    fixup mac/linux/win all in cross platform
                </div>
                <div className="vcs-log-commit-info-meta">
                    <span className="vcs-log-commit-hash">d71b8c93</span>
                    {' '}Xin Tung{' '}
                    <span style={{ color: 'var(--text-link)' }}>&lt;Xin.Tung@gmail.com&gt;</span>
                    {' '}on 14.8.2020, 19:20
                </div>
            </div>
        </div>
    );
}

/* ─── Root component ─────────────────────────────────────────────────────────── */

/**
 * VCSLogWindow — VCS Log tool window with Branches sidebar, Commit log, and Commit details.
 *
 * Matches Figma node 25-3448 / 234-10695 from the VCS Components file.
 */
function VCSLogWindow({
    width = 1256,
    height = 369,
    focused = false,
    onFocus,
    onActionClick,
    className = '',
}) {
    const [activeTab, setActiveTab] = useState(0); // "Log" tab active by default
    const [selectedCommitId, setSelectedCommitId] = useState(7); // "fixup..." selected

    return (
        <ToolWindow
            title="Git"
            headerType="tabs"
            tabs={[
                { label: 'Log', closable: false },
                { label: 'Console', closable: true },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            actions={['more', 'minimize']}
            onActionClick={onActionClick}
            width={width}
            height={height}
            focused={focused}
            onFocus={onFocus}
            className={`vcs-log-window ${className}`.trim()}
        >
            <BranchesSidebar />
            <div className="vcs-log-panel-divider" />
            <CommitLog selectedId={selectedCommitId} onSelect={setSelectedCommitId} />
            <div className="vcs-log-panel-divider" />
            <CommitDetails />
        </ToolWindow>
    );
}

export default VCSLogWindow;
