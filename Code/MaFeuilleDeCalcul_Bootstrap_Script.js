function InjectEquations()
{
    var numberOfEquations = document.getElementById("numberOfCalculations").value;
    var operator = document.getElementById("operator").value;
    var upperBound = document.getElementById("upperBound").value;

    if (!isInteger(parseFloat(upperBound)))
    {
        alert ("La valeur maximale du resultat doit etre un nombre entier.");
    }
    else
    {
        GenerateEquations(numberOfEquations, operator, upperBound);
    }
}

function isInteger (value) 
{
  return typeof value === 'number' && 
    isFinite(value) &&
    Math.floor(value) === value;
};

function GenerateEquations(numberOfEquations, operator, upperBound)
{
    var lowerBound = 0;
    var equationBlock;

    for (var i = 0; i < numberOfEquations; i++)
    {
        do
        {
            var term1 = Math.floor(Math.random() * upperBound + lowerBound);
            var term2 = Math.floor(Math.random() * upperBound + lowerBound);
            var result = eval(term1 + operator + term2);
            var integer = isInteger(result);  
        }
        while(result > upperBound || result < lowerBound || !integer || (term2 == 0 && operator === "/"));
        
        equationBlock = CreateEquationByFunction(term1, term2, operator, result);
        
        if(i < 5)
        {
            if(numberOfEquations > 10)
                document.getElementById("equationBlock1").appendChild(equationBlock);
            else
                document.getElementById("equationBlock2").appendChild(equationBlock);
        }
        else if (i < 10)
        {
            if(numberOfEquations > 10)
                document.getElementById("equationBlock2").appendChild(equationBlock);
            else
                document.getElementById("equationBlock3").appendChild(equationBlock);
        }
        else if (i < 15)
        {
            document.getElementById("equationBlock3").appendChild(equationBlock);
        }
        else
        {
            document.getElementById("equationBlock4").appendChild(equationBlock);
        }
        
    }
}


function CreateEquationByHtml(num1, num2, operator)
{
    var equation =      "<div id = 'calculAndAnswer'>" +
                            "<p>" +
                                "<label id = 'calcul' for='answer'>" + num1 + " " + operator + " " + num2 + " = </label>" +
                                "<input type='text' name='answer' id='answer' placeholder='' size='10' maxlength='3' />" +
                            "</p>"+
                        "</div>";
    return equation;
}

function CreateEquationByFunction(num1, num2, operator, ans)
{
    if (operator === "/")
    {
        operator = "%";
    }

    var label = document.createElement("label");
    label.setAttribute("id", "calcul");
    label.setAttribute("for", "answer");
    label.setAttribute("class", "col-xs-2 col-xs-offset-2 col-lg-4 col-lg-offset-0");
    label.appendChild(document.createTextNode(num1 + " " + operator + " " + num2 + " =  "));

    var input = document.createElement("input");
    input.setAttribute("class", "form-control");
    input.setAttribute("type", "number");
    input.setAttribute("name", "answer");
    input.addEventListener("input", function()
            {
                if(this.value == ans)
                {
                     this.style.backgroundColor = 'lightgreen';
                     this.style.color = 'darkgreen';
                }
                else
                {
                     this.style.backgroundColor = 'lightcoral';
                     this.style.color = 'darkred';
                }

                if (this.value == "" || this.value == null)
                {
                    this.style.backgroundColor = 'white';
                }
            }   
        ); 
    
    var documentFragment = document.createDocumentFragment();
    var divBlock = document.createElement("div");
    divBlock.setAttribute("class", "form-group");
    
    var divInput = document.createElement("div");
    divInput.setAttribute("class", "col-xs-6 col-lg-8");

    divInput.appendChild(input);
    divBlock.appendChild(label);
    divBlock.appendChild(divInput);
    documentFragment.appendChild(divBlock);

    return documentFragment;
}

