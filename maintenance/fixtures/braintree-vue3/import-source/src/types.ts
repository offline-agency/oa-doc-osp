// Local augmentations for gaps in @types/braintree-web@3.96.17 relative to
// braintree-web@3.138.0 runtime behaviour.

declare module 'braintree-web' {
  interface HostedFieldsTokenizePayload {
    /**
     * BIN data returned when the merchant account has Enhanced BIN Data enabled.
     * Not yet reflected in @types/braintree-web@3.96.17.
     */
    binData?: {
      prepaid: string
      healthcare: string
      debit: string
      durbinRegulated: string
      commercial: string
      payroll: string
      issuingBank: string
      countryOfIssuance: string
      productId: string
    }
  }

  interface HostedFieldsField {
    /**
     * Restrict which card brands are accepted in this hosted field.
     * Keys are brand names (e.g. 'visa', 'mastercard'); value false disables that brand.
     * Not yet reflected in @types/braintree-web@3.96.17.
     */
    supportedCardBrands?: Record<string, boolean>
  }
}

export {}
