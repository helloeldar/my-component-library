import { useState, useMemo, useCallback } from 'react';
import { iconNames } from '../../../icons';
import Icon from '../icon/Icon';
import Search from '../search/Search';
import './Icons.css';

const EXCLUDED_DIRS = ['checkbox-radiobutton', 'ide_logos'];

function groupIcons(names) {
    const groups = {};
    names.forEach(name => {
        if (name.includes('_dark') || name.includes('@')) return;
        const slash = name.indexOf('/');
        const dir = slash !== -1 ? name.slice(0, slash) : '_root';
        if (EXCLUDED_DIRS.includes(dir)) return;
        if (!groups[dir]) groups[dir] = [];
        groups[dir].push(name);
    });
    Object.values(groups).forEach(arr => arr.sort());
    return groups;
}

function highlightMatch(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
        <>
            {text.slice(0, idx)}
            <mark>{text.slice(idx, idx + query.length)}</mark>
            {text.slice(idx + query.length)}
        </>
    );
}

function Icons() {
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState(null);
    const allGroups = useMemo(() => groupIcons(iconNames), []);

    const handleCopy = useCallback((name) => {
        navigator.clipboard.writeText(name).then(() => {
            setCopied(name);
            setTimeout(() => setCopied(null), 1500);
        });
    }, []);

    const filteredGroups = useMemo(() => {
        if (!search.trim()) return allGroups;
        const q = search.trim().toLowerCase();
        const result = {};
        Object.entries(allGroups).forEach(([dir, names]) => {
            const matched = names.filter(n => n.toLowerCase().includes(q));
            if (matched.length) result[dir] = matched;
        });
        return result;
    }, [search, allGroups]);

    const totalIcons = Object.values(allGroups).reduce((s, g) => s + g.length, 0);
    const visibleIcons = Object.values(filteredGroups).reduce((s, g) => s + g.length, 0);
    const sortedDirs = Object.keys(filteredGroups).sort();

    return (
        <div className="component-showcase">
            <h1>Icons</h1>
            <p className="component-description">
                All icons available in the library. Use with <code>{'<Icon name="group/iconName" />'}</code>.
                Dark-theme variants (<code>_dark</code>) are resolved automatically.
            </p>

            <div className="icons-search-bar">
                <Search
                    placeholder="Search icons…"
                    value={search}
                    onChange={setSearch}
                />
                <div className="icons-summary">
                    {search.trim()
                        ? `${visibleIcons} of ${totalIcons} icons`
                        : `${totalIcons} icons in ${sortedDirs.length} groups`}
                </div>
            </div>

            {sortedDirs.length === 0 && (
                <div className="icons-no-results">No icons match "{search}"</div>
            )}

            {sortedDirs.map(dir => (
                <div key={dir} className="icons-group">
                    <h2 className="icons-group-title">
                        {dir === '_root' ? 'Root' : dir}
                        <span className="icons-group-count">{filteredGroups[dir].length}</span>
                    </h2>
                    <div className="icons-grid">
                        {filteredGroups[dir].map(name => (
                            <div
                                key={name}
                                className={`icon-card ${copied === name ? 'icon-card-copied' : ''}`}
                                title="Click to copy name"
                                onClick={() => handleCopy(name)}
                            >
                                <span className="icon-card-preview">
                                    <Icon name={name} size={null} />
                                </span>
                                <span className="icon-card-name">
                                    {copied === name ? 'Copied!' : highlightMatch(name, search.trim())}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Icons;
