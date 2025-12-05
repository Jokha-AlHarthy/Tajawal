import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../components/Login';

//creating fake store to test the login page
const mockStore = configureStore([]);
const store = mockStore({
    users: {
        user: null,
        isSuccess: false,
        isError: false
    }
});

describe('Login Component Tests', () => {

    //Test-1 : checking the email and password fields are exist or not
    test('renders email and password fields', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('type', 'email');

        const passwordInput = screen.getByPlaceholderText(/enter your password/i);
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    //Test-2: is the typing works when the user type in the fields?
    test('allows typing in email and password fields', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const passwordInput = screen.getByPlaceholderText(/enter your password/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });


    //Test-3: testing the regular expression for the email
    test('validates email format using regex', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        const emailInput = screen.getByPlaceholderText(/enter your email/i);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        fireEvent.change(emailInput, { target: { value: 'valid.email@example.com' } });
        expect(emailRegex.test(emailInput.value)).toBe(true);

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        expect(emailRegex.test(emailInput.value)).toBe(false);
    });


    //Test-4: testing the regular expression for the password
    test('validates password format using regex', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        const passwordInput = screen.getByPlaceholderText(/enter your password/i);

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        fireEvent.change(passwordInput, { target: { value: 'Passw0rd' } });
        expect(passwordRegex.test(passwordInput.value)).toBe(true);

        fireEvent.change(passwordInput, { target: { value: 'short' } });
        expect(passwordRegex.test(passwordInput.value)).toBe(false);
    });


    //Test-5: testing the snapshot
    test('matches the UI snapshot', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        screen.debug(); // optional for logging

        expect(container).toMatchSnapshot();
    });

});
