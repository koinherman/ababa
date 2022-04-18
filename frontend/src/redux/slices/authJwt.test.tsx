import faker from "faker"
import { register, login } from "./authJwt"
import { store } from "../../redux/store"

describe("authJWT Slice Test", () => {
    const profile = {
        email: faker.internet.email(),
        password: faker.internet.password(15, false, /^[A-Za-z]*$/, "164"),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
    }

    it("Register should return error with empty email", async () => {
        try {
            await store.dispatch(
                register({
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    email: "",
                    password: profile.password
                })
            )
        } catch (err) {
            expect((err as Error).message).toBeDefined()
        }
    })

    it("Register should return error with email in not email type", async () => {
        try {
            await store.dispatch(
                register({
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    email: "abc@abc.com",
                    password: profile.password
                })
            )
        } catch (err) {
            expect((err as Error).message).toBeDefined()
        }
    })

    it("Register should return error with invalid password", async () => {
        try {
            await store.dispatch(
                register({
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    email: profile.email,
                    password: faker.internet.password(15, false, /^[A-Z]*$/)
                })
            )
        } catch (err) {
            expect((err as Error).message).toBeDefined()
        }
    })
    
    it("Login should return error with email in not email type", async () => {
        try {
            await store.dispatch(
                login({
                    email: profile.email,
                    password: faker.internet.password(15, false, /^[A-Za-z]*$/, "164")
                })
            )
        } catch (err) {
            expect((err as Error).message).toBeDefined()
        }
    })
})
