var taxCalculationService = function() {

   return {
     calc_income_tax : function(itemArray, income) {
              var index = 0;
              var income_tax=0;
              for(var i=0; i<itemArray.length; i++){
                if(income >= itemArray[i].from && income <= itemArray[i].to){
                  index = i;
                  break;
                }
              }
              
              if(itemArray[index].rule === "full"){
                income_tax = ((itemArray[index].percent)/100)*income;
              }
              else if(itemArray[index].rule == "partial"){
                for(var k=0; k<=index; k++){
                if(itemArray[k].percent === 0){
                  income_tax = income_tax + 0;
                  console.log(income_tax);
                }
                else if(k===index){
                  income_tax = income_tax + (income-(itemArray[k].from-1))*((itemArray[k].percent)/100);
                  console.log(itemArray[k].from);
                  console.log(itemArray[k].percent);
                  console.log(income_tax);
                }
                else{
                  income_tax = income_tax + (itemArray[k].to-itemArray[k].from)*((itemArray[k].percent)/100);
                  console.log(itemArray[k].from);
                  console.log(itemArray[k].percent);
                  console.log(income_tax);
                }
                } 
              }
              
             return income_tax;
             }
           }
     };