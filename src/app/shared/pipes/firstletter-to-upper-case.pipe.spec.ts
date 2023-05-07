import { FirstletterToUpperCasePipe } from './firstletter-to-upper-case.pipe';

describe('FirstletterToUpperCasePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstletterToUpperCasePipe();
    expect(pipe).toBeTruthy();
  });
});
