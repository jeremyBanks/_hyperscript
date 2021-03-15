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

    it("speed test", function(){
        console.time("hyperplane")
        var div = make("<div _='on click 1 set /foo to 42 on click 2 put /foo into me'></div>");
        for (var i = 0; i < 10000; i++) {
            div.click();
        }
        console.timeEnd("hyperplane");
    })

    it("basic persistent hyperplane functionality", function(){
        localStorage.removeItem('hyperplane')
        var div = make("<div _='on click 1 set ///foo to 42 on click 2 put ///foo into me'></div>");
        div.click();
        div.click();
        div.innerHTML.should.equal("42");

        div = make("<div _='on click put ///foo into me'></div>");
        div.click();
        div.innerHTML.should.equal("42");
        localStorage.removeItem('hyperplane')
    })

});