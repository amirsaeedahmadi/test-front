import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemDetails from './ItemDetails';
import { getSingleProduct } from '../../api/services/ProductService';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('react-router-dom', () => ({
    useParams: () => ({ itemId: '1' }),
}));

jest.mock('../../api/services/ProductService');

jest.mock('../../components/organisms', () => ({
    ItemDetailsCard: jest.fn(({ item }) => <div data-testid="item-details-card">{item.title}</div>),
    ReportSubmissionForm: jest.fn(() => <div data-testid="report-submission-form" />),
}));

describe('ItemDetails', () => {
    const mockItem = {
        title: 'Test Item',
        imageUrl: 'test.jpg',
        price: 100,
        city: 'Test City',
        date: '2023-01-01',
        description: 'Test description',
        itemId: 1,
        seller_phone: '1234567890',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', () => {
        (getSingleProduct as jest.Mock).mockReturnValue(new Promise(() => { }));
        render(<ItemDetails />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders item details when data is fetched successfully', async () => {
        (getSingleProduct as jest.Mock).mockResolvedValue(mockItem);
        render(<ItemDetails />);

        await waitFor(() => {
            expect(screen.getByTestId('item-details-card')).toBeInTheDocument();
            expect(screen.getByTestId('report-submission-form')).toBeInTheDocument();
        });
    });

    it('renders error message when item is not found', async () => {
        (getSingleProduct as jest.Mock).mockRejectedValue(new Error('Not found'));
        render(<ItemDetails />);

        await waitFor(() => {
            expect(screen.getByText('error.item_details.not_found')).toBeInTheDocument();
        });
    });

    it('renders error message when itemId is not provided', async () => {
        jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({});
        render(<ItemDetails />);

        await waitFor(() => {
            expect(screen.getByText('error.item_details.not_found')).toBeInTheDocument();
        });
    });

    it('calls getSingleProduct with correct itemId', async () => {
        (getSingleProduct as jest.Mock).mockResolvedValue(mockItem);
        render(<ItemDetails />);

        await waitFor(() => {
            expect(getSingleProduct).toHaveBeenCalledWith(1);
        });
    });
});
