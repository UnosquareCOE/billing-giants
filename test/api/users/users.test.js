const axios = require("../utils/axios");

describe("Users", () => {
    test("Unauthorized response when invalid login is attempted", async () => {
        const response = await axios.post("authentication", {
            email: "test@test.com",
            password: "124567!"
        });

        expect(response.status).toBe(401);
    })

    test("new user can successfully login", async () => {
        const userCreateResponse = await axios.post("users", {
            firstName: "Test",
            secondName: "Testy",
            email: "test@testy123.com",
            password: "testPassword123!"
          });
        
        expect(userCreateResponse.status).toBe(201);

        const authResponse = await axios.post("authentication", {
            email: "test@testy123.com",
            password: "testPassword123!"
        });

        expect(authResponse.status).toBe(200);

        const getUserResponse = await axios.get(`users/${userCreateResponse.data.id}`);
        expect(getUserResponse.status).toBe(200);
    })
})