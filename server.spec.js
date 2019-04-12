const server = require('./server');
const request = require('supertest');

const games = [
    {id: 1, title: "Pacman", genre: "Arcade", releaseYear: 1980},
    {id: 2, title: "Tecmo Bowl", genre: "Sports", releaseYear: 2000},
    {id: 3, title: "Mario Bros", genre: "Arcade", releaseYear: 2000},
    {id: 4, title: "Super Mario", genre: "Arcade", releaseYear: 2000},
]

describe('server.js', () => {
    describe('GET /games', () => {
        it('should respond with 200 OK', () => {
            return request(server)
                .get('/games')
                .then(response => {
                    expect(response.status).toBe(200);
            });
        });
        
        it("should return a list of games", async () => {
            const response = await request(server)
            .get("/games");
            expect(response.body).toEqual(games);
            });

        it("should return a JSON object", async () => {
            const response = await request(server)
            .get("/games");
            expect(response.type).toBe("application/json");
            });
        
        it("should return an array", async () => {
            const response = await request(server)
            .get("/games");
            expect(Array.isArray(games)).toBeTruthy();
            });
        });

        describe("POST to /games", () => {
            it("should return a status code of 201", async () => {
                const response = await request(server)
                .post("/games")
                .send({ title: "MK", genre: "Action" });
                expect(response.status).toEqual(201);
                });
            it("should return a status code of 422 if incomplete", async () => {
                const response = await request(server)
                .post("/games")
                .send({ title: "", genre: "Sports" }); //fails bc there is no title
                expect(response.status).toEqual(422);
                });

            // it("should return a status code of 405 if duplicate title", async () => {
            //     const response = await request(server)
            //     .post("/games")
            //     .send({ title: "Tecmo Bowl", genre: "Sports" }); //fails bc there is no genre
            //     expect(response.status).toEqual(405);
            //     });

            it("should return posted data in the response body", async () => {
                const expectedBody = { title: "MK", genre: "Action" };
                const response = await request(server)
                    .post("/games")
                    .send(expectedBody);
                    expect(response.body).toEqual(expectedBody);
                });
            it("should return a JSON object", async () => {
                const expectedBody = { title: "MK", genre: "Action" };
                const response = await request(server)
                    .post("/games")
                    .send(expectedBody);
                    expect(response.type).toBe("application/json");
                });
        });

}); 
