import Stripe from '../../../../ui/components/stripe/Stripe';
import StripeContainer from '../../../../ui/components/stripe/StripeContainer';
import Icon from '../../../../ui/components/icon/Icon';
import './LeftSidebar.css';

// Simple icon components
const FolderIcon = () => <Icon name="FolderLight" size={20} />;
const MoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
    </svg>
);
const TerminalIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M6 8L9 10L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M11 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const CommitIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M10 3V7M10 13V17M3 10H7M13 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

function LeftSidebar() {
    return (
        <div className="left-sidebar" data-name="Stripes">
            <div className="left-sidebar-top" data-name="Top">
                <StripeContainer>
                    <Stripe icon={<FolderIcon />} state="selected" title="Project" />
                    <Stripe icon={<CommitIcon />} title="Commit" />
                    <Stripe icon={<CommitIcon />} title="Commit and Push" />
                    <StripeContainer.Separator />
                    <Stripe icon={<MoreIcon />} title="More tool windows" />
                </StripeContainer>
            </div>
            <div className="left-sidebar-bottom" data-name="Bottom">
                <StripeContainer>
                    <Stripe icon={<TerminalIcon />} title="Terminal" />
                    <Stripe icon={<MoreIcon />} title="More" />
                    <Stripe icon={<MoreIcon />} title="More" />
                    <Stripe icon={<MoreIcon />} title="More" />
                </StripeContainer>
            </div>
        </div>
    );
}

export default LeftSidebar;

