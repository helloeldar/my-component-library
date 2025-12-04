import { useParams } from 'react-router-dom';
import Button from '../ui/components/button/Button';
import TabBar from '../ui/components/tabs/TabBar';
import Input from '../ui/components/input/Input';
import Tree from '../ui/components/tree/Tree';
import ToolWindow from '../ui/components/toolwindow/ToolWindow';
import Stripe from '../ui/components/stripe/Stripe';
import StripeContainer from '../ui/components/stripe/StripeContainer';
import CodeExample from '../ui/components/showcase/CodeExample';
import Popup from '../ui/components/popup/Popup';

function ComponentPages() {
    const { componentKey } = useParams();

    const buttonExamples = () => (
        <div className="component-showcase">
            <h1>Buttons</h1>

            <div className="component-section">
                <h2>Types</h2>
                <div className="component-examples">
                    <Button type="primary">Primary</Button>
                    <Button type="secondary">Secondary</Button>
                </div>
            </div>

            <div className="component-section">
                <h2>Sizes</h2>
                <div className="component-group">
                    <h3>Default Size</h3>
                    <div className="component-examples">
                        <Button type="primary">Primary</Button>
                        <Button type="secondary">Secondary</Button>
                    </div>
                </div>
                <div className="component-group">
                    <h3>Slim Size</h3>
                    <div className="component-examples">
                        <Button type="primary" size="slim">Primary Slim</Button>
                        <Button type="secondary" size="slim">Secondary Slim</Button>
                    </div>
                </div>
            </div>

            <div className="component-section">
                <h2>Disabled States</h2>
                <div className="component-examples">
                    <Button type="primary" disabled>Primary Disabled</Button>
                    <Button type="secondary" disabled>Secondary Disabled</Button>
                </div>
            </div>
        </div>
    );

    const tabExamples = () => {
        const tabData = [
            { label: "Home" },
            { label: "Profile", icon: "👤" },
            { label: "Settings", icon: "⚙️", closable: true },
            { label: "Documents", closable: true }
        ];

        return (
            <div className="component-showcase">
                <h1>Tabs</h1>

                <div className="component-section">
                    <h2>Horizontal Tabs</h2>
                    <TabBar tabs={tabData} direction="horizontal" />
                </div>

                <div className="component-section">
                    <h2>Vertical Tabs</h2>
                    <div className="vertical-tab-demo">
                        <TabBar tabs={tabData} direction="vertical" />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Small Tabs</h2>
                    <TabBar tabs={tabData} direction="horizontal" size="small" />
                </div>
            </div>
        );
    };

    const inputExamples = () => (
        <div className="component-showcase">
            <h1>Inputs</h1>

            <div className="component-section">
                <h2>Basic Inputs</h2>
                <div className="component-examples-vertical">
                    <Input placeholder="Enter text..." />
                    <Input placeholder="Enter text..." disabled />
                    <Input placeholder="Enter text..." error />
                </div>
            </div>

            <div className="component-section">
                <h2>Labeled Inputs - Horizontal</h2>
                <div className="component-examples-vertical">
                    <Input label="Name" placeholder="Enter your name..." labelWidth="65px" />
                    <Input label="Email" placeholder="Enter your email..." labelWidth="65px" />
                    <Input label="Password" type="password" placeholder="Enter password..." labelWidth="65px" />
                    <Input label="Disabled" placeholder="Disabled field" disabled labelWidth="65px" />
                    <Input label="Error" placeholder="Field with error" error labelWidth="65px" />
                </div>
            </div>

            <div className="component-section">
                <h2>Labeled Inputs - Vertical</h2>
                <div className="component-examples-vertical">
                    <Input label="Full Name" placeholder="Enter your full name..." layout="vertical" />
                    <Input label="Description" placeholder="Enter description..." layout="vertical" />
                    <Input label="Disabled Field" placeholder="Disabled field" layout="vertical" disabled />
                    <Input label="Error Field" placeholder="Field with error" layout="vertical" error />
                </div>
            </div>

            <div className="component-section">
                <h2>Sizes</h2>
                <div className="component-examples-vertical">
                    <Input label="Default Size" placeholder="Default input..." />
                    <Input label="Small Size" placeholder="Small input..." size="small" />
                </div>
            </div>
        </div>
    );

    const treeExamples = () => {
        const treeData = [
            {
                id: '1',
                label: 'src',
                icon: '📁',
                isExpanded: true,
                children: [
                    {
                        id: '1-1',
                        label: 'components',
                        icon: '📁',
                        isExpanded: false,
                        children: [
                            { id: '1-1-1', label: 'Button.jsx', icon: '📄' },
                            { id: '1-1-2', label: 'Input.jsx', icon: '📄' },
                            { id: '1-1-3', label: 'Tree.jsx', icon: '📄' }
                        ]
                    },
                    { id: '1-2', label: 'App.js', icon: '📄' },
                    { id: '1-3', label: 'index.js', icon: '📄' }
                ]
            },
            {
                id: '2',
                label: 'public',
                icon: '📁',
                isExpanded: false,
                children: [
                    { id: '2-1', label: 'index.html', icon: '📄' },
                    { id: '2-2', label: 'favicon.ico', icon: '🖼️' }
                ]
            },
            { id: '3', label: 'package.json', icon: '📄' },
            { id: '4', label: 'README.md', icon: '📄' }
        ];

        return (
            <div className="component-showcase">
                <h1>Tree</h1>

                <div className="component-section">
                    <h2>File Tree</h2>
                    <div className="component-examples-vertical" style={{ maxWidth: '400px' }}>
                        <Tree 
                            data={treeData}
                            onNodeSelect={(id, selected) => console.log('Node selected:', id, selected)}
                            onNodeToggle={(id, expanded) => console.log('Node toggled:', id, expanded)}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const stripeExamples = () => {
        const FolderIcon = () => (
            <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
        );

        const SearchIcon = () => (
            <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        );

        const TerminalIcon = () => (
            <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 1v10h12V5H4z" clipRule="evenodd" />
                <path d="M6.5 9.5l2.5-2v1.5h3v1h-3v1.5l-2.5-2z" />
            </svg>
        );

        const SettingsIcon = () => (
            <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
        );

        return (
            <div className="component-showcase">
                <h1>Stripe</h1>

                <div className="component-section">
                    <h2>Stripe Container</h2>
                    <div className="component-examples">
                        <div style={{ height: '400px', display: 'flex', justifyContent: 'center' }}>
                            <StripeContainer>
                                <Stripe icon={<FolderIcon />} state="selected" title="Project" />
                                <Stripe icon={<SearchIcon />} badge title="Search" />
                                <Stripe icon={<TerminalIcon />} title="Terminal" />
                                <StripeContainer.Separator />
                                <Stripe icon={<SettingsIcon />} title="Settings" />
                            </StripeContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const popupExamples = () => {
        return (
            <div className="component-showcase">
                <h1>Popup</h1>

                <div className="component-section">
                    <h2>Basic Popup</h2>
                    <div className="component-examples">
                        <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                            <Popup 
                                visible={true} 
                                style={{ 
                                    position: 'static',
                                    width: '250px'
                                }}
                            >
                                <Popup.Cell type="line" icon="📄">New File</Popup.Cell>
                                <Popup.Cell type="line" icon="📁">New Folder</Popup.Cell>
                                <Popup.Cell type="line" icon="🔍">Find in Files</Popup.Cell>
                            </Popup>
                        </div>
                    </div>
                </div>

                <div className="component-section">
                    <h2>Popup with Header</h2>
                    <div className="component-examples">
                        <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                            <Popup 
                                visible={true} 
                                header="File Actions"
                                style={{ 
                                    position: 'static',
                                    width: '250px'
                                }}
                            >
                                <Popup.Cell type="line" icon="📄">New File</Popup.Cell>
                                <Popup.Cell type="line" icon="📁">New Directory</Popup.Cell>
                                <Popup.Cell type="separator" />
                                <Popup.Cell type="line" icon="🔄">Refresh</Popup.Cell>
                                <Popup.Cell type="line" icon="⚙️">Settings</Popup.Cell>
                            </Popup>
                        </div>
                    </div>
                </div>

                <div className="component-section">
                    <h2>Complete Popup</h2>
                    <div className="component-examples">
                        <div style={{ position: 'relative', display: 'inline-block', padding: '20px' }}>
                            <Popup 
                                visible={true} 
                                header="Options"
                                footer="Press Esc to close"
                                style={{ 
                                    position: 'static',
                                    width: '280px'
                                }}
                            >
                                <Popup.Cell type="line" icon="📄">New File</Popup.Cell>
                                <Popup.Cell type="line" icon="📁">New Folder</Popup.Cell>
                                <Popup.Cell type="separator" />
                                <Popup.Cell type="multiline" icon="⚙️" hint="Configure settings">
                                    Preferences
                                </Popup.Cell>
                                <Popup.Cell type="line" icon="🔍">Find in Files</Popup.Cell>
                                <Popup.Cell type="separator" />
                                <Popup.Cell type="search" placeholder="Search actions..." />
                            </Popup>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const codeExamples = () => {
        const javaCodeLines = [
            {
                content: "// ...",
                tokens: [
                    { text: "// ...", type: "comment" }
                ]
            },
            {
                content: "package org.springframework.samples.petclinic.vet;",
                tokens: [
                    { text: "package", type: "keyword" },
                    { text: " org.springframework.samples.petclinic.vet;", type: null }
                ]
            },
            { content: "" },
            {
                content: "import ...",
                tokens: [
                    { text: "import", type: "keyword" },
                    { text: " ...", type: null }
                ]
            },
            { content: "" },
            {
                content: "/**",
                tokens: [
                    { text: "/**", type: "doc-comment" }
                ]
            },
            {
                content: " * @author Juergen Hoeller",
                tokens: [
                    { text: " * @author Juergen Hoeller", type: "doc-comment" }
                ]
            },
            {
                content: " * @author Mark Fisher",
                tokens: [
                    { text: " * @author Mark Fisher", type: "doc-comment" }
                ]
            },
            {
                content: " * @author Ken Krebs",
                tokens: [
                    { text: " * @author Ken Krebs", type: "doc-comment" }
                ]
            },
            {
                content: " * @author Arjen Poutsma",
                tokens: [
                    { text: " * @author Arjen Poutsma", type: "doc-comment" }
                ]
            },
            {
                content: " */",
                tokens: [
                    { text: " */", type: "doc-comment" }
                ]
            },
            {
                content: "@Controller",
                tokens: [
                    { text: "@Controller", type: "annotation" }
                ],
                annotation: "📝 Evgenia Popova + 6"
            },
            {
                content: "class VetController {",
                tokens: [
                    { text: "class", type: "keyword" },
                    { text: " VetController {", type: null }
                ]
            },
            { content: "" },
            {
                content: "    private final VetRepository vetRepository;",
                tokens: [
                    { text: "    ", type: null },
                    { text: "private", type: "keyword" },
                    { text: " ", type: null },
                    { text: "final", type: "keyword" },
                    { text: " VetRepository vetRepository;", type: null }
                ],
                annotation: "3 usages"
            },
            { content: "" },
            {
                content: "    public VetController(VetRepository clinicService) {",
                tokens: [
                    { text: "    ", type: null },
                    { text: "public", type: "keyword" },
                    { text: " VetController(VetRepository clinicService) {", type: null }
                ],
                annotation: "📝 Evgenia Popova + 1"
            },
            {
                content: "        this.vetRepository = clinicService;",
                tokens: [
                    { text: "        ", type: null },
                    { text: "this", type: "keyword" },
                    { text: ".vetRepository = clinicService;", type: null }
                ]
            },
            {
                content: "    }",
                tokens: [
                    { text: "    }", type: null }
                ]
            }
        ];

        return (
            <div className="component-showcase">
                <h1>Code Example</h1>

                <div className="component-section">
                    <h2>Basic Code Example</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            lines={javaCodeLines}
                            startLineNumber={1}
                            showLineNumbers={true}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Basic Code Editor</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            placeholder="Enter your code here..." 
                            code={`function hello() {
    console.log("Hello, World!");
}`}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>JavaScript Code Editor</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            placeholder="Enter JavaScript code..." 
                            language="javascript"
                            code={`const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
};

// Example usage
const cartItems = [
    { name: "Laptop", price: 999, quantity: 1 },
    { name: "Mouse", price: 25, quantity: 2 }
];

const total = calculateTotal(cartItems);
console.log(\`Total: $\${total}\`);`}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Java Code Editor</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            placeholder="Enter Java code..." 
                            language="java"
                            code={`public class Calculator {
    private double result;
    
    public Calculator() {
        this.result = 0.0;
    }
    
    public double add(double number) {
        result += number;
        return result;
    }
    
    public double subtract(double number) {
        result -= number;
        return result;
    }
    
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Result: " + calc.add(10).subtract(3));
    }
}`}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Code Editor Without Line Numbers</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            placeholder="Enter code..." 
                            showLineNumbers={false}
                            code={`npm install react
npm start
npm run build`}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Resizable Code Editor</h2>
                    <div className="component-examples-vertical">
                        <CodeExample 
                            placeholder="Enter code..." 
                            resizable={true}
                            code={`// This editor can be resized vertically
const data = await fetch('/api/users');
const users = await data.json();

users.forEach(user => {
    console.log(\`User: \${user.name}\`);
});`}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const toolWindowExamples = () => {
        const largeTreeData = [
            {
                id: '1',
                label: 'intellij',
                icon: '📁',
                isExpanded: true,
                children: [
                    { id: '1-1', label: '.idea', icon: '📁' },
                    {
                        id: '1-2',
                        label: 'src',
                        icon: '📁',
                        isExpanded: true,
                        children: [
                            {
                                id: '1-2-1',
                                label: 'java',
                                icon: '📁',
                                isExpanded: true,
                                children: [
                                    { id: '1-2-1-1', label: 'analysis', icon: '📄' },
                                    { id: '1-2-1-2', label: 'BivariateFunction', icon: '📄' },
                                    { id: '1-2-1-3', label: 'FunctionUtils', icon: '📄' },
                                    { id: '1-2-1-4', label: 'MultivariateFunction', icon: '📄' },
                                    { id: '1-2-1-5', label: 'TrivariateFunction', icon: '📄' }
                                ]
                            },
                            { id: '1-2-2', label: 'polynomials', icon: '📁' },
                            { id: '1-2-3', label: 'solver', icon: '📁' }
                        ]
                    },
                    {
                        id: '1-3',
                        label: 'test',
                        icon: '📁',
                        isExpanded: false,
                        children: [
                            {
                                id: '1-3-1',
                                label: 'java',
                                icon: '📁',
                                children: [
                                    { id: '1-3-1-1', label: 'FunctionUtilsTest', icon: '📄' },
                                    { id: '1-3-1-2', label: 'MonitoredFunction', icon: '📄' },
                                    { id: '1-3-1-3', label: 'SumSyncFunction', icon: '📄' }
                                ]
                            }
                        ]
                    },
                    {
                        id: '1-4',
                        label: 'target',
                        icon: '📁',
                        children: [
                            { id: '1-4-1', label: 'classes', icon: '📁' },
                            { id: '1-4-2', label: 'generated-sources', icon: '📁' },
                            { id: '1-4-3', label: '.gitignore', icon: '📄' }
                        ]
                    },
                    { id: '1-5', label: 'External Libraries', icon: '📁' }
                ]
            }
        ];

        return (
            <div className="component-showcase">
                <h1>Tool Window</h1>

                <div className="component-section">
                    <h2>Tool Window</h2>
                    <div style={{ justifyContent: 'flex-start', gap: '20px' }}>
                        <ToolWindow
                            title="Project"
                            width={320}
                            height={400}
                            actions={['more', 'minimize']}
                            onActionClick={(action) => console.log('Action clicked:', action)}
                        >
                            <Tree 
                                data={largeTreeData}
                                onNodeSelect={(id, selected) => console.log('Node selected:', id, selected)}
                                onNodeToggle={(id, expanded) => console.log('Node toggled:', id, expanded)}
                            />
                        </ToolWindow>

                        <ToolWindow
                            title="Structure"
                            width={280}
                            height={300}
                            actions={['more', 'minimize']}
                            onActionClick={(action) => console.log('Action clicked:', action)}
                        >
                            <div style={{ padding: '12px' }}>
                                <p style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
                                    File structure view would go here
                                </p>
                                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                                    <div>├── App.js</div>
                                    <div>├── Button.jsx</div>
                                    <div>├── Input.jsx</div>
                                    <div>└── Tree.jsx</div>
                                </div>
                            </div>
                        </ToolWindow>
                    </div>
                </div>

                <div className="component-section">
                    <h2>Tabbed Tool Window</h2>
                    <div className="component-examples" style={{ justifyContent: 'flex-start' }}>
                        <ToolWindow
                            title="Debug"
                            headerType="tabs"
                            width={350}
                            height={250}
                            tabs={[
                                { label: "Debugger" },
                                { label: "Console", closable: true },
                                { label: "Variables" }
                            ]}
                            activeTab={0}
                            onTabChange={(index) => console.log('Tab changed:', index)}
                            actions={['add', 'more', 'minimize']}
                            onActionClick={(action) => console.log('Action clicked:', action)}
                        >
                            <div style={{ padding: '16px', fontSize: '13px', color: 'var(--text-primary)' }}>
                                <div style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>Debug Console:</div>
                                <div>→ Application started</div>
                                <div>→ Breakpoint set at line 42</div>
                                <div>→ Waiting for connection...</div>
                            </div>
                        </ToolWindow>
                    </div>
                </div>
            </div>
        );
    };

    switch (componentKey) {
        case 'buttons':
            return buttonExamples();
        case 'tabs':
            return tabExamples();
        case 'inputs':
            return inputExamples();
        case 'tree':
            return treeExamples();
        case 'toolwindow':
            return toolWindowExamples();
        case 'stripe':
            return stripeExamples();
        case 'popup':
            return popupExamples();
        case 'codeexample':
            return codeExamples();
        default:
            return <div className="component-showcase"><h1>Component not found</h1></div>;
    }
}

export default ComponentPages;

