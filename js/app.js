"use strict";

$(document).ready(function() {
    
// VARIABLES:
    
	var numberButtons = $(".number"),
        operatorButtons = $(".operator"),
        equalSignButton = $(".equal-sign"),
        clearButton = $(".clear"),
        plusMinusButton = $(".plus-minus"),
        visibleResult = $(".result-screen p"),
		memoryResult = "",
		calculationMemory,
		calculationOperator,
		operatorMemory,
        doubleIndicator = false;

//----------EVENT LISTNERS----------
    
    // BUTTONS WITH NUMBERS:
    
	numberButtons.on("click", function() {
		if (memoryResult.indexOf(".") === -1 || $(this).text() !== ".") {
			if (memoryResult.charAt(0) !== "0" || memoryResult.indexOf(".") > -1 || $(this).text() === ".") {
				if (memoryResult === "" && $(this).text() === ".") {
					memoryResult = "0." + memoryResult;
				} else {
					memoryResult = memoryResult + $(this).text();	
				};
				visibleResult.text(memoryResult);
			} else if (memoryResult.charAt(0) === "0" && $(this).text() !== "0" && $(this).text() !== ".") {
                memoryResult = $(this).text();
                visibleResult.text(memoryResult);
            };
		};
		tooHighNumber(visibleResult);      
        doubleIndicator = false;
	});
    
    // BUTTONS WITH OPERATORS:

	operatorButtons.on("click", function() {
		if (calculationMemory === undefined && doubleIndicator === false) {
			calculationMemory = parseFloat(visibleResult.text());
			memoryResult = "";
			calculationOperator = $(this).text(); 
            doubleIndicator = true;
		} else if (doubleIndicator === false) {
			calc(calculationOperator, visibleResult);
			calculationOperator = $(this).text();	
			calculationMemory = parseFloat(visibleResult.text());
			memoryResult = "";	
            doubleIndicator = true;
		};
		tooHighNumber(visibleResult);
	});
    
    // BUTTON WITH EQUAL SIGN:

	equalSignButton.on("click", function() {
		calc(calculationOperator, visibleResult);
		calculationMemory = parseFloat(visibleResult.text());
		calculationOperator = undefined;
		memoryResult = "";
		tooHighNumber(visibleResult);
	});
    
    // CLEAR BUTTON:

	clearButton.on("click", function() {
		visibleResult.text("0");
		memoryResult = "";
		calculationMemory = undefined;
		calculationOperator = undefined;
	});
    
    // PLUS/MINUS BUTTON:

	plusMinusButton.on("click", function() {
		if (parseFloat(visibleResult.text()) > 0 && doubleIndicator === false) {
            visibleResult.text("-" + visibleResult.text());
		} else if (parseFloat(visibleResult.text()) < 0 && doubleIndicator === false) {
            visibleResult.text(visibleResult.text().replace("-", ""));
		}
	});
    
//----------FUNCTION DEFINITIONS----------
    
    // TOO HIGH NUMBER:

	function tooHighNumber(visibleResult) {
		if (visibleResult.text().length > 14) {
			visibleResult.text("ERROR");
			memoryResult= "";
			calculationMemory = undefined;
			calculationOperator = undefined;
		};
	};
    
    // ROUNDING:

	function rounding(x) {
		while (x.text().substr(x.text().length - 1) === "0") {
			x.text(x.text().slice(0,-1));
		};
		if (x.text().substr(x.text().length - 1) === ".") {
			x.text(x.text().slice(0, -1));
		};	
	};
    
    // CALCULATION:

	function calc(calculationOperator, x) {
		switch (calculationOperator) {
			case "+":
				x.text((calculationMemory + parseFloat(x.text())).toFixed(5));
				rounding(x);
				break;
			case "-":
				x.text((calculationMemory - parseFloat(x.text())).toFixed(5));
				rounding(x);
				break;
			case "x":
				x.text((calculationMemory * parseFloat(x.text())).toFixed(5));
				rounding(x);
				break;
			case "÷":
				x.text((calculationMemory / parseFloat(x.text())).toFixed(5));
				rounding(x);
				break;
		};
	};
});