const express = require("express");
const request = require("supertest");
const bookRoute = require("../routes/books.route.js");


const app = express();

app.use(express.json());
app.use("/api/v1", bookRoute);


describe("Integration tests for books API", () => {
    it("Should GET /api/books - success - get all books", async() => {
        const {body, statusCode} = await request(app).get("/api/v1/books");

        expect(body).toEqual(
            expect.objectContaining({
                status: expect.any(String),
                message: expect.any(String),
                data: expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        author: expect.any(String),
                        id: expect.any(Number)
                    })
                ])
            })
        )

        expect(statusCode).toBe(200);
    });

    it("POST /api/v1/book - failure - on invalid post body", async() => {
        const {body, statusCode} = await request(app).post("/api/v1/book").send({
            name: "",
            author: "Chinua Achebe"
        });

        expect(body).toEqual({
            error: [
                {
                    location: "body",
                    value: "",
                    msg: "Book name is required",
                    path: "name",
                    type: "field"
                }
            ]
        })

        expect(statusCode).toBe(400);
    })

    it("POST /api/v1/book - success/failure - on valid post body", async() => {
        const {statusCode, body} = await request(app).post("/api/v1/book").send({
            name: "The rise of a pauper",
            author: "Temitayo Sosanya"
        });

        if (statusCode == 500) {
            expect(statusCode).toBe(500);
            expect(body).toEqual(
                expect.objectContaining({
                    message: expect.any(String),
                    status: expect.any(String),
                    error: expect.any(String)
                })
                )
        }
        else {
            expect(statusCode).toBe(200);
            expect(body).toEqual(
                expect.objectContaining({
                    message: expect.any(String),
                    status: expect.any(String),
                    data: expect.arrayContaining([
                        expect.objectContaining({
                            name: expect.any(String),
                            author: expect.any(String),
                            id: expect.any(Number)
                        })
                    ])
                })
            )
        }
    })

    it("Should PUT /api/v1/:bookId - failure - when bookId is not found", async() => {
        const {statusCode, body} = await request(app).put("/api/v1/50").send({
            name: "New Temitayo Sosanya"
        });

        expect(statusCode).toBe(404);
        expect(body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
                status: expect.any(String)
            })
        )
    });

    it("Should PUT /api/v1/:bookId - success - when book is updated", async() => {
        const {statusCode, body} = await request(app).put("/api/v1/1").send({
            name: "New Temitayo Sosanya",
            author: "New Temiteyoooo"
        });

        expect(statusCode).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
                status: expect.any(String),
                newBooks: expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        author: expect.any(String),
                        id: expect.any(Number)
                    })
                ])
            })
        )
    })

    it("Should DELETE /api/v1/:bookId - failure - book not found", async() => {
        const {body, statusCode} = await request(app).delete("/api/v1/70");
        expect(statusCode).toBe(404);
    })

    it("Should DELETE /api/v1/:bookId - success - book successfully deleted", async() => {
        const {statusCode, body} = await request(app).delete("/api/v1/2");
        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                status: expect.any(String),
                message: expect.any(String)
        }))
    })
})