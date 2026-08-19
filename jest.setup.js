jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => {
  const actual = jest.requireActual('react-native/Libraries/BatchedBridge/NativeModules');
  const nativeModules = actual.default || actual;
  if (!nativeModules.UIManager) {
    nativeModules.UIManager = {};
  }
  if (!nativeModules.NativeUnimoduleProxy) {
    nativeModules.NativeUnimoduleProxy = { viewManagersMetadata: {} };
  }
  if (!actual.UIManager) {
    actual.UIManager = nativeModules.UIManager;
  }
  if (!actual.NativeUnimoduleProxy) {
    actual.NativeUnimoduleProxy = nativeModules.NativeUnimoduleProxy;
  }
  return actual;
});
