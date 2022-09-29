import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import style from './style';
import {Translate} from 'src/translate/data';
import {useDispatch, useSelector} from 'react-redux';
import {
  _selectorReceiptAdvanceOption,
  _selectorReceiptBuyer,
  _selectorReceiptBuyerOptional,
  _selectorReceiptGetRefundProps,
  _selectorReceiptInvoiceType,
  _selectorReceiptTransactionType,
  _selectorReceiptTypeString,
} from 'src/store/Receipt/helpers';
import {Colors} from 'src/constants/Colors';
import useValidation from 'src/hooks/validation/useValidation';
import {TReceiptSettings} from 'src/screens/receipt/receiptForm/d';
import Button from 'src/components/button';
import {ButtonFill} from 'src/components/button/d';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {iconReceipt} from 'src/icon';
import {
  ReceiptBuyerInfo,
  ReceiptBuyerInfoAdditional,
} from 'src/constants/ReceiptTypes';
import BuyerInfo from 'src/screens/receipt/receiptForm/BuyerInfo';
import RefundPart from 'src/screens/receipt/receiptForm/RefundPart';
import AdvancePart from 'src/screens/receipt/receiptForm/AdvancePart';
import {checkRequired} from 'src/hooks/validation/validators';
import {
  TAdvanceProps,
  TBuyerInfo,
  TBuyerInfoData,
  TRefundProps,
} from 'src/store/Receipt/d';
import {
  _actionReceiptSetAdvanceProps,
  _actionReceiptSetBuyer,
  _actionReceiptSetRefundProps,
} from 'src/store/Receipt/action';
import ScrollViewContainer from 'src/components/scrollView';
import {TInvoiceType, TTransactionType} from 'src/store/lpfr/d';
import {_selectorClientGetSelected} from 'src/store/Client/helpers';

type TRefRest = {
  isAdvancePartUsed?: boolean;
  isBuyerAdvanceOption?: boolean;
  isRefundProcess?: boolean;
};

