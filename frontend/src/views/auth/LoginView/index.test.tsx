import Enzyme, { shallow, mount } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import LoginView from "./index"
import { Provider } from "react-redux"
import { store } from "../../../redux/store"
import faker from "faker"

Enzyme.configure({ adapter: new Adapter() })

describe("LoginView", () => {
    it("Renders LoginView without crashing", () => {
        shallow(
            <Provider store={store}>
                <LoginView />
            </Provider>
        )
    })

    it("Renders title, inputs, submit button without crash", () => {
        const wrapper = mount(
            <Provider store={store}>
                <LoginView />
            </Provider>
        )

        expect(wrapper.find(`h1`).first().text()).toBe("Sign in")

        expect(wrapper.find(`input[id="email"]`)).toHaveLength(1)
        expect(wrapper.find(`input[id="password"]`)).toHaveLength(1)

        expect(wrapper.find(`button`).first().text()).toBe("Sign In")
    })

    it("Check Login Event working with fake credentials", () => {
        const wrapper = mount(
            <Provider store={store}>
                <LoginView />
            </Provider>
        )

        const emailInput = wrapper.find(`input[id="email"]`)
        const passwordInput = wrapper.find(`input[id="password"]`)
        const submitButton = wrapper.find(`button`).first()

        emailInput.simulate("change", {
            target: { value: faker.internet.email() }
        })

        passwordInput.simulate("change", {
            target: { value: faker.internet.password() }
        })

        submitButton.simulate("click")

        expect(wrapper.find(`circle`)).toHaveLength(1)
    })
})
