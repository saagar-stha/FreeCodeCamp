function isPalindrome(str) {
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleanStr === cleanStr.split('').reverse().join('');
}

function checkPalindrome() {
    const input = document.getElementById('text-input').value;
    const result = document.getElementById('result');

    if (input === '') {
        alert('Please input a value');
        return;
    }

    const isPal = isPalindrome(input);
    const resultText = `${input} ${isPal ? 'is' : 'is not'} a palindrome`;
    result.textContent = resultText;
    result.className = isPal ? 'palindrome' : 'not-palindrome';

    result.style.opacity = '0';
    setTimeout(() => {
        result.style.opacity = '1';
    }, 50);
}

document.getElementById('check-btn').addEventListener('click', checkPalindrome);
document.getElementById('text-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkPalindrome();
    }
});

document.querySelectorAll('.example').forEach(example => {
    example.addEventListener('click', function() {
        document.getElementById('text-input').value = this.textContent;
        checkPalindrome();
    });
});