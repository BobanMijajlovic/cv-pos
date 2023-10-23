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

import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Iterator;

import android.widget.Toast;
import android.content.res.AssetManager;
import android.graphics.Typeface;
import android.os.Bundle;
import android.util.Base64;

import com.nexgo.oaf.apiv3.APIProxy;
import com.nexgo.oaf.apiv3.DeviceEngine;
import com.nexgo.oaf.apiv3.SdkResult;
import com.nexgo.oaf.apiv3.device.printer.AlignEnum;
import com.nexgo.oaf.apiv3.device.printer.BarcodeFormatEnum;
import com.nexgo.oaf.apiv3.device.printer.OnPrintListener;
import com.nexgo.oaf.apiv3.device.printer.Printer;
import com.nexgo.oaf.apiv3.device.printer.LineOptionEntity;

//String
import java.nio.charset.StandardCharsets;

public class PrinterModule extends ReactContextBaseJavaModule implements OnPrintListener {

    private static ReactApplicationContext reactContext;
    private DeviceEngine deviceEngine;
    private Printer printer;
    private OnPrintListener listener;

    PrinterModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "PrinterModule";
    }

    @ReactMethod
    public void HwtInitPrinter(){
        deviceEngine = APIProxy.getDeviceEngine(getReactApplicationContext());
        printer = deviceEngine.getPrinter();

        printer.initPrinter();

        int initResult = printer.getStatus();
        switch (initResult){
               case SdkResult.Success:
                    Toast.makeText(getReactApplicationContext(), "Printer je spreman.", Toast.LENGTH_LONG).show();
               break;
               case SdkResult.Printer_PaperLack:
                    Toast.makeText(getReactApplicationContext(), "Ostali ste bez papira za štampanje!", Toast.LENGTH_LONG).show();
               break;
               default:
                    Toast.makeText(getReactApplicationContext(), "Printer nije spreman za štampanje!", Toast.LENGTH_LONG).show();
               break;
        }
    }

    @ReactMethod
    public void initFont(String fontName){
         AssetManager am = getReactApplicationContext().getAssets();
         Typeface smono = Typeface.createFromAsset(am, fontName);
         printer.setTypeface(smono);
    }

    @ReactMethod
    public void feedPaper(int feedInPixels){
        printer.feedPaper(feedInPixels);
    }

    @ReactMethod
    public void hwtPrintQRCode(String content, int width, int height, int version, String align){
        AlignEnum _align = stringToAlignEnum(align);
        printer.appendQRcode(content, width, height, version, _align);
    }

    @ReactMethod
    public void hwtPrintBarCode(String content, int height, int spacing, int textHeight, String BarcodeFormat ,String align){
        AlignEnum _align = stringToAlignEnum(align);
        BarcodeFormatEnum _format = stringToBarcodeFormatEnum(BarcodeFormat);
        printer.appendBarcode(content,
                        height,
                        spacing,
                        textHeight,
                        _format,
                        _align);
    }

    @ReactMethod
    public void hwtPrintLine(String str, int size, String align, Boolean isBolded){
        AlignEnum _align = stringToAlignEnum(align);
        String value = new String(str.getBytes(), StandardCharsets.UTF_8);
        printer.appendPrnStr(value, size, _align, isBolded);
    }

    @ReactMethod
    public void hwtPrintLines(ReadableArray strArray, int size, String align, Boolean isBolded){
        AlignEnum _align = stringToAlignEnum(align);
        for(int i = 0; i < strArray.size(); i++){
            String value = new String(strArray.getString(i).getBytes(), StandardCharsets.UTF_8);
            printer.appendPrnStr(value, size, _align, isBolded);
        }
    }

    @ReactMethod
    public void hwtPrintObject(ReadableMap obj) {
        int size = obj.getInt("size");
        /*String align = obj.getString("align");
        Boolean isBolded = obj.getBoolean("isBolded"); */
        ReadableArray strArray = obj.getArray("strings");
        for(int i = 0; i < strArray.size(); i++){
           String value = new String(strArray.getString(i).getBytes(), StandardCharsets.UTF_8);
           printer.appendPrnStr(value, size, AlignEnum.CENTER, false);
        }
    }

    @ReactMethod
    public void hwtStartPrint(){
        printer.startPrint(true, PrinterModule.this);
    }

    @ReactMethod
    @Override
    public void onPrintResult(int resultCode) {
        switch (resultCode){
            case SdkResult.Success:
                Toast.makeText(getReactApplicationContext(), "Printer job finished successfully!", Toast.LENGTH_LONG).show();
                break;
            case SdkResult.Printer_Print_Fail:
                Toast.makeText(getReactApplicationContext(), "Printer Failed: " + resultCode, Toast.LENGTH_LONG).show();
                break;
            case SdkResult.Printer_Busy:
                Toast.makeText(getReactApplicationContext(), "Printer is Busy: " + resultCode, Toast.LENGTH_LONG).show();
                break;
            case SdkResult.Printer_PaperLack:
                Toast.makeText(getReactApplicationContext(), "Printer is out of paper: " + resultCode, Toast.LENGTH_LONG).show();
                break;
            case SdkResult.Printer_Fault:
                Toast.makeText(getReactApplicationContext(), "Printer fault: " + resultCode, Toast.LENGTH_LONG).show();
                break;
            case SdkResult.Printer_TooHot:
                Toast.makeText(getReactApplicationContext(), "Printer temperature is too hot: " + resultCode, Toast.LENGTH_LONG).show();
                break;
            case SdkResult.Printer_UnFinished:
                Toast.makeText(getReactApplicationContext(), "Printer job is unfinished: " + resultCode, Toast.LENGTH_LONG).show();
                break;
            case SdkResult.Printer_Other_Error:
                Toast.makeText(getReactApplicationContext(), "Printer Other_Error: " + resultCode, Toast.LENGTH_LONG).show();
                break;
            default:
                Toast.makeText(getReactApplicationContext(), "Generic Fail Error: " + resultCode, Toast.LENGTH_LONG).show();
                break;
        }
    }

    public AlignEnum stringToAlignEnum (String value){
       switch(value){
          case "LEFT":
              return AlignEnum.LEFT;
          case  "RIGHT":
              return AlignEnum.RIGHT;
          default:
              return AlignEnum.CENTER;
       }
    }

    public BarcodeFormatEnum stringToBarcodeFormatEnum(String value){
        switch(value){
            case "AZTEC":
                return BarcodeFormatEnum.AZTEC;
            case "CODE_39":
                 return BarcodeFormatEnum.CODE_39;
            case  "CODE_93":
                 return BarcodeFormatEnum.CODE_93;
            case  "EAN_8":
                 return BarcodeFormatEnum.EAN_8;
            case "EAN_13":
                 return BarcodeFormatEnum.EAN_13;
            case  "ITF":
                 return BarcodeFormatEnum.ITF;
            case "MAXICODE":
                 return BarcodeFormatEnum.MAXICODE;
            case  "UPC_A":
                 return BarcodeFormatEnum.UPC_A;
            default:
                return BarcodeFormatEnum.CODE_128;
        }
    }

}
