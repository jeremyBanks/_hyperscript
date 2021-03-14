describe("/// hyperplane", function() {

    beforeEach(function() {
        clearWorkArea();
    });
    afterEach(function()  {
        clearWorkArea();
    });

    it("basic hyperplane functionality", function(){
        var div = make("<div _='on click 1 set /foo to 42 on click 2 put /foo into me'></div>");
        div.click();
        div.click();
        div.innerHTML.should.equal("42");
    })

    it("basic persistent hyperplane functionality", function(){
        var div = make("<div _='on click 1 set ///foo to 42 on click 2 put ///foo into me'></div>");
        div.click();
        div.click();
        div.innerHTML.should.equal("42");
    })

});