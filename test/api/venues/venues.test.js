const axios = require("../utils/axios");

describe("Venues", () => {
    test("Unauthorized when not logged in", async () => {
        const response = await axios.get("venues");
        expect(response.status).toBe(401);
    })
})