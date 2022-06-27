// Открытие карточек в мобильной версии
document.querySelector('.burger-card').addEventListener('click', function () {
    document.querySelectorAll('.card-mobile').forEach(item => {
        item.classList.toggle('_active_card');

        let plus = document.querySelector('.plus');

        if (item.classList.contains('_active_card')) {
            plus.style.transform = 'rotate(0deg)';
        } else {
            plus.style.transform = 'rotate(-45deg)';
        }
    });
});


// Открытие popup окон
document.querySelectorAll('.popup').forEach(item => {
    item.addEventListener('click', function (e) {

        document.querySelector('.popup_window').classList.toggle('_popup_active');

        document.body.style.overflowY = 'hidden';
    });
});

// Закрытие popup окон
document.querySelector('.popup__close').addEventListener('click', function () {
    document.querySelector('.popup_window').classList.remove('_popup_active');

    document.body.style.overflowY = 'auto';
})


// Открытие мобильного меню
document.querySelector('.burger').addEventListener('click', function () {
    document.querySelector('.burger').classList.toggle('_burger__active');
    if (document.querySelector('.burger').classList.contains('_burger__active')) {
        document.querySelector('.menu-mobile').classList.add('_active_menu');
        document.body.style.overflowY = 'hidden';
    } else {
        document.querySelector('.menu-mobile').classList.remove('_active_menu');
        document.body.style.overflowY = 'auto';
    }

});



// Маска ввода номера телефона
var phoneInputs = document.querySelectorAll('input[data-tel]');

var getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '');
}

var onPhonePaste = function (e) {
    var input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
    var pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue;
            return;
        }
    }
}

var onPhoneInput = function (e) {
    var input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
        return input.value = "";
    }

    if (input.value.length != selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
            input.value = inputNumbersValue;
        }
        return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
        var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
        formattedInputValue = input.value = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
    } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
}
var onPhoneKeyDown = function (e) {
    var inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
    }
}
for (var phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
}