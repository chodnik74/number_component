$( document ).ready(function() {

    var inputNumber = $(".number__input");
    var inputPlus = $(".number__control--plus");
    var inputMinus = $(".number__control--minus");
    var inputMessage = $(".number__message");
    var maxValue = parseInt(inputNumber.attr("max"));
    var minValue = parseInt(inputNumber.attr("min"));
    var stepValue = parseInt(inputNumber.attr("step"));

    function numberRound(number) {
        return (Math.round((number) * 10000) / 10000);
    }

    function numberToVal(value) {
        return value * 1;
    }

    function numberIsMax() {
        var currentNumber = inputNumber.val();
        var nextNumber = Number(currentNumber) + Number(stepValue);
        if(nextNumber < maxValue) {
            //inputMessage.html("");
            return false;
        } else {
            inputMessage.html("<span>Maximální hodnota je: "+ maxValue +"</span>");
            return true;
        }
    }
    function numberIsMin() {
        var currentNumber = inputNumber.val();
        var nextNumber = Number(currentNumber) - Number(stepValue);
        if(nextNumber > minValue) {
            //inputMessage.html("");
            return false;
        } else {
            inputMessage.html("<span>Minimální hodnota je: "+ minValue +"</span>");
            return true;
        }
    }

    var numberModifyTimer;
    var modifySpeed = defaultSpeed = 300;
    function numberModify(input, value)  {
        var newValue = numberRound(numberToVal(input.val()) + value);
        input.val(newValue);
        numberModifyTimer = setTimeout(function() {
            modifySpeed = modifySpeed * 0.9;
            if(numberIsMax()) {return false;}
            if(numberIsMin()) {return false;}
            numberModify(input, value);
        }, modifySpeed)
    }

    function numberModifyStop() {
        clearTimeout(numberModifyTimer);
        modifySpeed = defaultSpeed;
    }

    inputNumber.on("change keypress paste focus textInput input",function () {
        console.log("Changed");
        if(numberIsMax()) {
            inputNumber.val(maxValue);
        }
        if(numberIsMin()) {
            inputNumber.val(minValue);
        }
    });
    inputPlus.mousedown(function (e) {
        if(numberIsMax()) {
            return false;
        } else {
            inputMessage.html("");
            numberModify(inputNumber, stepValue);
        }
    });
    inputPlus.mouseup(function (e) {
        numberModifyStop();
    });
    inputMinus.mousedown(function (e) {
        if(numberIsMin()) {
            return false;
        } else {
            inputMessage.html("");
            numberModify(inputNumber, -stepValue);
        }
    });
    inputMinus.mouseup(function (e) {
        numberModifyStop();
    });
});
