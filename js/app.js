$(document).ready(function() {
	var visibleResult = $(".result_screen p"),
		memoryResult = "",
		calculationMemory,
		calculationOperator,
		operatorMemory;

	$(".number").on("click", function() {
		if (memoryResult.indexOf(".") === -1 || $(this).text() !== ".") {
			if (memoryResult.charAt(0) !== "0" || memoryResult.indexOf(".") > -1 || $(this).text() !== "0") {
				if (memoryResult === "" && $(this).text() === ".") {
					memoryResult = "0." + memoryResult;
				} else {
					memoryResult = memoryResult + $(this).text();	
				};
				visibleResult.text(memoryResult);
			};
		};
		errorLength(visibleResult);
	});

	$(".operator").on("click", function() {
		if (calculationMemory === undefined) {
			calculationMemory = parseFloat(visibleResult.text());
			memoryResult = "";
			calculationOperator = $(this).text();            
		} else {
			operation (calculationOperator, visibleResult);
			calculationOperator = $(this).text();	
			calculationMemory = parseFloat(visibleResult.text());
			memoryResult = "";		
		};
		errorLength(visibleResult);
	});

	$(".equal_sign").on("click", function() {
		operation(calculationOperator, visibleResult);
		calculationMemory = undefined;
		calculationOperator = undefined;
		memoryResult = "";
		errorLength(visibleResult);
	});

	$(".clear").on("click", function() {
		visibleResult.text("0");
		memoryResult = "";
		calculationMemory = undefined;
		calculationOperator = undefined;
	});

	$(".plus_minus").on("click", function() {
		if (parseFloat(visibleResult.text()) > 0) {
			memoryResult = "-" + memoryResult;
			visibleResult.text(memoryResult);
		} else if (parseFloat(visibleResult.text()) < 0) {
			memoryResult = memoryResult.replace("-", "");
			visibleResult.text(memoryResult);
		};
	});

	/*$("td").on("click", function() {
        if ($(this).hasClass("operator") && operatorMemory === 1) {
            operatorMemory = undefined;
            console.log("BLAD");
        } else if ($(this).hasClass("operator")) {
            operatorMemory = 1;
        } else {
            operatorMemory = undefined;
        };
	});*/

	function errorLength (visibleResult) {
		if (visibleResult.text().length > 14) {
			visibleResult.text("ERROR");
			memoryResult= "";
			calculationMemory = undefined;
			calculationOperator = undefined;
		};
	};

	function rounding (x) {
		while (x.text().substr(x.text().length - 1) === "0") {
			x.text(x.text().slice(0,-1));
		};
		if (x.text().substr(x.text().length - 1) === ".") {
			x.text(x.text().slice(0, -1));
		};	
	};

	function operation (calculationOperator, x) {
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