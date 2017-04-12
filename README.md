# colorme-manager

1. install
    -   npm install
2. config
    -   Camera ios: react-native link react-native-camera
    -   Camera android: go node_module -> react-native-barcodescanner -> android/src/main/java/com/eguma/barcodescaner
        Edit file: BarcodeScannerView.java
        Replace code: BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
        -> BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source.invert()));

MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD='facebook'
MYAPP_RELEASE_KEY_PASSWORD='facebook'