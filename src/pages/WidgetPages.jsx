import { useParams } from 'react-router-dom';
import ProjectSelector from '../ui/components/projectselector/ProjectSelector';

function WidgetPages() {
    const { widgetKey } = useParams();

    const projectSelectorExamples = () => {
        const projects = [
            { 
                name: 'my-component-library', 
                displayName: 'my-component-library',
                icon: 'MC', 
                color: 'cobalt',
                path: '~/Desktop/my-component-library' 
            },
            { 
                name: 'intellij-platform-ui', 
                displayName: 'intellij-platform-ui',
                icon: 'IP', 
                color: 'amber',
                path: '~/Projects/intellij-platform-ui' 
            },
            { 
                name: 'jetbrains-webstorm', 
                displayName: 'jetbrains-webstorm',
                icon: 'JW', 
                color: 'ocean',
                path: '~/Development/jetbrains-webstorm' 
            },
            { 
                name: 'kotlin-multiplatform-mobile', 
                displayName: 'kotlin-multiplatform-mobile',
                icon: 'KM', 
                color: 'violet',
                path: '~/Code/kotlin-multiplatform-mobile' 
            },
            { 
                name: 'spring-boot-samples', 
                displayName: 'spring-boot-samples',
                icon: 'SB', 
                color: 'grass',
                path: '~/Workspace/spring-boot-samples' 
            },
            { 
                name: 'react-native-app', 
                displayName: 'react-native-app',
                icon: 'RN', 
                color: 'plum',
                path: '~/Mobile/react-native-app' 
            }
        ];

        return (
            <div className="component-showcase">
                <h1>Project Selector</h1>

                <div className="component-section">
                    <h2>Basic Project Selector</h2>
                    <div className="component-examples">
                        <ProjectSelector 
                            projectName="my-component-library"
                            projectIcon="MC"
                            projectColor="cobalt"
                            projects={projects}
                            onProjectSelect={(project) => console.log('Selected project:', project)}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Different Project Names</h2>
                    <div className="component-examples">
                        <ProjectSelector 
                            projectName="intellij-platform-ui"
                            projectIcon="IP"
                            projectColor="amber"
                            projects={projects}
                        />
                        <ProjectSelector 
                            projectName="kotlin-multiplatform-mobile"
                            projectIcon="KM"
                            projectColor="violet"
                            projects={projects}
                        />
                        <ProjectSelector 
                            projectName="spring-boot-samples"
                            projectIcon="SB"
                            projectColor="grass"
                            projects={projects}
                        />
                    </div>
                </div>

                <div className="component-section">
                    <h2>Interactive States</h2>
                    <div className="component-examples">
                        <ProjectSelector 
                            projectName="react-native-app"
                            projectIcon="RN"
                            projectColor="plum"
                            projects={projects}
                        />
                        <ProjectSelector 
                            projectName="jetbrains-webstorm"
                            projectIcon="JW"
                            projectColor="ocean"
                            state="hovered"
                            projects={projects}
                        />
                    </div>
                </div>
            </div>
        );
    };

    switch (widgetKey) {
        case 'projectselector':
            return projectSelectorExamples();
        default:
            return <div className="component-showcase"><h1>Widget not found</h1></div>;
    }
}

export default WidgetPages;

