package com.nativeposts;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import com.nexgo.oaf.apiv3.APIProxy;
import com.nexgo.oaf.apiv3.DeviceEngine;
import com.nexgo.oaf.apiv3.device.led.LEDDriver;
import com.nexgo.oaf.apiv3.device.led.LightModeEnum;

public class LEDModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;
    private DeviceEngine deviceEngine;
    private LEDDriver ledDriver;

    private boolean isRedOn = false;
    private boolean isBlueOn = false;
    private boolean isYellowOn = false;
    private boolean isGreenOn = false;

    LEDModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    @Override
    public String getName(){
        return "LEDModule";
    }

    @ReactMethod
    public void initLED(){
        deviceEngine = APIProxy.getDeviceEngine(getReactApplicationContext());
        ledDriver = deviceEngine.getLEDDriver();

        ledDriver.setLed(LightModeEnum.RED, false);
        ledDriver.setLed(LightModeEnum.BLUE, false);
        ledDriver.setLed(LightModeEnum.GREEN, false);
        ledDriver.setLed(LightModeEnum.YELLOW, false);
    }

    @ReactMethod
    public void setLED(String color, boolean start){

        switch(color){
            case "RED":
                if(isRedOn){
                    ledDriver.setLed(LightModeEnum.RED, false);
                    isRedOn = false;
                }else {
                    ledDriver.setLed(LightModeEnum.RED, true);
                    isRedOn = true;
                }
            break;
            case "BLUE":
                 if(isBlueOn){
                      ledDriver.setLed(LightModeEnum.BLUE, false);
                      isBlueOn = false;
                 }else {
                       ledDriver.setLed(LightModeEnum.BLUE, true);
                       isBlueOn = true;
                       }
            break;
            case "YELLOW":
                 if(isYellowOn){
                        ledDriver.setLed(LightModeEnum.YELLOW, false);
                        isYellowOn = false;
                        }
                 else {
                        ledDriver.setLed(LightModeEnum.YELLOW, true);
                        isYellowOn = true;
                       }
            break;
            case "GREEN":
                 if(isGreenOn){
                        ledDriver.setLed(LightModeEnum.GREEN, false);
                        isGreenOn = false;
                 }else {
                         ledDriver.setLed(LightModeEnum.GREEN, true);
                         isGreenOn = true;
                        }
            break;
        }
    }
}
