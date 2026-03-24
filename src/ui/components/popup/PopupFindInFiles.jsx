import { useState } from 'react';
import Icon from '../icon/Icon';
import Checkbox from '../checkbox/Checkbox';
import Combobox from '../combobox/Combobox';
import ToolbarIconButton from '../iconbutton/IconButton';
import Button from '../button/Button';
import './PopupFindInFiles.css';

const FILE_MASK_OPTIONS = [
  { label: '*.js', value: '*.js' },
  { label: '*.ts', value: '*.ts' },
  { label: '*.java', value: '*.java' },
  { label: '*.kt', value: '*.kt' },
];

const SCOPES = ['In Project', 'Module', 'Directory', 'Scope'];

const DEFAULT_RESULTS = [
  { icon: 'nodes/class', name: 'PlatfromImpl', line: 69, snippet: 'private static AtomicInteger numWindows = new AtomicInteger...' },
  { icon: 'nodes/class', name: 'PlatfromImpl', line: 69, snippet: 'private static AtomicInteger numWindows = new AtomicInteger...' },
  { icon: 'nodes/class', name: 'PlatfromLogger', line: 36, snippet: 'private static AtomicInteger numWindows = new AtomicInteger...' },
  { icon: 'nodes/class', name: 'PlatfromLogger', line: 133, snippet: 'private AtomicInteger active;' },
  { icon: 'nodes/class', name: 'GlassAppletWindow', line: 149, snippet: 'active = new AtomicInteger(0);' },
];

const CODE_LINES = [
  { text: '/** Convert regular functions to {@link MultivariateDifferentiableFunction}. ...*/\n', color: '#5f826b', italic: true },
  { parts: [
    { text: 'public static', color: '#cf8e6d' },
    { text: ' MultivariateDifferentiableFunction ', color: '#bcbec4' },
    { text: 'toDifferentiable', color: '#56a8f5' },
    { text: '(', color: '#bcbec4' },
    { text: 'final', color: '#cf8e6d' },
    { text: ' MultivariateFunction f, ', color: '#bcbec4' },
  ]},
  { parts: [
    { text: '                                                                  ', color: '#bcbec4' },
    { text: 'final', color: '#cf8e6d' },
    { text: ' MultivariateVectorFunction gradient) {', color: '#bcbec4' },
  ]},
  { text: '\u00a0' },
  { parts: [
    { text: '    return new', color: '#cf8e6d' },
    { text: ' MultivariateDifferentiableFunction() {', color: '#bcbec4' },
  ]},
  { text: '\u00a0' },
  { parts: [
    { text: '        ', color: '#bcbec4' },
    { text: '/** {@inheritDoc} */', color: '#5f826b', italic: true },
  ]},
  { text: '        @Override ', color: '#b3ae60' },
  { parts: [
    { text: '        public double', color: '#cf8e6d' },
    { text: ' ', color: '#bcbec4' },
    { text: 'value', color: '#56a8f5' },
    { text: '(', color: '#bcbec4' },
    { text: 'final double', color: '#cf8e6d' },
    { text: '[] point) { ', color: '#bcbec4' },
    { text: 'return', color: '#cf8e6d' },
    { text: ' f.value(point); }', color: '#bcbec4' },
  ]},
  { text: '\u00a0' },
  { parts: [
    { text: '        ', color: '#5f826b' },
    { text: '/** {@inheritDoc} */ ', color: '#5f826b', italic: true },
  ]},
  { text: '        @Override ', color: '#b3ae60' },
  { parts: [
    { text: '        ', color: '#bcbec4' },
    { text: 'public', color: '#cf8e6d' },
    { text: ' DerivativeStructure ', color: '#bcbec4' },
    { text: 'value', color: '#56a8f5' },
    { text: '(', color: '#bcbec4' },
    { text: 'final', color: '#cf8e6d' },
    { text: ' DerivativeStructure[] point) {', color: '#bcbec4' },
  ]},
];

/**
 * Popup / Find in Files
 * Matches Figma node 6515:93391
 *
 * @param {Object} props
 * @param {string} props.title - Popup title
 * @param {string} props.matchSummary - Match count summary text
 * @param {boolean} props.replaceField - Show replace field below search
 * @param {Array} props.results - Array of result items
 * @param {string} props.className
 * @param {Object} props.style
 */
