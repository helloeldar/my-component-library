import { useState, useEffect, useRef, useCallback } from 'react';
import Checkbox from '../checkbox/Checkbox';
import TabBar from '../tabs/TabBar';
import Search from '../search/Search';
import ToolbarIconButton from '../iconbutton/IconButton';
import PopupCell from './PopupCell';
import './SearchEverywherePopup.css';

const DEFAULT_TABS = [
    { label: 'All' },
    { label: 'Classes' },
    { label: 'Files' },
    { label: 'Symbols' },
    { label: 'Actions' },
];

const DEFAULT_ITEMS = [
    { icon: 'fileTypes/java', name: 'AdaptiveStepsizeFieldIntegrator.java', path: 'src/main/...ons/math/ode/nonstiff', module: 'commons-math4', moduleIcon: 'nodes/folder' },
    { icon: 'fileTypes/java', name: 'AdaptiveStepsizeIntegrator.java', path: 'src/main/...ommons/math/ode/nonstiff', module: 'commons-math4', moduleIcon: 'nodes/folder' },
    { icon: 'fileTypes/java', name: 'AdamsFieldStepInterpolator.java', path: 'src/main/...mmons/math/ode/nonstiff', module: 'commons-math4', moduleIcon: 'nodes/folder' },
    { icon: 'nodes/class', name: 'PlatfromImpl', path: 'org.apache.commons.math4.transform', module: 'commons-math4', moduleIcon: 'nodes/folder' },
    { icon: 'nodes/class', name: 'PlatfromLogger', path: 'org.apache.commons.math4.transform', module: 'commons-math4', moduleIcon: 'nodes/folder' },
    { icon: 'nodes/class', name: 'PlatfromImpl', path: 'org.apache.commons.math4.transform', module: 'commons-math4', moduleIcon: 'nodes/folder' },
    { icon: 'nodes/class', name: 'GlassAppletWindow', path: 'org.apache.commons.math4.transform', module: 'commons-math4', moduleIcon: 'nodes/folder' },
    { icon: 'nodes/class', name: 'fastMethod', path: 'in org.apache.commons.math4.util.FastMathStrictCompare', module: 'commons-math4', moduleIcon: 'nodes/folder' },
    { icon: 'nodes/class', name: 'PlatfromLogger', path: 'in org.apache.commons.math4.dfp.Dfp', module: 'commons-math4', moduleIcon: 'nodes/folder' },
    { icon: 'nodes/interface', name: 'FastMath', shortcut: 'Debug ⏎ / Run ⇧⏎' },
];

/**
 * Popup / Search Everywhere
 *
 * Rich popup with tabbed navigation, large search field, keyboard-navigable results,
 * and live filtering by name. Matches Figma node 6515:81938.
 *
 * Keyboard behaviour:
 * - Arrow Down / Arrow Up — move selection through results (wraps around)
 * - Typing in the search field filters results and resets selection to first item
 *
 * @param {Object} props
 * @param {Array}    props.tabs                      Tab definitions [{label}]
 * @param {number}   props.activeTab                 Controlled active tab index
 * @param {function} props.onTabChange               Callback on tab change
 * @param {boolean}  props.includeNonProject         "Include non-project items" checkbox state
 * @param {function} props.onIncludeNonProjectChange Callback on checkbox change
 * @param {string}   props.searchValue               Controlled search input value
 * @param {function} props.onSearchChange            Callback on search input change
 * @param {Array}    props.items                     Result items [{icon, name, path, module, moduleIcon, shortcut}]
 * @param {string}   props.footerText                Footer hint text
 * @param {string}   props.className                 Additional CSS classes
 * @param {Object}   props.style                     Inline styles
 */
