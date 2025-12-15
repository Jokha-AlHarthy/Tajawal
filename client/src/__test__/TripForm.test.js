import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import TripForm from "../components/TripForm";

// mock redux store
const mockStore = configureStore([]);

const store = mockStore({
    users: {
        user: { _id: "123", email: "test@test.com" } 
    },
    trips: {},
    notifications: {}
});

const renderTripForm = () =>
    render(
        <Provider store={store}>
            <Router>
                <TripForm />
            </Router>
        </Provider>
    );

describe("TripForm Component Tests", () => {

    //Test-1 : To make sure the component of the TripForm loaded correclty or not
    test("renders main trip form fields", () => {
        renderTripForm();
        expect(screen.getByText(/plan your trip/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/e.g., muscat, oman/i)).toBeInTheDocument();
        expect(screen.getByText(/generate itinerary/i)).toBeInTheDocument();
        expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    });

    //Test 2: To see wherether the user input and typing test is working prefeclty or not
    test("allows user to enter destination and dates", () => {
        renderTripForm();

        const destinationInput = screen.getByPlaceholderText(/e.g., muscat, oman/i);
        fireEvent.change(destinationInput, { target: { value: "Muscat" } });
        expect(destinationInput.value).toBe("Muscat");
        const dateInputs = screen.getAllByDisplayValue("");
        fireEvent.change(dateInputs[0], { target: { value: "2025-01-10" } });
        fireEvent.change(dateInputs[1], { target: { value: "2025-01-15" } });
        expect(dateInputs[0].value).toBe("2025-01-10");
        expect(dateInputs[1].value).toBe("2025-01-15");
    });

    //Test 3: To check if the checkbox / interests selection is working or not
    test("allows selecting interests", () => {
        renderTripForm();

        const beachCheckbox = screen.getByLabelText(/beach/i);
        const foodCheckbox = screen.getByLabelText(/food/i);
        fireEvent.click(beachCheckbox);
        fireEvent.click(foodCheckbox);
        expect(beachCheckbox).toBeChecked();
        expect(foodCheckbox).toBeChecked();
    });

    //Test 4: the test the button of the travelers count logic
    test("increments and decrements travelers count", () => {
        renderTripForm();
        expect(screen.getByText("3")).toBeInTheDocument();
        const buttons = screen.getAllByRole("button");
        const minusButton = buttons[buttons.length - 4];
        const plusButton = buttons[buttons.length - 3];
        fireEvent.click(plusButton);
        expect(screen.getByText("4")).toBeInTheDocument();
        fireEvent.click(minusButton);
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    //Test-5: testing the snapshot
    test('matches the UI snapshot', () => {
        const { container } = render(
            <Provider store={store}>
                <Router>
                    <TripForm/>
                </Router>
            </Provider>
        );

        screen.debug();
        expect(container).toMatchSnapshot();
    });

});
