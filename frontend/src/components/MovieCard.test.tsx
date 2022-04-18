import Enzyme, { shallow, mount } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import MovieCard from "./MovieCard"
import faker from "faker"

Enzyme.configure({ adapter: new Adapter() })

describe("MovieCard", () => {
    const mockCallBackEdit = jest.fn()
    const mockCallBackDelete = jest.fn()
    const header = faker.internet.userName()
    const content = faker.internet.userName()
    const image = faker.internet.url()

    it("Renders MovieCard without crashing", () => {
        shallow(
            <MovieCard
                header={header}
                content={content}
                image={image}
                movieIndex={0}
                onEditMovie={mockCallBackEdit}
                onDeleteMovie={mockCallBackDelete}
            />
        )
    })

    it("Renders image, header, content and simulate click", () => {
        const wrapper = mount(
            <MovieCard
                header={header}
                content={content}
                image={image}
                movieIndex={0}
                onEditMovie={mockCallBackEdit}
                onDeleteMovie={mockCallBackDelete}
            />
        )

        expect(wrapper.find(`.MuiCardMedia-root`)).toHaveLength(1)
        expect(wrapper.find(`h2`).text()).toEqual(header)
        expect(wrapper.find(`p`).text()).toEqual(content)

        const editButton = wrapper.find(`button`).first()
        editButton.simulate("click")
        expect(mockCallBackEdit).toHaveBeenCalledTimes(1)

        const deleteButton = wrapper.find(`button`).at(1)
        deleteButton.simulate("click")
        expect(mockCallBackDelete).toHaveBeenCalledTimes(1)
    })
})
