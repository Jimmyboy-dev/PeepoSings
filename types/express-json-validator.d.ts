declare module 'express-json-validator-middleware' {
  import type { NextFunction } from 'express'
  import type { Options } from 'ajv'

  export class Validator {
    constructor(ajvOptions: Options)
    validate(options: Record<string, any>): NextFunction
  }

  export class ValidationError extends Error {
    validationErrors: Record<string, any[]>
    name: 'JsonSchemaValidationError'
    constructor(validationErrors: Record<string, any[]>)
  }
}
