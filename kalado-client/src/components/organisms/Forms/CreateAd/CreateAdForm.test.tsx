// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import CreateAdForm from './CreateAdForm';
// import { createProductWithImages } from '../../../api/services/ProductService';
// import { toast } from 'react-toastify';

// // Mocking the createAd service
// jest.mock('../../../services/ProductService', () => ({
//     createAd: jest.fn(),
// }));

// // Mocking toast
// jest.mock('react-toastify', () => ({
//     toast: jest.fn(),
// }));

// describe('CreateAdForm', () => {
//     const mockOnClose = jest.fn();

//     afterEach(() => {
//         jest.clearAllMocks(); // Clear mock calls after each test
//     });

//     test('renders correctly', () => {
//         const { getByPlaceholderText, getByText } = render(
//             <CreateAdForm onClose={mockOnClose} />
//         );

//         expect(getByPlaceholderText(/create_ad.input.title/i)).toBeInTheDocument();
//         expect(getByPlaceholderText(/create_ad.input.category/i)).toBeInTheDocument();
//         expect(getByText(/create_ad.create_ad_btn/i)).toBeInTheDocument();
//     });

//     test('handles input changes correctly', () => {
//         const { getByPlaceholderText } = render(
//             <CreateAdForm onClose={mockOnClose} />
//         );

//         // Title input
//         fireEvent.change(getByPlaceholderText(/create_ad.input.title/i), { target: { value: 'Test Ad' } });
//         expect(getByPlaceholderText(/create_ad.input.title/i)).toHaveValue('Test Ad');

//         // Price input (assuming PriceInput is a controlled component)
//         fireEvent.change(getByPlaceholderText(/create_ad.input.price/i), { target: { value: '100' } });
//         expect(getByPlaceholderText(/create_ad.input.price/i)).toHaveValue(100);

//         // Description input
//         fireEvent.change(getByPlaceholderText(/create_ad.input.description/i), { target: { value: 'This is a test description.' } });
//         expect(getByPlaceholderText(/create_ad.input.description/i)).toHaveValue('This is a test description.');
//     });

//     test('handles category selection', () => {
//         const { getByText } = render(
//             <CreateAdForm onClose={mockOnClose} />
//         );

//         // Select a category (assuming Dropdown renders options correctly)
//         fireEvent.mouseDown(getByText(/create_ad.input.category/i)); // Open dropdown
//         fireEvent.click(getByText(/Real estate/i)); // Select category

//         expect(getByText(/Real estate/i)).toBeInTheDocument(); // Check if selected option is present
//     });

//     test('handles image uploads', () => {
//         const { getByText } = render(
//             <CreateAdForm onClose={mockOnClose} />
//         );

//         // Simulate image upload (assuming ImageUploadBox handles this correctly)
//         fireEvent.click(getByText(/create_ad.choose_image/i)); // Trigger image upload dialog (you may need to adjust this based on your implementation)

//         // You would typically mock the file upload process here
//     });

//     test('handles successful ad creation', async () => {
//         (createAd as jest.Mock).mockResolvedValueOnce({
//             isSuccess: true,
//         });

//         const { getByPlaceholderText, getByText } = render(
//             <CreateAdForm onClose={mockOnClose} />
//         );

//         // Fill in form fields
//         fireEvent.change(getByPlaceholderText(/create_ad.input.title/i), { target: { value: 'Test Ad' } });
//         fireEvent.change(getByPlaceholderText(/create_ad.input.price/i), { target: { value: '100' } });

//         fireEvent.mouseDown(getByText(/create_ad.input.category/i)); // Open dropdown
//         fireEvent.click(getByText(/Real estate/i)); // Select category

//         fireEvent.change(getByPlaceholderText(/create_ad.input.description/i), { target: { value: 'This is a test description.' } });

//         // Submit the form
//         fireEvent.click(getByText(/create_ad.create_ad_btn/i));

//         await waitFor(() => {
//             expect(mockOnClose).toHaveBeenCalledTimes(1);
//             expect(toast).toHaveBeenCalledWith(expect.stringContaining("success.create_ad"));
//         });
//     });

//     test('handles failed ad creation', async () => {
//         (createAd as jest.Mock).mockResolvedValueOnce({
//             isSuccess: false,
//             message: 'Failed to create ad',
//         });

//         const { getByPlaceholderText, getByText } = render(
//             <CreateAdForm onClose={mockOnClose} />
//         );

//         // Fill in form fields
//         fireEvent.change(getByPlaceholderText(/create_ad.input.title/i), { target: { value: 'Test Ad' } });
//         fireEvent.change(getByPlaceholderText(/create_ad.input.price/i), { target: { value: '100' } });

//         fireEvent.mouseDown(getByText(/create_ad.input.category/i)); // Open dropdown
//         fireEvent.click(getByText(/Real estate/i)); // Select category

//         fireEvent.change(getByPlaceholderText(/create_ad.input.description/i), { target: { value: 'This is a test description.' } });

//         // Submit the form
//         fireEvent.click(getByText(/create_ad.create_ad_btn/i));

//         await waitFor(() => {
//             expect(getByText('Failed to create ad')).toBeInTheDocument();
//             expect(mockOnClose).not.toHaveBeenCalled();
//             expect(toast).not.toHaveBeenCalled();
//         });
//     });
// });
