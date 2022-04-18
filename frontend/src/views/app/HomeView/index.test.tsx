import Enzyme, { shallow, mount } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import HomeView from "./index"
import { Provider } from "react-redux"
import { store } from "../../../redux/store"

Enzyme.configure({ adapter: new Adapter() })

describe("HomeView", () => {
    it("Renders HomeView without crashing", () => {
        shallow(
            <Provider store={store}>
                <HomeView />
            </Provider>
        )
    })

    it("Infinite scroll should display loading", () => {
        const wrapper = mount(
            <Provider store={store}>
                <HomeView />
            </Provider>
        )

        const infiniteWrapper = wrapper.find(`.infinite-scroll-component`)

        expect(infiniteWrapper.contains(<h4>Loading...</h4>)).toBe(true)
    })

    it("When click add new button, it should display NewMovie Dialog", () => {
        const wrapper = mount(
            <Provider store={store}>
                <HomeView />
            </Provider>
        )

        const addButton = wrapper.find(`button`).first()
        addButton.simulate("click")

        expect(wrapper.find(`.MuiDialogTitle-root`)).toHaveLength(1)
    })
})