function SearchEverywherePopup({
    tabs = DEFAULT_TABS,
    activeTab,
    onTabChange,
    includeNonProject,
    onIncludeNonProjectChange,
    searchValue,
    onSearchChange,
    items = DEFAULT_ITEMS,
    footerText = 'Press ⌥↑ or ⌥↓ to navigate search history',
    className = '',
    style,
}) {
    const [internalTab, setInternalTab] = useState(0);
    const [internalSearch, setInternalSearch] = useState('');
    const [internalInclude, setInternalInclude] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const contentRef = useRef(null);

    const currentTab = activeTab !== undefined ? activeTab : internalTab;
    const currentSearch = searchValue !== undefined ? searchValue : internalSearch;
    const currentInclude = includeNonProject !== undefined ? includeNonProject : internalInclude;

    // Filter items by search text (case-insensitive name match)
    const filteredItems = currentSearch.trim()
        ? items.filter(item =>
            item.name.toLowerCase().includes(currentSearch.toLowerCase())
          )
        : items;

    // Reset selection to first item whenever the filtered list changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [currentSearch]);

    // Keep index in bounds if filteredItems shrinks
    const safeIndex = filteredItems.length > 0
        ? Math.min(selectedIndex, filteredItems.length - 1)
        : -1;

    // Scroll the selected row into view on keyboard navigation
    useEffect(() => {
        if (safeIndex < 0 || !contentRef.current) return;
        const row = contentRef.current.children[safeIndex];
        row?.scrollIntoView({ block: 'nearest' });
    }, [safeIndex]);

    const handleTabChange = (i) => {
        if (onTabChange) onTabChange(i);
        else setInternalTab(i);
    };

    const handleSearchChange = (v) => {
        if (onSearchChange) onSearchChange(v);
        else setInternalSearch(v);
    };

    const handleIncludeChange = (v) => {
        if (onIncludeNonProjectChange) onIncludeNonProjectChange(v);
        else setInternalInclude(v);
    };

    // Arrow navigation — attached to the search input via onKeyDown (passed through ...rest)
    const handleKeyDown = useCallback((e) => {
        if (filteredItems.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(i => (i + 1) % filteredItems.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(i => (i - 1 + filteredItems.length) % filteredItems.length);
        }
    }, [filteredItems.length]);

    return (
        <div className={`search-everywhere-popup ${className}`.trim()} style={style}>
            {/* Header: tab bar (left) + controls (right) */}
            <div className="search-everywhere-header">
                <div className="search-everywhere-tabs-wrap">
                    <TabBar
                        tabs={tabs}
                        activeTab={currentTab}
                        focused={true}
                        onTabChange={handleTabChange}
                    />
                </div>
                <div className="search-everywhere-header-right">
                    <Checkbox
                        checked={currentInclude}
                        onChange={handleIncludeChange}
                        label="Include non-project items"
                    />
                    <ToolbarIconButton icon="general/filter" tooltip="Filter" />
                    <ToolbarIconButton icon="general/openInToolWindow" tooltip="Open in Tool Window" />
                </div>
            </div>

            {/* Large search field — Arrow keys bubble up via onKeyDown */}
            <div className="search-everywhere-search">
                <Search
                    value={currentSearch}
                    onChange={handleSearchChange}
                    placeholder="Search"
                    icon="toolwindows/find"
                    alwaysFocused={true}
                    className="search-everywhere-search-field"
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>

            {/* Results list */}
            <div className="search-everywhere-content" ref={contentRef}>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, i) => (
                        <PopupCell
                            key={i}
                            type="advanced"
                            icon={item.icon}
                            hint={item.path}
                            module={item.module}
                            moduleIcon={item.moduleIcon}
                            shortcut={item.shortcut}
                            selected={i === safeIndex}
                            onClick={() => setSelectedIndex(i)}
                        >
                            {item.name}
                        </PopupCell>
                    ))
                ) : (
                    <div className="search-everywhere-empty text-ui-default">
                        No results for &ldquo;{currentSearch}&rdquo;
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="search-everywhere-footer-spacer" />
            <PopupCell type="footer">{footerText}</PopupCell>
        </div>
    );
}

export default SearchEverywherePopup;
