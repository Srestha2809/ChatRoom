import { times } from "lodash";
describe("Test MaterialUI Lab12 - Select String", () => {
    it("finds the server and build the string", () => {
        cy.visit("http://localhost:5173/");
        times(6, () => {
            cy.get("#pickWords").click().type("{downArrow}{enter}")
        });
        cy.contains("Bharadwaj");// click on the input field to open the dropdown
    });
});