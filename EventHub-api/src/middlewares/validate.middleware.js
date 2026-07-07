const {BadRequestError} = require('../errors');
const ERROR_CODES = require('../errors/error.codes');

/**
 * Generic validation middleware factory.
 *
 * Takes a Zod schema shaped like `{ body?, query?, params? }` and
 * validates the corresponding parts of the request against it.
 * On success, the (possibly transformed/coerced/defaulted) values are
 * written back onto req, so controllers always read already-clean data.
 * On failure, throws a BadRequestError with a structured list of issues
 * instead of letting Zod's raw error leak to the client.
 *
 * Usage:
 *   router.post('/events', validate(createEventSchema), controller.create);
 */

function validate(schema) {
    return (req, res, next) =>{
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        if (!result.success) {
            const details = result.error.issues.map((issue) => ({
                path: issue.path.join('.'),
                message: issue.message,
            }));
            return next(
                new BadRequestError('Validation failed', ERROR_CODES.VALIDATION_ERROR, details)
            );
        }

        if (result.data.body !== undefined) req.body = result.data.body;
        if (result.data.query !== undefined) req.query = result.data.query;
        if (result.data.params !== undefined) req.params = result.data.params;

        next();
    };
}

module.exports = validate;