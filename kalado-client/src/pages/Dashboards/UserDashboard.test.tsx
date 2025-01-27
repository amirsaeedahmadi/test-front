import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDashboard from './UserDashboard';
import { useModalContext } from '../../contexts';
import { OptionsComponent } from '../../constants/options';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../components/organisms', () => ({
    SideBarMenu: jest.fn(() => <div data-testid="sidebar-menu" />),
    ProfileManagement: jest.fn(() => <div data-testid="profile-management" />),
    AdManagement: jest.fn(() => <div data-testid="ad-management" />),
    NavBar: jest.fn(() => <div data-testid="navbar" />),
}));

jest.mock('../../components/molecules', () => ({
    SideBar: jest.fn(({ children }) => <div data-testid="sidebar">{children}</div>),
}));

jest.mock('../../components/atoms', () => ({
    CustomButton: jest.fn(({ text, onClick }) => <button onClick={onClick}>{text}</button>),
}));

jest.mock('../../contexts');
jest.mock('../../constants/options');

describe('UserDashboard', () => {
    const mockHandleOpenReportSubmission = jest.fn();
    const mockUserDashboardMenu = [
        { title: 'dashboard.user.menu.one', icon: null },
        { title: 'dashboard.user.menu.two', icon: null },
    ];

    beforeEach(() => {
        (useModalContext as jest.Mock).mockReturnValue({
            handleOpenReportSubmission: mockHandleOpenReportSubmission,
        });
        (OptionsComponent as jest.Mock).mockReturnValue({
            user_dashboard_menu: mockUserDashboardMenu,
        });
    });

    it('renders the UserDashboard component', () => {
        render(<UserDashboard />);
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument();
        expect(screen.getByTestId('profile-management')).toBeInTheDocument();
    });

    it('renders the report submission button', () => {
        render(<UserDashboard />);
        const reportButton = screen.getByText('item_details.report_submission_btn');
        expect(reportButton).toBeInTheDocument();
    });

    it('calls handleOpenReportSubmission when report button is clicked', () => {
        render(<UserDashboard />);
        const reportButton = screen.getByText('item_details.report_submission_btn');
        fireEvent.click(reportButton);
        expect(mockHandleOpenReportSubmission).toHaveBeenCalled();
    });

    it('switches content when sidebar menu item is selected', () => {
        render(<UserDashboard />);
        const sidebarMenu = screen.getByTestId('sidebar-menu');

        // Simulate menu selection
        fireEvent.click(sidebarMenu);

        // Check if AdManagement is rendered
        expect(screen.getByTestId('ad-management')).toBeInTheDocument();
        expect(screen.queryByTestId('profile-management')).not.toBeInTheDocument();
    });
});
