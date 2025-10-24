export class PropertyApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: string
  ) {
    super(message);
    this.name = 'PropertyApiError';

    // Necesario para mantener la cadena de prototipos correcta cuando se extiende Error
    Object.setPrototypeOf(this, PropertyApiError.prototype);
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }

  public static isPropertyApiError(error: unknown): error is PropertyApiError {
    return error instanceof PropertyApiError;
  }
}