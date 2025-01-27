import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashboard from './AdminDashboard';
import { OptionsComponent } from '../../constants/options';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../components/organisms', () => ({
    SideBarMenu: jest.fn(({ onSelectCategory }) => (
        <div data-testid="sidebar-menu">
            <button onClick={() => onSelectCategory('dashboard.admin.menu.one')}>Menu 1</button>
            <button onClick={() => onSelectCategory('dashboard.admin.menu.two')}>Menu 2</button>
            <button onClick={() => onSelectCategory('dashboard.admin.menu.three')}>Menu 3</button>
        </div>
    )),
    ProfileManagement: jest.fn(() => <div data-testid="profile-management" />),
    UserManagement: jest.fn(() => <div data-testid="user-management" />),
    ReportHistory: jest.fn(() => <div data-testid="report-history" />),
    NavBar: jest.fn(() => <div data-testid="navbar" />),
}));

jest.mock('../../components/molecules', () => ({
    SideBar: jest.fn(({ children }) => <div data-testid="sidebar">{children}</div>),
}));

jest.mock('../../constants/options');

describe('AdminDashboard', () => {
    const mockAdminDashboardMenu = [
        { title: 'dashboard.admin.menu.one', icon: null },
        { title: 'dashboard.admin.menu.two', icon: null },
        { title: 'dashboard.admin.menu.three', icon: null },
    ];

    beforeEach(() => {
        (OptionsComponent as jest.Mock).mockReturnValue({
            admin_dashboard_menu: mockAdminDashboardMenu,
        });
    });

    it('renders the AdminDashboard component', () => {
        render(<AdminDashboard />);
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument();
        expect(screen.getByTestId('profile-management')).toBeInTheDocument();
    });

    it('switches to UserManagement when second menu item is selected', () => {
        render(<AdminDashboard />);
        fireEvent.click(screen.getByText('Menu 2'));
        expect(screen.getByTestId('user-management')).toBeInTheDocument();
        expect(screen.queryByTestId('profile-management')).not.toBeInTheDocument();
    });

    it('switches to ReportHistory when third menu item is selected', () => {
        render(<AdminDashboard />);
        fireEvent.click(screen.getByText('Menu 3'));
        expect(screen.getByTestId('report-history')).toBeInTheDocument();
        expect(screen.queryByTestId('profile-management')).not.toBeInTheDocument();
        expect(screen.queryByTestId('user-management')).not.toBeInTheDocument();
    });

    it('switches back to ProfileManagement when first menu item is selected', () => {
        render(<AdminDashboard />);
        fireEvent.click(screen.getByText('Menu 2'));
        fireEvent.click(screen.getByText('Menu 1'));
        expect(screen.getByTestId('profile-management')).toBeInTheDocument();
        expect(screen.queryByTestId('user-management')).not.toBeInTheDocument();
    });
});
