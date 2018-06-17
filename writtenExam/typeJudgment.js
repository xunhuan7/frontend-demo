const type = (target) => {
    let targetType = typeof (target);
    let template = {
        '[object Array]': 'array',
        '[object Object]': 'object',
        '[object Number]': 'object(number)',
        '[object Boolean]': 'object(boolean)',
        '[object String]': 'object(string)'
    };
    if (target === null) {
        return 'null';
    } else if (targetType === 'object') {
        let str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return targetType;
    }
};