const ReceiptForm = () => {
  const {goBack} = useNavigation();
  const receiptTypeStr = useSelector(_selectorReceiptTypeString);

  const invoiceType = useSelector(_selectorReceiptInvoiceType);
  const transactionType = useSelector(_selectorReceiptTransactionType);
  const buyerStoreAdditional = useSelector(_selectorReceiptBuyerOptional);
  const buyerStore = useSelector(_selectorReceiptBuyer);
  const refundStore = useSelector(_selectorReceiptGetRefundProps);
  const advanceStore = useSelector(_selectorReceiptAdvanceOption);
  const clientStore = useSelector(_selectorClientGetSelected);

  const dispatch = useDispatch();

  const [isRefundProcess, isAdvancePartRender] = useMemo(() => {
    const isRef =
      transactionType === TTransactionType.Refund ||
      invoiceType === TInvoiceType.Copy;
    const isAdvance =
      invoiceType === TInvoiceType.Normal &&
      transactionType === TTransactionType.Sale;
    return [isRef, isAdvance];
  }, [transactionType, invoiceType]);

  const [isAdvancePartUsed, setAdvancePartUsed] = useState(
    isAdvancePartRender && !!advanceStore?.advanceReceipt,
  );
  const [isBuyerAdvanceOption, setBuyerAdvanceOption] = useState(
    !!buyerStoreAdditional?.type,
  );

  const toggleUsedAdvancePart = useCallback(() => {
    setAdvancePartUsed(v => !v);
  }, [setAdvancePartUsed]);

  const toggleUsedBuyerAdvanceOptions = useCallback(() => {
    setBuyerAdvanceOption(v => !v);
  }, [setBuyerAdvanceOption]);

  const refRestData = useRef<TRefRest>({});

  refRestData.current = {
    isAdvancePartUsed,
    isBuyerAdvanceOption,
    isRefundProcess,
  };

  const refBuyerInfoTypeSelectedFull = useRef<any>();

  const validationBuyerInfoData = useCallback(
    (value: string) => {
      return refBuyerInfoTypeSelectedFull.current?.validation?.(value);
    },
    [refBuyerInfoTypeSelectedFull],
  );

  const refBuyerInfoTypeAdditionalSelectedFull = useRef<any>();
  const validationBuyerInfoDataAdditional = useCallback(
    (value: string) => {
      if (!refRestData.current.isBuyerAdvanceOption) {
        return false;
      }
      return refBuyerInfoTypeAdditionalSelectedFull.current?.validation?.(
        value,
      );
    },
    [refBuyerInfoTypeAdditionalSelectedFull, refRestData],
  );

  const validationInputReceipt = useCallback(
    (value: string) => {
      if (!refRestData.current.isRefundProcess) {
        return false;
      }
      if (!value || value.trim().length < 3) {
        return Translate.TR_VALIDATION_RECEIPT_NUM_NOT_VALID;
      }
      return false;
    },
    [refRestData],
  );

  const validationInputReceiptAdvancePart = useCallback(
    (value: string) => {
      if (!refRestData.current.isAdvancePartUsed) {
        return false;
      }
      if (!value || value.trim().length < 3) {
        return Translate.TR_VALIDATION_RECEIPT_NUM_NOT_VALID;
      }
      return false;
    },
    [refRestData],
  );

  const validationInputReceiptAdvanceFinance = useCallback(
    (value: string) => {
      if (!refRestData.current.isAdvancePartUsed) {
        return false;
      }
      if (!value) {
        return Translate.TR_VALIDATION_RECEIPT_NUM_NOT_VALID;
      }
      return;
    },
    [refRestData],
  );

  const checkTypeAdditional = useCallback(
    (value: string) => {
      if (!refRestData.current.isBuyerAdvanceOption) {
        return false;
      }
      return checkRequired(value);
    },
    [refRestData],
  );

  const validation = useValidation<TReceiptSettings>(
    {
      buyerInfoType: buyerStore?.type || ReceiptBuyerInfo[0].value,
      buyerInfoData: (buyerStore?.value || '') as string,
      buyerInfoTypeAdditional: (buyerStoreAdditional?.type || '') as string,
      buyerInfoDataAdditional: (buyerStoreAdditional?.value || '') as string,
      refundReceiptNumber: (refundStore?.referentReceipt || '') as string,
      refundReceiptDate: new Date().toISOString(),
      advanceReceiptNumber: (advanceStore?.advanceReceipt || '') as string,
      advanceReceiptFinance: (advanceStore?.advanceFinance || '') as string,
    },
    {
      buyerInfoType: checkRequired,
      buyerInfoTypeAdditional: checkTypeAdditional,
      buyerInfoData: validationBuyerInfoData,
      buyerInfoDataAdditional: validationBuyerInfoDataAdditional,
      refundReceiptNumber: validationInputReceipt,
      advanceReceiptNumber: validationInputReceiptAdvancePart,
      advanceReceiptFinance: validationInputReceiptAdvanceFinance,
    },
  );

  const {submit, fields, resetValueField} = validation;

  const {buyerInfoType, buyerInfoTypeAdditional} = fields;
  const {value: buyerInfoTypeValue} = buyerInfoType;
  const {value: buyerInfoTypeAdditionalValue} = buyerInfoTypeAdditional;

  const handlerOnSubmit = useCallback(async () => {
    const data = await submit();
    if (!data) {
      return;
    }

    let buyer = {
      buyerInfoBasic: {
        type: data.buyerInfoType.value,
        value: data.buyerInfoData.value,
      },
      buyerInfoAdditional: {} as TBuyerInfoData,
    } as TBuyerInfo;
    if (refRestData.current.isBuyerAdvanceOption) {
      buyer = {
        ...buyer,
        buyerInfoAdditional: {
          type: data.buyerInfoTypeAdditional.value,
          value: data.buyerInfoDataAdditional.value,
        } as TBuyerInfoData,
      } as TBuyerInfo;
    }
    dispatch(_actionReceiptSetBuyer(buyer));

    if (refRestData.current.isRefundProcess) {
      const refund = {
        referentReceipt: data.refundReceiptNumber.value,
        dateTime: data.refundReceiptDate.value,
      } as TRefundProps;
      dispatch(_actionReceiptSetRefundProps(refund));
    } else {
      dispatch(_actionReceiptSetRefundProps({} as TRefundProps));
    }

    if (refRestData.current.isAdvancePartUsed) {
      const adv = {
        advanceReceipt: data.advanceReceiptNumber.value,
        advanceFinance: data.advanceReceiptFinance.value,
      } as TAdvanceProps;

      dispatch(_actionReceiptSetAdvanceProps(adv));
    } else {
      dispatch(_actionReceiptSetAdvanceProps({} as TAdvanceProps));
    }

    goBack();
  }, [submit, refRestData, dispatch, goBack]);

  const handlerClose = useCallback(() => {
    /** reset store state */
    goBack();
  }, [goBack]);

  const selectedBuyerInfoType = useMemo(
    () => ReceiptBuyerInfo.find(x => x.value === buyerInfoTypeValue),
    [buyerInfoTypeValue],
  );
  refBuyerInfoTypeSelectedFull.current = selectedBuyerInfoType;

  const selectedBuyerInfoTypeAdditional = useMemo(
    () =>
      ReceiptBuyerInfoAdditional.find(
        x => x.value === buyerInfoTypeAdditionalValue,
      ),
    [buyerInfoTypeAdditionalValue],
  );
  refBuyerInfoTypeAdditionalSelectedFull.current =
    selectedBuyerInfoTypeAdditional;

  useEffect(() => {
    if (
      !clientStore ||
      !clientStore.tin ||
      buyerInfoTypeValue !== ReceiptBuyerInfo[0].value
    ) {
      return;
    }
    resetValueField(clientStore.tin, 'buyerInfoData');
  }, [buyerInfoTypeValue, clientStore]);

  return (
    <ScrollViewContainer>
      <FontAwesome5Icon
        name={iconReceipt}
        style={style.receiptInfoDefinitionBackgroundIcon}
      />
      <View style={style.receiptTypeHeaderContainer}>
        <Text style={style.receiptTypeHeaderText}>
          {Translate.TR_RECEIPT_INFO_RECEIPT_TYPE}
        </Text>
        <Text>{receiptTypeStr}</Text>
      </View>

      <View
        style={[
          style.bodyDataPart,
          (isAdvancePartRender || isRefundProcess) && {paddingTop: 40},
        ]}>
        {isRefundProcess && <RefundPart validation={validation} />}

        <BuyerInfo validation={validation} />

        <BuyerInfo
          isAdditional={true}
          validation={validation}
          isUsed={isBuyerAdvanceOption}
          toggleUsed={toggleUsedBuyerAdvanceOptions}
        />

        {isAdvancePartRender && (
          <AdvancePart
            validation={validation}
            toggleUsed={toggleUsedAdvancePart}
            isUsed={isAdvancePartUsed}
          />
        )}
      </View>

      <View style={style.buttonsRow}>
        <View>
          <Button
            upperCase
            title={Translate.TR_SUBMIT_MODAL}
            onPress={handlerOnSubmit}
            fill={ButtonFill.OUTLINE}
            color={Colors.PALETTE.BLUE._700}
          />
        </View>
        <View>
          <Button
            upperCase
            title={Translate.TR_HIDE_MODAL}
            fill={ButtonFill.OUTLINE}
            onPress={handlerClose}
            color={Colors.PALETTE.RED._400}
          />
        </View>
      </View>
    </ScrollViewContainer>
  );
};

const Form = () => {
  return <ReceiptForm />;
};

export default Form;
