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
            <Popup.Cell type="line" icon="nodes/folder" selected>Open...</Popup.Cell>
            <Popup.Cell type="line" icon="vcs/changes">Clone Repository...</Popup.Cell>
            <Popup.Cell type="separator" text="Recent Projects" />
            <Popup.Cell type="multiline" icon={
                <ProjectIcon letters="CM" gradientFrom="#5fad65" gradientTo="#3d968b" />
            }>commons-math</Popup.Cell>
            <Popup.Cell type="multiline" icon={
                <ProjectIcon letters="K" gradientFrom="#3b92b8" gradientTo="#6183ec" />
            }>kotlin</Popup.Cell>
            <Popup.Cell type="multiline" icon={
                <ProjectIcon letters="IJ" gradientFrom="#874ece" gradientTo="#963dcc" />
            }>IntelliJ IDEA</Popup.Cell>
            <Popup.Cell type="multiline" icon={
                <ProjectIcon letters="WS" gradientFrom="#b08b14" gradientTo="#bb7f19" />
            }>WebStorm</Popup.Cell>
        </Popup>
    );
}

export default PopupProjects;
