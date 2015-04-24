var calculate;
(function() {

		   		
		var tax_rule_data_service = taxRuleDataService();	
		var tax_calculation_service = taxCalculationService();
		var year = 2015;
		var regularIncome = 150000;
		var familyIncome = regularIncome;
		var incomeFrequency = "year";
		var isSenior = false;
		var isHelpRepayment = false;
		var isNonResident = false;
		var noOfChildren = 0;
		var superAnnuationPerc  = 9.5;
		var superAnnuationExist = "excludes";
		var residenceType = "resident";
		var incomeType = "individual" // "family"
		var individualType = "regular" 
			
		var calculateTax = function(){
			
			/* Add Number of Children Logic*/
			//
			year = 2015;
			regularIncome = (typeof($("#regularIncome").val())!="undefined")?$("#regularIncome").val():regularIncome;
			console.log(regularIncome);
			console.log(familyIncome);
			familyIncome = (typeof($("#familyIncome").val())!="undefined")?$("#regularIncome").val():regularIncome;
			console.log(familyIncome);
			incomeFrequency = (typeof($("#incomeFrequency").val())!="undefined")?$("#incomeFrequency").val():incomeFrequency;
			residenceType = "resident";
			incomeType = "individual" // "family"
			individualType = "regular" // "senior"
			isSenior = (typeof($("#isSenior").val())!="undefined")?$("#isSenior").is(':checked'):isSenior;
			isHelpRepayment = (typeof($("#isHelpRepayment").val())!="undefined")?$("#isHelpRepayment").is(':checked'):isHelpRepayment;
			isNonResident = (typeof($("#isNonResident").val())!="undefined")?$("#isNonResident").is(':checked'):isNonResident;
			noOfChildren = (typeof($("#noOfChildren").val())!="undefined")?$("#noOfChildren").val():noOfChildren;	
			superAnnuationPerc = (typeof($("#superAnnuationPerc").val())!="undefined")?$("#superAnnuationPerc").val():superAnnuationPerc;
			superAnnuationExist = (typeof($("#superAnnuationExist").val())!="undefined")?$("#superAnnuationExist").val():superAnnuationExist;
			var superAnnuation = 0;
			
			/* Calculate Salary */
			if(incomeFrequency =="week")
				regularIncome = regularIncome*52;
			else if(incomeFrequency =="fortnight")
				regularIncome = regularIncome*26;
			else if(incomeFrequency =="month")
				regularIncome = regularIncome*12;
			else
				regularIncome = regularIncome;
			
			if(superAnnuationExist =="includes")
				regularIncome = (1000*regularIncome)/1095;
				
			familyIncome=regularIncome;
			
			/* Set Parameters*/
			if(regularIncome != 0){
			  superAnnuation =  (superAnnuationPerc/100)*regularIncome;
			}
			console.log(familyIncome);
			familyIncome = Number(familyIncome) - (Number(noOfChildren)*3713);
			if (familyIncome<=0){
			familyIncome = 0;
			}				
			if(familyIncome != regularIncome){
			  incomeType = "family";
			}
			
			if(isSenior){
			  individualType = "senior";
			}
			
			if(isNonResident){
			  residenceType = "nonresident";
			}
			
			/* Initialise the Tax*/
			var incomeTax = 0;
			var totalTax = 0;
			var netIncome = 0;
			var temporaryBudgetRepairLevy = 0;
			var medicareLevy = 0;
			var medicareLevySurcharge = 0;
			var helpRepaymentIncome = 0;
			
			var ruleDataSet = tax_rule_data_service.income_tax_slab(year,residenceType);
			incomeTax = tax_calculation_service.calc_income_tax(ruleDataSet, regularIncome);

			
			var temporaryBudgetRepairLevyDataSet = tax_rule_data_service.temporary_budget_repair_levy(year,residenceType);
			temporaryBudgetRepairLevy = tax_calculation_service.calc_income_tax(temporaryBudgetRepairLevyDataSet, regularIncome);
			
			if(!isNonResident){
			  var medicareLevyDataSet = tax_rule_data_service.medicare_levy(year,incomeType, individualType);
			  medicareLevy = tax_calculation_service.calc_income_tax(medicareLevyDataSet, familyIncome);
			  
			  var medicareLevySurchargeDataSet = tax_rule_data_service.medicare_levy_surcharge(year,incomeType, "regular");
			  medicareLevySurcharge = tax_calculation_service.calc_income_tax(medicareLevySurchargeDataSet, familyIncome);
			  
			  if(isHelpRepayment){
			  var helpRepaymentIncomeDataSet = tax_rule_data_service.help_repayment_income(year,"individual", "regular");
			  helpRepaymentIncome = tax_calculation_service.calc_income_tax(helpRepaymentIncomeDataSet, regularIncome);
			  }
			  			  
			  console.log(year+" : " + residenceType + " : " + incomeType + " : " + individualType + " : " + familyIncome + " : " + regularIncome);
			}
			else{
				medicareLevy = 0;
				medicareLevySurcharge =0;
				helpRepaymentIncome=0;
			}
			
			/* Yearly */
			$("#incomeTax").text(incomeTax.toFixed(2));
			$("#temporaryBudgetRepairLevy").text(temporaryBudgetRepairLevy.toFixed(2));
			$("#medicareLevy").text(medicareLevy.toFixed(2));
			$("#medicareLevySurcharge").text(medicareLevySurcharge.toFixed(2));
			$("#helpRepayment").text(helpRepaymentIncome.toFixed(2));
			/* Set the Results */
			totalTax = incomeTax + temporaryBudgetRepairLevy + medicareLevy + medicareLevySurcharge + helpRepaymentIncome;
			netIncome = regularIncome - totalTax;
			$("#totalTax").text(totalTax.toFixed(2));
			$("#superAnnuation").text(superAnnuation.toFixed(2));
			$("#netIncome").text(netIncome.toFixed(2));
			
			$("#incomeTaxMonthly").text((incomeTax/12).toFixed(2));
			$("#temporaryBudgetRepairLevyMonthly").text((temporaryBudgetRepairLevy/12).toFixed(2));
			$("#medicareLevyMonthly").text((medicareLevy/12).toFixed(2));
			$("#medicareLevySurchargeMonthly").text((medicareLevySurcharge/12).toFixed(2));
			$("#helpRepaymentMonthly").text((helpRepaymentIncome/12).toFixed(2));
			$("#totalTaxMonthly").text((totalTax/12).toFixed(2));
			$("#superAnnuationMonthly").text((superAnnuation/12).toFixed(2));
			$("#netIncomeMonthly").text((netIncome/12).toFixed(2));
			
			$("#incomeTaxFortnightly").text((incomeTax/26).toFixed(2));
			$("#temporaryBudgetRepairLevyFortnightly").text((temporaryBudgetRepairLevy/26).toFixed(2));
			$("#medicareLevyFortnightly").text((medicareLevy/26).toFixed(2));
			$("#medicareLevySurchargeFortnightly").text((medicareLevySurcharge/26).toFixed(2));
			$("#helpRepaymentFortnightly").text((helpRepaymentIncome/26).toFixed(2));
			$("#totalTaxFortnightly").text((totalTax/26).toFixed(2));
			$("#superAnnuationFortnightly").text((superAnnuation/26).toFixed(2));
			$("#netIncomeFortnightly").text((netIncome/26).toFixed(2));
			
			$("#incomeTaxWeekly").text((incomeTax/52).toFixed(2));
			$("#temporaryBudgetRepairLevyWeekly").text((temporaryBudgetRepairLevy/52).toFixed(2));
			$("#medicareLevyWeekly").text((medicareLevy/52).toFixed(2));
			$("#medicareLevySurchargeWeekly").text((medicareLevySurcharge/52).toFixed(2));
			$("#helpRepaymentWeekly").text((helpRepaymentIncome/52).toFixed(2));			
			$("#totalTaxWeekly").text((totalTax/52).toFixed(2));
			$("#superAnnuationWeekly").text((superAnnuation/52).toFixed(2));
			$("#netIncomeWeekly").text((netIncome/52).toFixed(2));
			
			$("#taxResult").show();
			
		};
		
		/*var init = function(){
			year = 2015;
			regularIncome = 150000;
			familyIncome = 150000;
			incomeFrequency = "Annually";
			isSenior = false;
			isHelpRepayment = false;
			isResident = true;
			noOfChildren = 0;
			superAnnuationPerc  = 9.5;
			superAnnuationExist = "excludes";
			
			calculateTax();
			
		};
		init();*/
		
		calculate = function(){
			calculateTax();
		};
		
		$("#taxResult").hide();
		
		/* To invoke the Calculation on Value Update */
		/*
		$scope.$watch( 'regularIncome',function(newValue, oldValue){calculateTax();});
		$scope.$watch( 'familyIncome',function(newValue, oldValue){calculateTax();});
		$scope.$watch( 'incomeFrequency',function(newValue, oldValue){calculateTax();});
		$scope.$watch( 'superAnnuationPerc',function(newValue, oldValue){calculateTax();});
		$scope.$watch( 'isResident',function(newValue, oldValue){calculateTax();});
		$scope.$watch( 'isSenior',function(newValue, oldValue){calculateTax();});
		$scope.$watch( 'isHelpRepayment',function(newValue, oldValue){calculateTax();});
		$scope.$watch( 'noOfChildren',function(newValue, oldValue){calculateTax();});
		$scope.$watch( 'superAnnuationExist',function(newValue, oldValue){calculateTax();}); */

}());