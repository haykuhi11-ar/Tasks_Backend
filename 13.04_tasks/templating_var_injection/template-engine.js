function pars(template, variables) {
    let result = template;
    for (let key in variables) {
        const placeholder = "{{" + key + "}}";
        const value = variables[key];

        result = result.split(placeholder).join(value);
    }
    return result;
}
module.exports = pars;