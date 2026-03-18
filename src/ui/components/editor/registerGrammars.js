import { languages, rest } from 'prism-react-editor/prism';

const clikeComment = /\/\/.*|\/\*[^]*?(?:\*\/|$)/g;
const clikeString = /(["'])(?:\\[^]|(?!\1)[^\\\n])*\1/g;
const clikePunctuation = /[()[\]{}.,:;]/;
const booleanToken = /\b(?:false|true)\b/;
const dotPunctuation = { punctuation: /\./ };

function clone(o) {
    if (typeof o !== 'object' || o === null) return o;
    if (Array.isArray(o)) return o.map(clone);
    const c = {};
    for (const key of Object.keys(o)) c[key] = clone(o[key]);
    if (o instanceof RegExp) return new RegExp(o.source, o.flags);
    return c;
}

function extend(id, redef) {
    return Object.assign(clone(languages[id]), redef);
}

function insertBefore(grammar, before, insert) {
    const temp = {};
    for (const token in grammar) {
        temp[token] = grammar[token];
        delete grammar[token];
    }
    for (const token in temp) {
        if (token === before) Object.assign(grammar, insert);
        if (!insert.hasOwnProperty(token)) grammar[token] = temp[token];
    }
}

// --- JavaScript ---
const maybeClassName = { 'maybe-class-name': /^[A-Z].*/ };
languages.js = languages.javascript = {
    'doc-comment': { pattern: /\/\*\*(?!\/)[^]*?(?:\*\/|$)/g, alias: 'comment', inside: 'jsdoc' },
    comment: clikeComment,
    hashbang: { pattern: /^#!.*/g, alias: 'comment' },
    'template-string': {
        pattern: /`(?:\\[^]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}|(?!\$\{)[^\\`])*`/g,
        inside: {
            'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
            interpolation: {
                pattern: /((?:^|[^\\])(?:\\\\)*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
                lookbehind: true,
                inside: {
                    'interpolation-punctuation': { pattern: /^..|\}$/g, alias: 'punctuation' },
                    [rest]: 'js',
                },
            },
            string: /[^]+/,
        },
    },
    'string-property': {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\[^]|(?!\2)[^\\\n])*\2(?=\s*:)/gm,
        lookbehind: true, alias: 'property',
    },
    string: clikeString,
    regex: {
        pattern: /((?:^|[^$\w\xa0-\uffff"'`.)\]\s]|\b(?:return|yield))\s*)\/(?:(?:\[(?:\\.|[^\\\n\]])*\]|\\.|[^\\\n/[])+\/[dgimyus]{0,7}|(?:\[(?:\\.|[^\\\n[\]]|\[(?:\\.|[^\\\n[\]]|\[(?:\\.|[^\\\n[\]])*\])*\])*\]|\\.|[^\\\n/[])+\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?!\/\*|[^()[\]{}.,:;?`\n%&|^!=<>/*+-]))/g,
        lookbehind: true,
        inside: {
            'regex-flags': /\w+$/,
            'regex-delimiter': /^\/|\/$/,
            'regex-source': { pattern: /.+/, alias: 'language-regex', inside: 'regex' },
        },
    },
    'class-name': [
        { pattern: /(\b(?:class|extends|implements|instanceof|interface|new)\s+)(?!\d)(?:(?!\s)[$\w\xa0-\uffff.])+/, lookbehind: true, inside: dotPunctuation },
        { pattern: /(^|[^$\w\xa0-\uffff]|\s)(?![a-z\d])(?:(?!\s)[$\w\xa0-\uffff])+(?=\.(?:constructor|prototype)\b)/, lookbehind: true },
    ],
    'function-variable': {
        pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^)]*\))*\)|(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)\s*=>))/,
        alias: 'function', inside: maybeClassName,
    },
    parameter: [
        /(function(?:\s+(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        /(^|[^$\w\xa0-\uffff]|\s)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*=>)/,
        /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|continue|default|do|else|finally|for|if|return|switch|throw|try|while|yield|class|const|debugger|delete|enum|extends|function|[gs]et|export|from|import|implements|in|instanceof|interface|let|new|null|of|package|private|protected|public|static|super|this|typeof|undefined|var|void|with)(?![$\w\xa0-\uffff]))(?:(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    ].map((pattern) => ({ pattern, lookbehind: true, inside: 'js' })),
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    keyword: [
        { pattern: /(^|[^.]|\.{3}\s*)\b(?:as|assert(?=\s*\{)|export|from(?!\s*[^\s"'])|import)\b/, alias: 'module', lookbehind: true },
        { pattern: /(^|[^.]|\.{3}\s*)\b(?:await|break|case|catch|continue|default|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/, alias: 'control-flow', lookbehind: true },
        { pattern: /(^|[^.]|\.{3}\s*)\b(?:async(?!\s*[^\s($\w\xa0-\uffff])|class|const|debugger|delete|enum|extends|function|[gs]et(?!\s*[^\s#[$\w\xa0-\uffff])|implements|in|instanceof|interface|let|new|null|of|package|private|protected|public|static|super|this|typeof|undefined|var|void|with)\b/, lookbehind: true },
    ],
    boolean: booleanToken,
    function: { pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, inside: maybeClassName },
    number: { pattern: /(^|[^$\w])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][a-fA-F\d]+(?:_[a-fA-F\d]+)*n?|\d+(?:_\d+)*n|(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?)(?![$\w])/, lookbehind: true },
    'literal-property': { pattern: /([\n,{][ \t]*)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?=\s*:)/, lookbehind: true, alias: 'property' },
    operator: [{ pattern: /=>/, alias: 'arrow' }, /--|\+\+|(?:\*\*|&&|\|\||[!=]=|>>>?|<<|[%&|^!=<>/*+-]|\?\?)=?|\.{3}|\?(?!\.)|~|:/],
    'property-access': { pattern: /(\.\s*)#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+/, lookbehind: true, inside: maybeClassName },
    'maybe-class-name': { pattern: /(^|[^$\w\xa0-\uffff])[A-Z][$\w\xa0-\uffff]+/, lookbehind: true },
    punctuation: /\?\.|[()[\]{}.,:;]/,
};

// --- Java ---
const javaKeywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|opens?|package|permits|private|protected|provides|public|record(?!\s*[()[\]{}%~.,:;?%&|^=<>/*+-])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throws?|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
const classNamePrefix = '(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*';
const javaNamespace = { pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/, inside: dotPunctuation };
const javaClassInside = { namespace: javaNamespace, punctuation: /\./ };
const javaClassName = {
    pattern: RegExp(`(^|[^\\w.])${classNamePrefix}[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b`),
    lookbehind: true, inside: javaClassInside,
};

languages.java = {
    'doc-comment': { pattern: /\/\*\*(?!\/)[^]*?(?:\*\/|$)/g, alias: 'comment', inside: 'javadoc' },
    comment: clikeComment,
    'triple-quoted-string': { pattern: /"""[ \t]*\n(?:\\.|[^\\])*?"""/g, alias: 'string' },
    char: /'(?:\\.|[^\\\n']){1,6}'/g,
    string: { pattern: /(^|[^\\])"(?:\\.|[^\\\n"])*"/g, lookbehind: true },
    annotation: { pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/, lookbehind: true, alias: 'punctuation' },
    generics: {
        pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
        inside: { 'class-name': javaClassName, keyword: javaKeywords, punctuation: /[().,:<>]/, operator: /[?&|]/ },
    },
    import: [
        { pattern: RegExp(`(\\bimport\\s+)${classNamePrefix}(?:[A-Z]\\w*|\\*)(?=\\s*;)`), lookbehind: true, inside: { namespace: javaNamespace, punctuation: /\./, operator: /\*/, 'class-name': /\w+/ } },
        { pattern: RegExp(`(\\bimport\\s+static\\s+)${classNamePrefix}(?:\\w+|\\*)(?=\\s*;)`), lookbehind: true, alias: 'static', inside: { namespace: javaNamespace, static: /\b\w+$/, punctuation: /\./, operator: /\*/, 'class-name': /\w+/ } },
    ],
    namespace: {
        pattern: RegExp(`(\\b(?:exports|import(?:\\s+static)?|module|opens?|package|provides|requires|to|transitive|uses|with)\\s+)(?!${javaKeywords.source})[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?`),
        lookbehind: true, inside: dotPunctuation,
    },
    'class-name': [
        javaClassName,
        { pattern: RegExp(`(^|[^\\w.])${classNamePrefix}[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()]|\\s*(?:\\[[\\s,]*\\]\\s*)?::\\s*new\\b)`), lookbehind: true, inside: javaClassInside },
        { pattern: RegExp(`(\\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\\s+)${classNamePrefix}[A-Z]\\w*\\b`), lookbehind: true, inside: javaClassInside },
    ],
    keyword: javaKeywords,
    boolean: booleanToken,
    function: { pattern: /\b\w+(?=\()|(::\s*)[a-z_]\w*/, lookbehind: true },
    number: /\b0b[01][01_]*l?\b|\b0x(?:\.[a-f\d_p+-]+|[a-f\d_]+(?:\.[a-f\d_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    constant: /\b[A-Z][A-Z_\d]+\b/,
    operator: { pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[%&|^!=<>/*+-]=?)/m, lookbehind: true },
    punctuation: clikePunctuation,
};

// --- TypeScript (extends JavaScript) ---
const tsClassName = {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/g,
    lookbehind: true,
};
const ts = languages.ts = languages.typescript = extend('js', { 'class-name': tsClassName });
insertBefore(ts, 'operator', { builtin: /\b(?:Array|Function|Promise|any|boolean|never|number|string|symbol|unknown)\b/ });
ts.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b|\b(?:asserts|infer|interface|module|namespace|type)\b(?!\s*[^\s{_$a-zA-Z\xa0-\uffff])|\btype(?=\s*\*)/);
delete ts['parameter'];
delete ts['literal-property'];
const typeInside = tsClassName.inside = Object.assign({}, ts);
delete typeInside['class-name'];
delete typeInside['maybe-class-name'];
insertBefore(ts, 'constant', {
    decorator: {
        pattern: /@[$\w\xa0-\uffff]+/,
        inside: { at: { pattern: /^@/, alias: 'operator' }, function: /.+/ },
    },
    'generic-function': {
        pattern: /#?(?!\d)(?:(?!\s)[$\w\xa0-\uffff])+\s*<(?:[^<>=]|=[^<]|=?<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/g,
        inside: { generic: { pattern: /<[^]+/, alias: 'class-name', inside: typeInside }, function: /\S+/ },
    },
});

// --- Python ---
const pyInside = {
    'format-spec': { pattern: /(:)[^(){}:]+(?=\}$)/, lookbehind: true },
    'conversion-option': { pattern: /![sra](?=[:}]$)/, alias: 'punctuation' },
};
pyInside[rest] = languages.py = languages.python = {
    comment: /#.*/g,
    'string-interpolation': {
        pattern: /(?:fr?|rf)(?:("""|''')[^]*?\1|(["'])(?:\\[^]|(?!\2)[^\\\n])*\2)/gi,
        inside: {
            interpolation: { pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/, lookbehind: true, inside: pyInside },
            string: /[^]+/,
        },
    },
    'triple-quoted-string': { pattern: /(?:br?|rb?|u)?("""|''')[^]*?\1/gi, alias: 'string' },
    string: /(?:br?|rb?|u)?(["'])(?:\\[^]|(?!\1)[^\\\n])*\1/gi,
    function: { pattern: /((?:^|\s)def[ \t]+)(?!\d)\w+(?=\s*\()/, lookbehind: true },
    'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: true },
    decorator: { pattern: /(^[ \t]*)@\w+(?:\.\w+)*/m, lookbehind: true, alias: 'annotation punctuation', inside: dotPunctuation },
    keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|de[fl]|elif|else|except|exec|finally|f?or|from|global|i[fns]|import|lambda|match|nonlocal|not|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|ma[px]|memoryview|min|next|object|oct|open|ord|pow|property|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|x?range|zip)\b/,
    boolean: /\b(?:False|True|None)\b/,
    number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f\d])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
    operator: /!=|:=|\*\*=?|\/\/=?|<>|>>|<<|[%=<>/*+-]=?|[&|^~]/,
    punctuation: clikePunctuation,
};

// --- Kotlin ---
const ktInterpolationInside = {
    'interpolation-punctuation': { pattern: /^.\{?|\}$/g, alias: 'punctuation' },
    expression: { pattern: /[^]+/ },
};
ktInterpolationInside.expression.inside = languages.kts = languages.kt = languages.kotlin = {
    'string-literal': [
        {
            pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/,
            alias: 'multiline',
            inside: { interpolation: { pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i, inside: ktInterpolationInside }, string: /[^]+/ },
        },
        {
            pattern: /"(?:\\.|[^\\\n"$]|\$(?:(?!\{)|\{[^{}]*\}))*"/,
            alias: 'singleline',
            inside: { interpolation: { pattern: /((?:^|[^\\])(?:\\\\)*)\$(?:[a-z_]\w*|\{[^{}]*\})/i, lookbehind: true, inside: ktInterpolationInside }, string: /[^]+/ },
        },
    ],
    char: /'(?:[^\\\n']|\\(?:.|u[a-fA-F\d]{0,4}))'/g,
    comment: clikeComment,
    annotation: { pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/, alias: 'builtin' },
    keyword: {
        pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
        lookbehind: true,
    },
    boolean: booleanToken,
    label: { pattern: /\b\w+@|@\w+/, alias: 'symbol' },
    function: { pattern: /(?:`[^\n`]+`|\b\w+)(?=\s*\()|(\.)(?:`[^\n`]+`|\w+)(?=\s*\{)/g, lookbehind: true },
    number: /\b(?:0[xX][a-fA-F\d]+(?:_[a-fA-F\d]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
    operator: /--|\+\+|&&|\|\||->|[!=]==|!!|[%!=<>/*+-]=?|[?:]:?|\.\.|\b(?:and|inv|shl|u?shr|x?or)\b/,
    punctuation: clikePunctuation,
};

export const grammarsRegistered = Object.keys(languages).length > 4;
