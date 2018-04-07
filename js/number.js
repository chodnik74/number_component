$( document ).ready(function() {

    var inputNumber = $(".number__input");
    var inputPlus = $(".number__control--plus");
    var inputMinus = $(".number__control--minus");
    var maxValue = $(".number__input").attr("data-max");
    var minValue = $(".number__input").attr("data-min");
    var stepValue = $(".number__input").attr("data-step");

    function numberRound(cislo) {
        return (Math.round((cislo) * 10000) / 10000);
    }

    function numberToVal(value) {
        return value * 1;
    }

    function numberIsMax() {
        var currentNumber = $(".number__input").val();
        var nextNumber = currentNumber + stepValue;
        if(nextNumber < maxValue) {
            console.log("OK!");
            return false;
        } else {
            console.log("MAX!");
            return true;
        }
    }
    function numberIsMin() {
        var currentNumber = $(".number__input").val();
        var nextNumber = currentNumber - stepValue;
        if(nextNumber > minValue) {
            console.log("OK!");
            return false;
        } else {
            console.log("MIN!");
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

    inputPlus.mousedown(function (e) {
        if(numberIsMax()) {return false;}
        numberModify(inputNumber, stepValue);
    });
    inputPlus.mouseup(function (e) {
        numberModifyStop();
    });
    inputMinus.mousedown(function (e) {
        if(numberIsMin()) {return false;}
        numberModify(inputNumber, -stepValue);
    });
    inputMinus.mouseup(function (e) {
        numberModifyStop();
    });
});
