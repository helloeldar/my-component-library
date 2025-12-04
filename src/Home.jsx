import { Link } from 'react-router-dom';
import './Home.css';
import { getSortedComponentsOnly, getSortedWidgets } from './componentsConfig';

function Home() {
    const categories = [
        {
            name: 'Styles',
            description: 'Design tokens and foundational styles',
            pages: [
                { name: 'Typography', key: 'typography', path: '/styles/typography', description: 'Text styles for UI and editor' },
                { name: 'Colors', key: 'colors', path: '/styles/colors', description: 'Color scales and palettes' }
            ]
        },
        {
            name: 'Components',
            description: 'Interactive UI components',
            pages: getSortedComponentsOnly().map(page => ({
                ...page,
                path: `/components/${page.key}`
            }))
        },
        {
            name: 'Widgets',
            description: 'Complex widgets and panels',
            pages: getSortedWidgets().map(page => ({
                ...page,
                path: `/widgets/${page.key}`
            }))
        },
        {
            name: 'Features',
            description: 'Complete feature implementations',
            pages: [
                { name: 'Non-modal Welcome Screen', key: 'nonmodalwelcomescreen', path: '/features/non-modal-welcome-screen', description: 'WebStorm non-modal welcome screen implementation' }
            ]
        }
    ];

    return (
        <div className="component-showcase">
            <h1>Component Library</h1>
            
            <div className="home-intro">
                <p>This library contains reusable UI components and design tokens for building consistent interfaces.</p>
            </div>

            <div className="home-categories">
                {categories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="home-category">
                        <div className="home-category-header">
                            <h2 className="home-category-title">{category.name}</h2>
                            <p className="home-category-description">{category.description}</p>
                        </div>
                        
                        <div className="home-pages">
                            {category.pages.map((page, pageIndex) => (
                                <Link
                                    key={pageIndex}
                                    to={page.path}
                                    className="home-page-card"
                                >
                                    <h3 className="home-page-title">{page.name}</h3>
                                    <p className="home-page-description">{page.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;