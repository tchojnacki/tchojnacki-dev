Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
  writable: true,
  value: jest.fn().mockImplementation(() => {}),
})

export {}
