import Enzyme, { shallow, mount } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import RegisterView from "./index"
import { Provider } from "react-redux"
import { store } from "../../../redux/store"
import faker from "faker"

Enzyme.configure({ adapter: new Adapter() })

describe("RegisterView", () => {
    it("Renders RegisterView without crashing", () => {
        shallow(
            <Provider store={store}>
                <RegisterView />
            </Provider>
        )
    })

    it("Renders title, inputs, submit button without crash", () => {
        const wrapper = mount(
            <Provider store={store}>
                <RegisterView />
            </Provider>
        )

        expect(wrapper.find(`h1`).first().text()).toBe("Sign up")

        expect(wrapper.find(`input[id="email"]`)).toHaveLength(1)
        expect(wrapper.find(`input[id="password"]`)).toHaveLength(1)
        expect(wrapper.find(`input[id="firstName"]`)).toHaveLength(1)
        expect(wrapper.find(`input[id="lastName"]`)).toHaveLength(1)

        expect(wrapper.find(`button`).first().text()).toBe("Sign Up")
    })

    it("Check Login Event working with fake credentials", () => {
        const wrapper = mount(
            <Provider store={store}>
                <RegisterView />
            </Provider>
        )

        const emailInput = wrapper.find(`input[id="email"]`)
        const passwordInput = wrapper.find(`input[id="password"]`)
        const firstnameInput = wrapper.find(`input[id="firstName"]`)
        const lastnameInput = wrapper.find(`input[id="lastName"]`)
        const submitButton = wrapper.find(`button`).first()

        emailInput.simulate("change", {
            target: { value: faker.internet.email() }
        })

        passwordInput.simulate("change", {
            target: { value: faker.internet.password() }
        })

        firstnameInput.simulate("change", {
            target: { value: faker.name.firstName() }
        })

        lastnameInput.simulate("change", {
            target: { value: faker.name.lastName() }
        })

        submitButton.simulate("click")

        expect(wrapper.find(`circle`)).toHaveLength(1)
    })
})
