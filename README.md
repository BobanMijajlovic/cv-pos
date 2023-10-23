

# How to install Sunmi printer in React Native Application ( Android )

###  Step 1:

#### `npm install react-native-sunmi-inner-printer --save`

###  Step 2: 

#### `react-native link react-native-sunmi-inner-printer`


Check android/settings.gradle file for the following code:
####`include ':react-native-sunmi-inner-printer'`
#### `project(':react-native-sunmi-inner-printer').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-sunmi-inner-printer/android')`

### Step 3:

Go to android/app/build.gradle file, and add into android object:

`dexOptions{
javaMaxHeapSize "4g"
}
`
This is JV memory increase.

### Step 4:

Go to android/gradle.properties file and add: 

`org.gradle.jvmargs=-Xmx4096M`

This is JV memory increase.

### Step 5: 

If there is a script written in package.json to run android do: 

`npm run android `

or do the following code :

`react-native run-android --deviceId='<device-ID>'`

If you don't have device id, to see devices on your computer run next command:

`adb devices`

# How to build production apk 

### Step 1: Generating an upload key

`sudo keytool -genkey -v -keystore hwtPos.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`

### Step 2:  Setting up Gradle variables

1. Place the my-upload-key.keystore file under the android/app directory in your project folder.
2. Edit the file ~/.gradle/gradle.properties or android/gradle.properties, and add the following (replace ***** with the correct keystore password, alias and key password),


MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore

MYAPP_UPLOAD_KEY_ALIAS=my-key-alias

MYAPP_UPLOAD_STORE_PASSWORD=*****

MYAPP_UPLOAD_KEY_PASSWORD=*****

### Step 3: Adding signing config to your app's Gradle config
The last configuration step that needs to be done is to setup release builds to be signed using upload key. Edit the file android/app/build.gradle in your project folder, and add the signing config,

``android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}``

### Step 4: Generating the release AAB

Run the following in a terminal:

`cd android && ./gradlew assembleRelease`
`cd android && ./gradlew bundleRelease`

The generated AAB can be found under android/app/build/outputs/bundle/release/app.aab, and is ready to be uploaded to Google Play.



# Testing the release build of your app

Before uploading the release build to the Play Store, make sure you test it thoroughly. First uninstall any previous version of the app you already have installed. Install it on the device using the following command in the project root:

`npx react-native run-android --variant=release`

Note that --variant release is only available if you've set up signing as described above.

You can terminate any running bundler instances, since all your framework and JavaScript code is bundled in the APK's assets.
