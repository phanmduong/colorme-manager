package vn.colorme.phanminhduong.colormemanager;

import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import org.reactnative.camera.RNCameraPackage;

import com.react.rnspinkit.RNSpinkitPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import vn.colorme.phanminhduong.colormemanager.modules.LocationPackage;

public class MainApplication extends MultiDexApplication implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new ImagePickerPackage(),
            new RNNetworkInfoPackage(),
            new RNCameraPackage(),
                    new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
                    new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
                    new AppCenterReactNativePackage(MainApplication.this),
                    new ReactNativeOneSignalPackage(),
                    new RNDeviceInfo(),
                    new VectorIconsPackage(),
                    new LinearGradientPackage(),
                    new RNSpinkitPackage(),
                    new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
                    new LocationPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
