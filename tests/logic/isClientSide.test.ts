import { isClientSide } from 'logic'

describe('isClientSide', () => {
  it('is true in jsdom', () => {
    expect(isClientSide()).toBe(true)
  })
})
