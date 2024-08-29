const { sum, deleteUserById, findUserById } = require("../utils/helper");

sum


describe("Number operations", ()=> {
    it("should return 4", ()=>{
        let a = 1;
        let b = 3;
        expect(a+b).toBe(4)
    })
    
    it("Should not return 15", ()=>{
        let a = 12;
        let b = 3;
        expect(a+b).not.toBe(17)
    })
})

describe("Testing some more matcher method", () =>{
    it("Should test tha a variable is undefined", ()=> {
        let number = undefined;


        expect(number).not.toBeDefined();
        expect(number).toBeUndefined();
        expect(number).toBeFalsy();
        expect(number).not.toBeTruthy();
        expect(number).not.toBeNull();
    })

    it("Should expect zero", ()=> {
        let number = 0;


        expect(number).toBeDefined();
        expect(number).not.toBeUndefined();
        expect(number).toBeFalsy();
        expect(number).not.toBeTruthy();
        expect(number).not.toBeNull();
        expect(number).toBe(0);
    })

    it("Test Number Comparison", ()=> {
        let a = 5;
        let b = 7;

        expect(a+b).toBeGreaterThan(10)
        expect(a+b).toBeGreaterThanOrEqual(10)
        expect(a+b).toBeLessThan(50);
        expect(a+b).not.toBeGreaterThan(50);
    })

    it("Test that there should be no i in team", () => {
        let string = "teami";

        expect(string).toMatch(/I/i);

    })

    it("Test that there is a stop in Christopher", () => {
        let string = "Christopher";

        expect(string).toMatch(/stop/i);

    })

    it("Check for product availability", ()=> {
        const shoppingList = ["iPhone", "car", "laptop", "groceries"];

        expect(shoppingList).toContain("laptop");
    })
})

//Testing primitive and reference type equality

describe("Testing reference equality", ()=> {
    const user = {
            name: "Temitayo",
            size: 43
    }
    user['age'] = 45;
    
    it("Should return a user object with age equal 45", () => {
        expect(user).toEqual({
            name: "Temitayo",
            age: 45,
            size: 43
        })
    })

    it("Should return an object with name and age key", ()=> {
        expect(user).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                age: expect.any(Number),
                size: expect.any(Number)
            })
        )
    })

    //Testing array equality
    it("Should test array equality", ()=> {
        const user = [
            "Temitayo",
            "Nurudeen",
            "Sosanya"
        ]

        user.push("Random");

        expect(user).toEqual([
            "Temitayo",
            "Nurudeen",
            "Sosanya",
            "Random"
        ])
        expect(user).toEqual(expect.arrayContaining(["Random"]));

        const usersObject = [
            {
                name: "Temitayo",
                age: 20
            },
            {
                name: "Segun",
                age: 25
            },
            {
                name: "Adeola",
                //age: 30,
                year: 43,
            }
        ]

        expect(usersObject).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: expect.any(String),
                age: expect.any(Number)
            })
        ]))
    })
})


describe("Testing imported functions", () => {
    let users;
    beforeEach(() =>{
        console.log(`Running before each test in testing imported functions`);
        users = [
            {
                name: "Temitayo",
                age: 20,
                id: 1
            },
            {
                name: "Segun",
                age: 25,
                id: 2
            },
            {
                name: "Adeola",
                //age: 30,
                year: 43,
                id: 3
            }
        ]
    })
    it("Should sum up 2 numbers", () => {
        expect(sum(5,6)).toBe(11)
    })

    it("Should let deleteUserById function delete user with specified Id", () => {

        expect(deleteUserById(users, 3)).toEqual([
            {
                name: "Temitayo",
                age: 20,
                id: 1
            },
            {
                name: "Segun",
                age: 25,
                id: 2
            }
        ])
    })

    it("Should let findUserById return a user", () => {
        expect(findUserById(users, 1)).toEqual(
            {
                name: "Temitayo",
                age: 20,
                id: 1
            }
        )

        expect(findUserById(users, 10)).toBeUndefined
    })
})