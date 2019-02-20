describe("initial page load", function() {
    it("should have correct title", function() {
        browser.url("/");

        expect(browser.getTitle()).equal("React Boilerplate");
    });
});
