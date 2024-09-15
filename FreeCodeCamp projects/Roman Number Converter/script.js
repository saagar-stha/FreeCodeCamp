function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    let result = '';
    for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i].value) {
            result += romanNumerals[i].numeral;
            num -= romanNumerals[i].value;
        }
    }
    return result;
}

function updateOutput(message) {
    const output = document.getElementById('output');
    output.textContent = message;
    output.style.opacity = '0';
    setTimeout(() => {
        output.style.opacity = '1';
    }, 50);
}

function convertNumber() {
    const input = document.getElementById('number');
    const num = parseInt(input.value);

    if (isNaN(num) || input.value.trim() === '') {
        updateOutput('Please enter a valid number');
    } else if (num < 1) {
        updateOutput('Please enter a number greater than or equal to 1');
    } else if (num >= 4000) {
        updateOutput('Please enter a number less than or equal to 3999');
    } else {
        updateOutput(convertToRoman(num));
    }
}

document.getElementById('convert-btn').addEventListener('click', convertNumber);
document.getElementById('number').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        convertNumber();
    }
});

document.querySelectorAll('.example').forEach(example => {
    example.addEventListener('click', function() {
        document.getElementById('number').value = this.textContent;
        convertNumber();
    });
});