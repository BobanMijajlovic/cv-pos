import React, {useCallback, useContext, useMemo} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  _selectorReceipt,
  _selectorReceiptTotalByReceipt,
} from 'src/store/Receipt/helpers';
import style from 'src/screens/receiptPaying/style';
import {Translate} from 'src/translate/data';
import {formatPrice, toNumberFixed} from 'src/util/utils';
import {PayingContext} from 'src/screens/receiptPaying/context';
import {ButtonFill} from 'src/components/button/d';
import {Colors} from 'src/constants/Colors';
import Button from 'src/components/button';
import {useReceipt} from 'src/hooks/receipt/useReceipt';
import ComponentRender from 'src/components/componentRender';
import {
  AdvanceInfo,
  ClientInfo,
  OptionalDataInfo,
  RefundInfo,
} from 'src/screens/receipt/ReceiptInfo';
import {useNavigation} from '@react-navigation/native';
import {ReceiptNavName} from 'src/navigation/d';

const FinishReceipt = () => {
  const {
    canFinish,
    handlerAdvance,
    isAdvanceReceipt,
    change,
    receiptTotal,
    financePayed,
  } = useContext(PayingContext);
  const {finishReceipt, resetPaying} = useReceipt();
  const {goBack, navigate} = useNavigation();

  const receipt = useSelector(_selectorReceipt);
  const totalWithoutAdvance = useSelector(_selectorReceiptTotalByReceipt);
  const [isAdvanceOption, isRefundReceipt, _advanceFinance] = useMemo(() => {
    return [
      !!receipt.advanceProps?.advanceReceipt,
      !!receipt.refundProps?.referentReceipt,
      receipt.advanceProps?.advanceFinance || '0',
    ];
  }, [receipt]);

  const [total, totalPay, balance, advanceFinance] = useMemo(
    () => [
      receiptTotal,
      financePayed,
      change || 0,
      toNumberFixed(_advanceFinance),
    ],
    [receiptTotal, financePayed, change, _advanceFinance],
  );

  const handlerFinishReceipt = useCallback(() => {
    canFinish && finishReceipt();
    navigate(ReceiptNavName);
  }, [navigate, finishReceipt, canFinish]);

  const handlerCancel = useCallback(() => {
    resetPaying();
    handlerAdvance(false);
    goBack();
  }, [handlerAdvance, goBack, resetPaying]);

  return (
    <View style={style.finishReceiptContainer}>
      <View style={[style.finishReceiptClientContainer]}>
        <ClientInfo />
        <OptionalDataInfo />
        {isRefundReceipt && <RefundInfo />}
        {isAdvanceOption && <AdvanceInfo />}
        <View style={style.finishReceiptRow}>
          <ComponentRender
            label={Translate.TR_FINISH_RECEIPT_PAYING_TOTAL_LABEL}
            labelStyle={style.finishReceiptHeaderHelpText}
            value={formatPrice(totalWithoutAdvance)}
            valueStyle={style.finishReceiptHeaderText}
          />
        </View>
        <View style={style.finishReceiptRow}>
          <ComponentRender
            label={Translate.TR_FINISH_RECEIPT_PAYING_PAYED_LABEL}
            labelStyle={style.finishReceiptHeaderHelpText}
            value={formatPrice(totalPay)}
            valueStyle={style.finishReceiptHeaderText}
          />
        </View>
        {isAdvanceReceipt && (
          <View style={style.finishReceiptRow}>
            <ComponentRender
              label={Translate.TR_FINISH_RECEIPT_PAYING_ADVANCE_LABEL}
              labelStyle={style.finishReceiptHeaderHelpText}
              value={formatPrice(advanceFinance)}
              valueStyle={style.finishReceiptHeaderText}
            />
          </View>
        )}
        <View style={style.finishReceiptRow}>
          <ComponentRender
            label={Translate.TR_FINISH_RECEIPT_PAYING_CHANGE_LABEL}
            labelStyle={style.finishReceiptHeaderHelpText}
            value={formatPrice(balance)}
            valueStyle={style.finishReceiptHeaderText}
          />
        </View>
      </View>
      {/*  <View style={style.finishReceiptIconRoot}>
        <FontAwesome5Icon
          name={iconFontAwesomePrint}
          style={style.finishReceiptIcon}
        />
      </View>*/}
      <View style={style.receiptFooterRow}>
        <Button
          onPress={handlerFinishReceipt}
          upperCase
          title={Translate.TR_FINISH_RECEIPT_LABEL_BUTTON_SUBMIT}
          fill={ButtonFill.OUTLINE}
          color={Colors.PALETTE.BLUE._700}
          titleStyle={style.buttonTitle}
          rootStyle={style.submitButtonRoot}
          disabled={!canFinish}
        />
        <Button
          onPress={handlerCancel}
          upperCase
          title={Translate.TR_FINISH_RECEIPT_LABEL_BUTTON_CANCEL}
          fill={ButtonFill.OUTLINE}
          color={Colors.PALETTE.RED._800}
          titleStyle={style.buttonTitle}
          rootStyle={style.cancelButtonRoot}
          //disabled={buttonSubmitDisabled}
        />
      </View>
    </View>
  );
};

export default FinishReceipt;
