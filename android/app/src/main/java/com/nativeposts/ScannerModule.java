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

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.nexgo.oaf.apiv3.APIProxy;
import com.nexgo.oaf.apiv3.DeviceEngine;
import com.nexgo.oaf.apiv3.SdkResult;
import com.nexgo.oaf.apiv3.device.scanner.OnScannerListener;
import com.nexgo.oaf.apiv3.device.scanner.Scanner;
import com.nexgo.oaf.apiv3.device.scanner.ScannerCfgEntity;

public class ScannerModule extends ReactContextBaseJavaModule implements OnScannerListener {

    private static ReactApplicationContext reactContext;
    private DeviceEngine deviceEngine;
    private Scanner scanner;
    public final String TAG = "Scanner";
    private OnScannerListener listener;

    ScannerModule(ReactApplicationContext context){
         super(context);
         reactContext = context;
    }

    @Override
    public String getName() {
        return "ScannerModule";
    }

    /* @ReactMethod
    public void hwtStartScan(){
         Toast.makeText(getReactApplicationContext(), "Calling startScan(..)", Toast.LENGTH_LONG).show();
         scanner.startScan(60, ScannerModule.this);
    } */

    @ReactMethod
    public void hwtInitScan(){
        Toast.makeText(getReactApplicationContext(), "Konfiguracija skenera je dodata", Toast.LENGTH_LONG).show();
        deviceEngine = APIProxy.getDeviceEngine(getReactApplicationContext());
        scanner = deviceEngine.getScanner();

        final ScannerCfgEntity scannerConfigEntity = new ScannerCfgEntity();
        scannerConfigEntity.setAutoFocus(true);
        scannerConfigEntity.setUsedFrontCcd(false);
        scannerConfigEntity.setBulkMode(false);
        scannerConfigEntity.setInterval(1000);


        Toast.makeText(getReactApplicationContext(), "Skener se inicijalizuje.", Toast.LENGTH_LONG).show();
        scanner.initScanner(scannerConfigEntity, ScannerModule.this);
    }

    @ReactMethod
    @Override
    public void onInitResult(int resultCode) {
        Toast.makeText(getReactApplicationContext(), String.valueOf(resultCode), Toast.LENGTH_LONG).show();
        switch (resultCode) {
            case SdkResult.Success:
                Log.d(TAG, "Scanner Init Success");
                Toast.makeText(getReactApplicationContext(), "Scanner Init Success", Toast.LENGTH_LONG).show();
               // Toast.makeText(getReactApplicatik
                //Since the scanner was initialized successfuly, we can call the scanner.startScan(..) function to begin the 'scan'.
                Toast.makeText(getReactApplicationContext(), "Calling startScan(..)", Toast.LENGTH_LONG).show();
                scanner.startScan(60, ScannerModule.this);
            break;
            default:
                Log.e(TAG, "Scanner Failed to Init: " + resultCode);
            break;
        }
    }

    @Override
    public void onScannerResult(int resultCode, final String s) {
    Toast.makeText(getReactApplicationContext(), String.valueOf(resultCode), Toast.LENGTH_LONG).show();
        switch (resultCode) {
            case SdkResult.Success:
                Log.d(TAG, "Got Code: " + s);
                Toast.makeText(getReactApplicationContext(), "Scan Success", Toast.LENGTH_LONG).show();
                break;
            case SdkResult.Scanner_Customer_Exit:
                Log.d(TAG, "Requested Exit Scanner OK.");
                Toast.makeText(getReactApplicationContext(), "Requested Exit Scanner OK.", Toast.LENGTH_LONG).show();
                break;
            case SdkResult.Scanner_Other_Error:
                Log.e(TAG, "Got Scanner Error OtherError");
                Toast.makeText(getReactApplicationContext(), "Got Scanner Error OtherError", Toast.LENGTH_LONG).show();
                break;
            default:
                Log.e(TAG, "Got Scanner Error OtherError");
                Toast.makeText(getReactApplicationContext(), "Got Scanner Error OtherError", Toast.LENGTH_LONG).show();
            break;
        }
        scanner.stopScan();
    }

    @ReactMethod
    public int returnValue(int content){
       return content;
    }
}

