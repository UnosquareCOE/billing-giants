import { ValidationError } from 'yup';

const graphValidation = {
    async Mutation(resolve, root, args, context, info) {
        const mutationField = info.schema.getMutationType().getFields()[info.fieldName]
        const mutationValidationSchema = mutationField?.extensions?.validationSchema
        if (mutationValidationSchema) {
          try {
              await mutationValidationSchema.validate(args)
          } catch (error) {
            if (error instanceof ValidationError) {
              return {
                error: error.message,
              }
            } else {
              throw error
            }
          }
        }
    
        return resolve(root, args, context, info)
      },

}

export { graphValidation };