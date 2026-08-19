declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void | Promise<void>) => void;
declare const beforeEach: (fn: () => void | Promise<void>) => void;
declare const expect: (actual: any) => any;
declare namespace jest {
  function fn(): any;
  function mock(moduleName: string, factory?: () => any): any;
  type Mocked<T> = {
    [P in keyof T]: T[P] extends (...args: any[]) => any ? jest.MockedFunction<T[P]> : T[P];
  };
  type MockedFunction<T extends (...args: any[]) => any> = T & {
    mockResolvedValue: (val: any) => any;
    mockImplementation: (fn: any) => any;
  };
}
