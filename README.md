# colorme-manager

1. install
    -   npm install
    -   react-native link
2. config
    -   Camera android: go node_modules/react-native-camera/android/src/main/java/com/lwansbrough/RCTCamera/RCTCameraViewFinder.java
        Replace code: BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
        -> BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source.invert()));

MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD='facebook'
MYAPP_RELEASE_KEY_PASSWORD='facebook'
