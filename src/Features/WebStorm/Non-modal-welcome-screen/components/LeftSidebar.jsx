import Stripe from '../../../../ui/components/stripe/Stripe';
import StripeContainer from '../../../../ui/components/stripe/StripeContainer';
import Icon from '../../../../ui/components/icon/Icon';
import { VcsIcon, MoreHorizontalIcon } from '../../../../icons';
import './LeftSidebar.css';

// Simple icon components
const FolderIcon = () => <Icon name="FolderLight" size={20} />;
const MoreIcon = () => <MoreHorizontalIcon style={{ width: '20px', height: '20px', color: 'currentColor' }} />;
const TerminalIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M6 8L9 10L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M11 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
const CommitIcon = () => <VcsIcon style={{ width: '20px', height: '20px', color: 'currentColor' }} />;

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

