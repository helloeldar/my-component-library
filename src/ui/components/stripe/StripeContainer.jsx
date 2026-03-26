import './StripeContainer.css';

function StripeContainer({ 
    children, 
    className = '',
    ...props 
}) {
    return (
        <div 
            className={`stripe-container ${className}`}
            {...props}
        >
            {/* SVG filter used by monochrome stripe icons: floods with currentColor
                then clips to the icon's own alpha — makes any custom icon match
                the --stripe-icon-color token automatically, in every state.
                Must NOT use display:none — that prevents defs from being accessible.
                position:absolute + width/height:0 hides it without removing it from the render tree. */}
            <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                <defs>
                    <filter id="int-ui-stripe-monochrome" colorInterpolationFilters="sRGB">
                        <feFlood floodColor="currentColor" result="color" />
                        <feComposite in="color" in2="SourceGraphic" operator="in" />
                    </filter>
                </defs>
            </svg>
            <div className="stripe-container-content">
                {children}
            </div>
        </div>
    );
}

function StripeSeparator() {
    return (
        <div className="stripe-separator">
            <div className="stripe-separator-line"></div>
        </div>
    );
}

StripeContainer.Separator = StripeSeparator;

export default StripeContainer;