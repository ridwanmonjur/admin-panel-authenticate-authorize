const { plainToClass } = require( 'class-transformer');
const { validate } = require( 'class-validator');
const { validationOptions } = require( './validatorOptions');
const { HTTP422UnproccessableEntity } = require( '../exceptions/AppError');

exports.validationHelper = async function(dto, body) {
    const toBeValidated = plainToClass(dto, body);
    console.log({ toBeValidated })
    const validationError = await validate(toBeValidated, validationOptions)
    const validationLength = validationError?.length || 0;
    let allValidations = "";
    let firstValidationConstraint = "";
    if (validationLength > 0) {
        Object.keys(validationError[0].constraints).forEach(
            (currentValue) => {
                firstValidationConstraint += `${validationError[0].constraints[currentValue]}. `
            }
        )
        validationError.forEach(
            (currentValue, currentIndex) => {
                if (validationLength === 1) { allValidations += `'${currentValue.property}' `; return; }
                if (currentIndex === validationLength - 1) { allValidations += `'${currentValue.property}'`; }
                else if (currentIndex === validationLength - 2) { allValidations += `'${currentValue.property}' and `; }
                else { allValidations += `'${currentValue.property}', `; }
            }
        );
        throw new HTTP422UnproccessableEntity(
            `${firstValidationConstraint}`
            + "\n\n"
            + `${validationLength} property(s): ${allValidations} failed validation.`
        );
    }
    return toBeValidated;
}
