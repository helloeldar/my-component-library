import './Popup.css';
import PopupCell from './PopupCell';
import PopupTreeSection from './PopupTreeSection';

function Popup(props) {
    let classes = ['popup'];

    if (props.visible) {
        classes.push('popup-visible');
    }

    if (props.className) {
        classes.push(props.className);
    }

    return (
        <div className={classes.join(' ')} style={props.style}>
            <div className="popup-content">
                {props.header && (
                    <PopupCell type="header">{props.header}</PopupCell>
                )}
                
                <div className="popup-options">
                    {props.children}
                </div>
                
                {props.footer && (
                    <PopupCell type="footer">{props.footer}</PopupCell>
                )}
            </div>
        </div>
    );
}

Popup.Cell = PopupCell;
Popup.TreeSection = PopupTreeSection;

export default Popup;
