import '../../styles/Colors.css';

function Colors() {
    const editorColors = [
        { name: 'Default text', variable: '--editor-default-text' },
        { name: 'Error', variable: '--editor-error' },
        { name: 'Warning', variable: '--editor-warning' },
        { name: 'Link', variable: '--editor-link' },
        { name: 'TODO', variable: '--editor-todo' },
        { name: 'Keyword', variable: '--editor-keyword' },
        { name: 'Method declaration', variable: '--editor-method' },
        { name: 'Constant / Field', variable: '--editor-constant' },
        { name: 'String', variable: '--editor-string' },
        { name: 'Number', variable: '--editor-number' },
        { name: 'Comment', variable: '--editor-comment' },
        { name: 'Doc comment', variable: '--editor-doc-comment' },
        { name: 'Metadata text', variable: '--editor-metadata-text' },
        { name: 'Type parameter', variable: '--editor-type-parameter' },
        { name: 'Implicit anonymous class parameter', variable: '--editor-implicit-param' },
        { name: 'HTML tag', variable: '--editor-html-tag' }
    ];

    const colorScales = [
        {
            name: 'Gray',
            colors: [
                { name: 'White', value: '#FFFFFF', variable: '--white' },
                { name: 'Gray 160', value: '#F7F8F9', variable: '--gray-160' },
                { name: 'Gray 150', value: '#E9EAEE', variable: '--gray-150' },
                { name: 'Gray 140', value: '#DDDFE4', variable: '--gray-140' },
                { name: 'Gray 130', value: '#D1D3D9', variable: '--gray-130' },
                { name: 'Gray 120', value: '#C3C5CB', variable: '--gray-120' },
                { name: 'Gray 110', value: '#B5B7BD', variable: '--gray-110' },
                { name: 'Gray 100', value: '#9FA2A8', variable: '--gray-100' },
                { name: 'Gray 90', value: '#8B8E94', variable: '--gray-90' },
                { name: 'Gray 80', value: '#73767C', variable: '--gray-80' },
                { name: 'Gray 70', value: '#5F6269', variable: '--gray-70' },
                { name: 'Gray 60', value: '#4C4F56', variable: '--gray-60' },
                { name: 'Gray 50', value: '#40434A', variable: '--gray-50' },
                { name: 'Gray 40', value: '#33353B', variable: '--gray-40' },
                { name: 'Gray 30', value: '#26282C', variable: '--gray-30' },
                { name: 'Gray 20', value: '#212326', variable: '--gray-20' },
                { name: 'Gray 10', value: '#191A1C', variable: '--gray-10' },
                { name: 'Black', value: '#000000', variable: '--black' }
            ]
        },
        {
            name: 'Blue',
            colors: [
                { name: 'Blue 160', value: '#F7F8FF', variable: '--blue-160' },
                { name: 'Blue 150', value: '#E3EBFE', variable: '--blue-150' },
                { name: 'Blue 140', value: '#D0DFFE', variable: '--blue-140' },
                { name: 'Blue 130', value: '#BDD3FF', variable: '--blue-130' },
                { name: 'Blue 120', value: '#A7C5FF', variable: '--blue-120' },
                { name: 'Blue 110', value: '#92B7FF', variable: '--blue-110' },
                { name: 'Blue 100', value: '#71A1FE', variable: '--blue-100' },
                { name: 'Blue 90', value: '#538AF9', variable: '--blue-90' },
                { name: 'Blue 80', value: '#3871E1', variable: '--blue-80' },
                { name: 'Blue 70', value: '#2F5EB9', variable: '--blue-70' },
                { name: 'Blue 60', value: '#2E4D89', variable: '--blue-60' },
                { name: 'Blue 50', value: '#2A4371', variable: '--blue-50' },
                { name: 'Blue 40', value: '#233558', variable: '--blue-40' },
                { name: 'Blue 30', value: '#1B283F', variable: '--blue-30' },
                { name: 'Blue 20', value: '#182337', variable: '--blue-20' },
                { name: 'Blue 10', value: '#131A28', variable: '--blue-10' }
            ]
        },
        {
            name: 'Green',
            colors: [
                { name: 'Green 160', value: '#F5FAF3', variable: '--green-160' },
                { name: 'Green 150', value: '#E2EFE2', variable: '--green-150' },
                { name: 'Green 140', value: '#CDE5D1', variable: '--green-140' },
                { name: 'Green 130', value: '#BBDBC2', variable: '--green-130' },
                { name: 'Green 120', value: '#A3CFAE', variable: '--green-120' },
                { name: 'Green 110', value: '#8EC39D', variable: '--green-110' },
                { name: 'Green 100', value: '#6DB083', variable: '--green-100' },
                { name: 'Green 90', value: '#4E9D6C', variable: '--green-90' },
                { name: 'Green 80', value: '#338555', variable: '--green-80' },
                { name: 'Green 70', value: '#2A6E47', variable: '--green-70' },
                { name: 'Green 60', value: '#29583C', variable: '--green-60' },
                { name: 'Green 50', value: '#274B34', variable: '--green-50' },
                { name: 'Green 40', value: '#203B2A', variable: '--green-40' },
                { name: 'Green 30', value: '#192C20', variable: '--green-30' },
                { name: 'Green 20', value: '#16261C', variable: '--green-20' },
                { name: 'Green 10', value: '#111C15', variable: '--green-10' }
            ]
        },
        {
            name: 'Red',
            colors: [
                { name: 'Red 160', value: '#FFF6F5', variable: '--red-160' },
                { name: 'Red 150', value: '#FFE5E5', variable: '--red-150' },
                { name: 'Red 140', value: '#FFD6D6', variable: '--red-140' },
                { name: 'Red 130', value: '#FFC4C5', variable: '--red-130' },
                { name: 'Red 120', value: '#FFB0B2', variable: '--red-120' },
                { name: 'Red 110', value: '#FF9B9F', variable: '--red-110' },
                { name: 'Red 100', value: '#F57E84', variable: '--red-100' },
                { name: 'Red 90', value: '#E4656E', variable: '--red-90' },
                { name: 'Red 80', value: '#C54E58', variable: '--red-80' },
                { name: 'Red 70', value: '#A4414A', variable: '--red-70' },
                { name: 'Red 60', value: '#80383E', variable: '--red-60' },
                { name: 'Red 50', value: '#6D3136', variable: '--red-50' },
                { name: 'Red 40', value: '#56272B', variable: '--red-40' },
                { name: 'Red 30', value: '#3F1E21', variable: '--red-30' },
                { name: 'Red 20', value: '#371B1C', variable: '--red-20' },
                { name: 'Red 10', value: '#291416', variable: '--red-10' }
            ]
        },
        {
            name: 'Yellow',
            colors: [
                { name: 'Yellow 160', value: '#FFF6E9', variable: '--yellow-160' },
                { name: 'Yellow 150', value: '#FDE7C9', variable: '--yellow-150' },
                { name: 'Yellow 140', value: '#FADBB3', variable: '--yellow-140' },
                { name: 'Yellow 130', value: '#F4CD9A', variable: '--yellow-130' },
                { name: 'Yellow 120', value: '#ECBC7B', variable: '--yellow-120' },
                { name: 'Yellow 110', value: '#E4AD5F', variable: '--yellow-110' },
                { name: 'Yellow 100', value: '#D59637', variable: '--yellow-100' },
                { name: 'Yellow 90', value: '#C28013', variable: '--yellow-90' },
                { name: 'Yellow 80', value: '#A56906', variable: '--yellow-80' },
                { name: 'Yellow 70', value: '#875817', variable: '--yellow-70' },
                { name: 'Yellow 60', value: '#694820', variable: '--yellow-60' },
                { name: 'Yellow 50', value: '#583E21', variable: '--yellow-50' },
                { name: 'Yellow 40', value: '#44321D', variable: '--yellow-40' },
                { name: 'Yellow 30', value: '#322517', variable: '--yellow-30' },
                { name: 'Yellow 20', value: '#2C2115', variable: '--yellow-20' },
                { name: 'Yellow 10', value: '#201810', variable: '--yellow-10' }
            ]
        },
        {
            name: 'Orange',
            colors: [
                { name: 'Orange 160', value: '#FFF6F3', variable: '--orange-160' },
                { name: 'Orange 150', value: '#FFE6DD', variable: '--orange-150' },
                { name: 'Orange 140', value: '#FED6CA', variable: '--orange-140' },
                { name: 'Orange 130', value: '#FBC7B7', variable: '--orange-130' },
                { name: 'Orange 120', value: '#F5B6A1', variable: '--orange-120' },
                { name: 'Orange 110', value: '#EEA58E', variable: '--orange-110' },
                { name: 'Orange 100', value: '#E18C71', variable: '--orange-100' },
                { name: 'Orange 90', value: '#CF7659', variable: '--orange-90' },
                { name: 'Orange 80', value: '#B45E43', variable: '--orange-80' },
                { name: 'Orange 70', value: '#964E37', variable: '--orange-70' },
                { name: 'Orange 60', value: '#77402F', variable: '--orange-60' },
                { name: 'Orange 50', value: '#643829', variable: '--orange-50' },
                { name: 'Orange 40', value: '#4F2C21', variable: '--orange-40' },
                { name: 'Orange 30', value: '#3B2119', variable: '--orange-30' },
                { name: 'Orange 20', value: '#331D16', variable: '--orange-20' },
                { name: 'Orange 10', value: '#261611', variable: '--orange-10' }
            ]
        },
        {
            name: 'Purple',
            colors: [
                { name: 'Purple 160', value: '#FAF6FE', variable: '--purple-160' },
                { name: 'Purple 150', value: '#EDE8FD', variable: '--purple-150' },
                { name: 'Purple 140', value: '#E2DBFC', variable: '--purple-140' },
                { name: 'Purple 130', value: '#D6CDFB', variable: '--purple-130' },
                { name: 'Purple 120', value: '#C9BDFA', variable: '--purple-120' },
                { name: 'Purple 110', value: '#BBACF9', variable: '--purple-110' },
                { name: 'Purple 100', value: '#A894F6', variable: '--purple-100' },
                { name: 'Purple 90', value: '#967BEF', variable: '--purple-90' },
                { name: 'Purple 80', value: '#8060DB', variable: '--purple-80' },
                { name: 'Purple 70', value: '#6C4EBB', variable: '--purple-70' },
                { name: 'Purple 60', value: '#574092', variable: '--purple-60' },
                { name: 'Purple 50', value: '#4A387B', variable: '--purple-50' },
                { name: 'Purple 40', value: '#3A2D5F', variable: '--purple-40' },
                { name: 'Purple 30', value: '#2B2245', variable: '--purple-30' },
                { name: 'Purple 20', value: '#261E3C', variable: '--purple-20' },
                { name: 'Purple 10', value: '#1C172B', variable: '--purple-10' }
            ]
        },
        {
            name: 'Teal',
            colors: [
                { name: 'Teal 160', value: '#F5F9F8', variable: '--teal-160' },
                { name: 'Teal 150', value: '#E1EEEC', variable: '--teal-150' },
                { name: 'Teal 140', value: '#CDE4E0', variable: '--teal-140' },
                { name: 'Teal 130', value: '#B9D9D4', variable: '--teal-130' },
                { name: 'Teal 120', value: '#A2CDC7', variable: '--teal-120' },
                { name: 'Teal 110', value: '#8CC1BA', variable: '--teal-110' },
                { name: 'Teal 100', value: '#6AAEA6', variable: '--teal-100' },
                { name: 'Teal 90', value: '#4B9B93', variable: '--teal-90' },
                { name: 'Teal 80', value: '#31827B', variable: '--teal-80' },
                { name: 'Teal 70', value: '#2A6C67', variable: '--teal-70' },
                { name: 'Teal 60', value: '#285653', variable: '--teal-60' },
                { name: 'Teal 50', value: '#244A46', variable: '--teal-50' },
                { name: 'Teal 40', value: '#1E3A38', variable: '--teal-40' },
                { name: 'Teal 30', value: '#182B2A', variable: '--teal-30' },
                { name: 'Teal 20', value: '#152624', variable: '--teal-20' },
                { name: 'Teal 10', value: '#111C1B', variable: '--teal-10' }
            ]
        }
    ];

    return (
        <div className="component-showcase">
            <h1>Colors</h1>
            
            <div className="component-section">
                <h2>Editor Colors</h2>
                <p style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Colors automatically switch between light and dark theme variants based on current theme.
                </p>
                
                <div className="color-palette">
                    {editorColors.map((color, colorIndex) => (
                        <div key={colorIndex} className="color-item">
                            <div 
                                className="color-swatch" 
                                style={{ backgroundColor: `var(${color.variable})` }}
                            ></div>
                            <div className="color-details">
                                <div className="color-name">{color.name}</div>
                                <div className="color-variable">{color.variable}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="component-section">
                <h2>Color Scales</h2>
                
                <div className="color-scales">
                    {colorScales.map((scale, scaleIndex) => (
                        <div key={scaleIndex} className="color-scale">
                            <h3 className="color-scale-title">{scale.name}</h3>
                            <div className="color-palette">
                                {scale.colors.map((color, colorIndex) => (
                                    <div key={colorIndex} className="color-item">
                                        <div 
                                            className="color-swatch" 
                                            style={{ backgroundColor: color.value }}
                                        ></div>
                                        <div className="color-details">
                                            <div className="color-name">{color.name}</div>
                                            <div className="color-value">{color.value}</div>
                                            <div className="color-variable">{color.variable}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Colors;