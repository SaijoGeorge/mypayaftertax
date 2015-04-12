var taxRuleDataService = function() {
   var ruleData = {
      2015 : {
        "income_tax_slab": {"resident":[
                                  {from: 0, to: 18200, percent: 0, rule: "partial"},
                                  {from: 18201, to: 37000, percent: 19, rule: "partial"},
                                  {from: 37001, to: 80000, percent: 32.5, rule: "partial"},
                                  {from: 80001, to: 180000, percent: 37, rule: "partial"},
                                  {from: 180001, to: 999999999, percent: 45, rule: "partial"}
                                  ],
                            "nonresident":[
                                  {from: 0, to: 80000, percent: 32.5, rule: "partial"},
                                  {from: 80001, to: 180000, percent: 37, rule: "partial"},
                                  {from: 180001, to: 999999999, percent: 45, rule: "partial"}
                                  ]
                            },      
        "medicare_levy":  {"individual_regular":[
                                  {from:0, to: 20541, percent: 0, rule:"partial"},
                                  {from:20542, to: 24167, percent: 10, rule:"partial"},
                                  {from:24167, to: 999999999, percent: 2, rule:"full"}
                                  ],
                            "individual_senior":[
                                  {from:0, to: 32278, percent: 0, rule:"partial"},
                                  {from:32279, to: 37975, percent: 10, rule:"partial"},
                                  {from:37975, to: 999999999, percent: 2, rule:"full"}
                                  ],
                            "family_regular":[
                                  {from:0, to: 40430, percent: 0, rule:"partial"},
                                  {from:40431, to: 999999999, percent: 2, rule:"full"}
                                  ],
                            "family_senior":[
                                  {from:0, to: 54116, percent: 0, rule:"partial"},
                                  {from:54117, to: 999999999, percent: 2, rule:"full"}
                                  ]
                            },      
        "medicare_levy_surcharge":  {"individual_regular":[
                                  {from:0, to: 88000, percent: 0, rule:"full"},
                                  {from:88000, to: 102000, percent: 1, rule:"full"},
                                  {from:102001, to: 136000, percent: 1.25, rule:"full"},
                                  {from:136001, to: 999999999, percent: 1.5, rule:"full"}
                                  ],
                                  "family_regular":[
                                  {from:0, to: 176000, percent: 0, rule:"full"},
                                  {from:176001, to: 204000, percent: 1, rule:"full"},
                                  {from:204001, to: 272000, percent: 1.25, rule:"full"},
                                  {from:272001, to: 999999999, percent: 1.5, rule:"full"}
                                  ]
                            },      
        "temporary_budget_repair_levy":  {"resident":[
                                  {from:0, to: 180000, percent: 0, rule:"partial"},
                                  {from:180001, to: 999999999, percent: 2, rule:"partial"}
                                  ],
                                  "nonresident":[
                                  {from:0, to: 180000, percent: 0, rule:"partial"},
                                  {from:180001 , to: 999999999, percent: 2, rule:"partial"}
                                  ]
                            },      
        "help_repayment_income":  {"individual_regular":[
                                  {from:0, to: 53344, percent: 0, rule:"full"},
                                  {from:53345, to: 59421, percent: 4, rule:"full"},
                                  {from:59422, to: 65497, percent: 4.5, rule:"full"},
                                  {from:65498, to: 68939, percent: 5, rule:"full"},
                                  {from:68940, to: 74105, percent: 5.5, rule:"full"},
                                  {from:74106, to: 80257, percent: 6, rule:"full"},
                                  {from:80258, to: 84481, percent: 6.5, rule:"full"},
                                  {from:84482, to: 92970, percent: 7, rule:"full"},
                                  {from:92971, to: 99069, percent: 7.5, rule:"full"},
                                  {from:99070, to: 999999999, percent: 8, rule:"full"}
                                  ]
                            }
        
      }
      
    };
   return {
     income_tax_slab : function(year, resident_type) {
              var itemArray = ruleData[year].income_tax_slab[resident_type];
              return itemArray;
             },
      medicare_levy : function(year,income_type,individual_type) {
              var itemArray = ruleData[year].medicare_levy[income_type+"_"+individual_type];
              return itemArray;
             },
      medicare_levy_surcharge : function(year, income_type, individual_type) {
              var itemArray = ruleData[year].medicare_levy_surcharge[income_type+"_"+individual_type];
              return itemArray; 
             },
      temporary_budget_repair_levy : function(year,resident_type) {
             var itemArray = ruleData[year].temporary_budget_repair_levy[resident_type];
              return itemArray;
             },
      help_repayment_income : function(year, income_type, individual_type) {
             var itemArray = ruleData[year].help_repayment_income[income_type+"_"+individual_type];
              return itemArray;
             }
           }
     };