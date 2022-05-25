const fact = (n) => {
    if (n < 0 || n != Math.floor(n)) throw new Error([
        'illegal arguments to function: fact',
        'this function expects only positive integers',
    ].join('\n'));

    if (n == 0) return 1;

    return n * fact(n-1);
}

module.exports = fact
