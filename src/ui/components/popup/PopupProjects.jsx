import Popup from './Popup';
import './PopupProjects.css';

function ProjectIcon({ letters, gradientFrom, gradientTo }) {
    return (
        <div className="popup-project-icon" style={{
            background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
        }}>
            <span>{letters}</span>
        </div>
    );
}

function PopupProjects(props) {
    return (
        <Popup visible={true} style={{ position: 'static', width: '253px', ...props.style }} className={props.className}>
            <Popup.Cell type="line" icon="general/add">New Project...</Popup.Cell>
            <Popup.Cell type="line" icon="nodes/folder">Open...</Popup.Cell>
            <Popup.Cell type="line" icon="vcs/vcs">Clone Repository...</Popup.Cell>
            <Popup.Cell type="separator" text="Recent Projects" />
            <Popup.Cell type="multiline" icon={
                <ProjectIcon letters="CM" gradientFrom="#5fad65" gradientTo="#3d968b" />
            } hint="~/ideaProject/commons-math">commons-math</Popup.Cell>
            <Popup.Cell type="multiline" icon={
                <ProjectIcon letters="K" gradientFrom="#3b92b8" gradientTo="#6183ec" />
            } hint="~/ideaProject/kotlin">kotlin</Popup.Cell>
            <Popup.Cell type="multiline" icon={
                <ProjectIcon letters="IJ" gradientFrom="#874ece" gradientTo="#963dcc" />
            } hint="~/ideaProject/intellij-idea">IntelliJ IDEA</Popup.Cell>
            <Popup.Cell type="multiline" icon={
                <ProjectIcon letters="WS" gradientFrom="#b08b14" gradientTo="#bb7f19" />
            } hint="~/ideaProject/webstorm">WebStorm</Popup.Cell>
        </Popup>
    );
}

export default PopupProjects;
