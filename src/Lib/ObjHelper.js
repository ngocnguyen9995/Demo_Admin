var hasOwnProperty = Object.prototype.hasOwnProperty;
export function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
