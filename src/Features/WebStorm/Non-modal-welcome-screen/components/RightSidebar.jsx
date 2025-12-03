import Stripe from '../../../../ui/components/stripe/Stripe';
import StripeContainer from '../../../../ui/components/stripe/StripeContainer';
import './RightSidebar.css';

// Simple icon components
const AtIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M10 7V10L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M14 14L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.657 4.343L14.243 5.757M5.757 14.243L4.343 15.657M15.657 15.657L14.243 14.243M5.757 5.757L4.343 4.343" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const MoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
    </svg>
);

function RightSidebar() {
    return (
        <div className="right-sidebar" data-name="Stripes">
            <div className="right-sidebar-top" data-name="Top">
                <StripeContainer>
                    <Stripe icon={<AtIcon />} title="At" />
                    <Stripe icon={<SearchIcon />} title="Search" />
                    <Stripe icon={<SettingsIcon />} title="Settings" />
                    <Stripe icon={<MoreIcon />} title="Chat" />
                    <Stripe icon={<MoreIcon />} title="Database" />
                    <Stripe icon={<MoreIcon />} title="Maven" />
                    <Stripe icon={<MoreIcon />} title="Notifications" />
                </StripeContainer>
            </div>
        </div>
    );
}

export default RightSidebar;

