import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { injectBraintreeClient } from '../src/injection-keys'

describe('injectBraintreeClient', () => {
  it('throws a descriptive error when called outside a provider', () => {
    const Comp = defineComponent({
      setup() {
        injectBraintreeClient()
        return {}
      },
      template: '<div />',
    })
    expect(() => mount(Comp)).toThrow('[braintree-vue3]')
  })
})