function PopupFindInFiles({
  title = 'Find in Files',
  matchSummary = '100+ matches in 21+ files',
  replaceField = false,
  results = DEFAULT_RESULTS,
  className = '',
  style,
}) {
  const [activeScope, setActiveScope] = useState('In Project');
  const [matchCase, setMatchCase] = useState(false);
  const [exactWords, setExactWords] = useState(false);
  const [regex, setRegex] = useState(false);
  const [fileMaskEnabled, setFileMaskEnabled] = useState(false);
  const [fileMask, setFileMask] = useState('*.js');
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [selectedResult, setSelectedResult] = useState(0);

  return (
    <div
      className={`popup-find-in-files ${className}`.trim()}
      style={style}
    >
      {/* Complex Header */}
      <div className="pfif-header">
        <div className="pfif-header-content">
          <span className="pfif-header-title text-ui-default-semibold">{title}</span>
          <span className="pfif-header-summary text-ui-default">{matchSummary}</span>
        </div>

        <div className="pfif-header-right">
          <Checkbox
            label="File mask:"
            checked={fileMaskEnabled}
            onChange={setFileMaskEnabled}
          />
          <Combobox
            value={fileMask}
            options={FILE_MASK_OPTIONS}
            onChange={setFileMask}
            className="pfif-file-mask-combobox"
          />
        </div>

        <div className="pfif-header-icons">
          <ToolbarIconButton icon="general/filter" tooltip="Filter Results" />
          <ToolbarIconButton icon="general/pin" tooltip="Pin Tab" />
        </div>
      </div>

      {/* Search and Replace */}
      <div className="pfif-search-section">
        <div className="pfif-search-field pfif-search-field-focused">
          <Icon name="toolwindows/find" size={16} className="pfif-search-icon" />
          <span className="pfif-search-placeholder text-ui-default">Search</span>
          <div className="pfif-search-actions">
            <button
              className={`pfif-inline-btn${false ? ' pfif-inline-btn-selected' : ''}`}
              title="New Line (⌘↩)"
            >
              <Icon name="inline/newLine" size={16} />
            </button>
            <button
              className={`pfif-inline-btn${matchCase ? ' pfif-inline-btn-selected' : ''}`}
              onClick={() => setMatchCase(!matchCase)}
              title="Match Case (⌘⇧C)"
            >
              <Icon name="inline/matchCase" size={16} />
            </button>
            <button
              className={`pfif-inline-btn${exactWords ? ' pfif-inline-btn-selected' : ''}`}
              onClick={() => setExactWords(!exactWords)}
              title="Words (⌘⇧W)"
            >
              <Icon name="inline/exactWords" size={16} />
            </button>
            <button
              className={`pfif-inline-btn${regex ? ' pfif-inline-btn-selected' : ''}`}
              onClick={() => setRegex(!regex)}
              title="Regex (⌘⇧X)"
            >
              <Icon name="inline/regex" size={16} />
            </button>
          </div>
        </div>

        {replaceField && (
          <div className="pfif-search-field">
            <Icon name="toolwindows/find" size={16} className="pfif-search-icon" />
            <span className="pfif-search-placeholder text-ui-default">Replace</span>
            <div className="pfif-search-actions">
              <button className="pfif-inline-btn" title="Preserve Case (⌘⇧P)">
                <Icon name="inline/preserveCase" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scopes Bar — Toolbar / Button style (Figma: Toolbar / Button) */}
      <div className="pfif-scopes">
        {SCOPES.map((scope) => (
          <div key={scope} className="pfif-scope-btn-wrap">
            {activeScope === scope && <div className="pfif-scope-btn-bg" />}
            <button
              className="pfif-scope-btn text-ui-default"
              onClick={() => setActiveScope(scope)}
            >
              {scope}
            </button>
          </div>
        ))}
      </div>

      {/* Results List */}
      <div className="pfif-results">
        {results.map((item, i) => (
          <div
            key={i}
            className={`pfif-result-row${selectedResult === i ? ' pfif-result-row-selected' : ''}`}
            onClick={() => setSelectedResult(i)}
          >
            <div className="pfif-result-left">
              <div className="pfif-result-item-icon">
                <Icon name={item.icon} size={16} />
              </div>
              <span className="pfif-result-name text-ui-default">{item.name}</span>
              <span className="pfif-result-line text-ui-default">{item.line}</span>
            </div>
            <span className="pfif-result-snippet text-ui-default">{item.snippet}</span>
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="pfif-separator-cell">
        <div className="pfif-separator" />
      </div>

      {/* File Title */}
      <div className="pfif-file-title">
        <span className="pfif-file-name text-ui-default">PlatfromImpl.java</span>
        <span className="pfif-file-path text-ui-default">src/main/commons/math/ode/nonstiff</span>
      </div>

      {/* Code Preview */}
      <div className="pfif-code-preview">
        <div className="pfif-code-content">
          {CODE_LINES.map((line, i) => (
            <div key={i} className="pfif-code-line">
              {line.text !== undefined ? (
                <span style={{ color: line.color, fontStyle: line.italic ? 'italic' : undefined }}>
                  {line.text}
                </span>
              ) : (
                line.parts.map((part, j) => (
                  <span
                    key={j}
                    style={{ color: part.color, fontStyle: part.italic ? 'italic' : undefined }}
                  >
                    {part.text}
                  </span>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pfif-footer">
        <Checkbox
          label="Open results in new tab"
          checked={openInNewTab}
          onChange={setOpenInNewTab}
        />
        <div className="pfif-footer-right">
          <span className="pfif-footer-shortcut text-ui-default">⌘↩</span>
          <Button type="secondary">Open in Find Window</Button>
        </div>
      </div>
    </div>
  );
}

export default PopupFindInFiles;
