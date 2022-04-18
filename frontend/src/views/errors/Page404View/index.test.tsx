import { cleanup } from "@testing-library/react"
import Page404View from "./index"
import Enzyme, { shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup)

describe("Page404View", () => {
    it("Renders Page404View without crashing", () => {
        shallow(<Page404View />)
    })
})
