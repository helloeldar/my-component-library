import { Link } from 'react-router-dom';
import './Home.css';
import { getHomeSections } from './componentsConfig';

function CardContent({ page }) {
    return (
        <>
            <div className="home-card-preview">
                {page.preview ? (
                    <img src={page.preview} alt={page.name} />
                ) : (
                    <div className="home-card-preview-placeholder" />
                )}
            </div>
            <div className="home-card-body">
                <div className="home-card-header">
                    <h3 className="home-page-title">{page.name}</h3>
                    {page.status === 'obsolete' && (
                        <span className="home-card-badge home-card-badge--obsolete">Obsolete</span>
                    )}
                </div>
                <p className="home-page-description">{page.description}</p>
                {page.status === 'coming-soon' && (
                    <span className="home-card-badge home-card-badge--coming-soon">Will be available soon</span>
                )}
            </div>
        </>
    );
}

function Home() {
    const sections = getHomeSections();

    return (
        <div className="component-showcase">
            <h1>Component Library</h1>

            <div className="home-intro">
                <p>This library contains reusable UI components and design tokens for building consistent interfaces.</p>
            </div>

            <div className="home-categories">
                {sections.map((section) => (
                    <div key={section.key} className="home-category">
                        <div className="home-category-header">
                            <h2 className="home-category-title">{section.name}</h2>
                            <p className="home-category-description">{section.description}</p>
                        </div>

                        <div className="home-pages">
                            {section.pages.map((page) => {
                                if (page.status === 'coming-soon') {
                                    return (
                                        <div
                                            key={page.key}
                                            className="home-page-card home-page-card--coming-soon"
                                        >
                                            <CardContent page={page} />
                                        </div>
                                    );
                                }

                                const cardClass = page.status === 'obsolete'
                                    ? 'home-page-card home-page-card--obsolete'
                                    : 'home-page-card';

                                return (
                                    <Link
                                        key={page.key}
                                        to={`/${page.key}`}
                                        className={cardClass}
                                    >
                                        <CardContent page={page} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
