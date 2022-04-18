import { cleanup } from "@testing-library/react"
import App from "./App"
import Enzyme, { shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup)

describe("App", () => {
    it("Renders App without crashing", () => {
        shallow(<App />)
    })
})
