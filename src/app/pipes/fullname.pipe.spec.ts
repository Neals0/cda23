import { FullNamePipe } from './fullname.pipe';

describe('MajusculePipe', () => {
  it('create an instance', () => {
    const pipe = new FullNamePipe();
    expect(pipe).toBeTruthy();
  });
});
