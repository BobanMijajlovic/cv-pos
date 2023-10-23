import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TClientItemType} from 'src/screens/clientSearch/d';
import {useNavigation} from '@react-navigation/native';
import style from './style';
import {useReceipt} from 'src/hooks/receipt/useReceipt';
import {Translate} from 'src/translate/data';

const ClientSearchItem = ({
  client,
  index,
}: {
  index: number;
  client: TClientItemType;
}) => {
  const {name, tin, uniqueCompanyNumber, city, street, zipCode} = client;
  const {goBack} = useNavigation();
  const {setClient} = useReceipt();
  /** redux funkcija za biranje */

  const handlerSetClient = useCallback(() => {
    if (client && client.id) {
      setClient(client);
      goBack();
    }
  }, [client, goBack, setClient]);

  return (
    <View>
      <TouchableOpacity onPress={handlerSetClient}>
        <View style={[style.itemRoot, index % 2 !== 0 && style.itemOdd]}>
          <View style={style.contentContainer}>
            <View style={style.nameContainer}>
              <Text style={style.nameLabel}>{name}</Text>
            </View>
            <View style={style.dataContainer}>
              <Text style={style.pibAndMbText}>
                {`${Translate.TR_RECEIPT_INFO_TIN_LABEL} ${tin}`}
              </Text>
              <Text style={style.pibAndMbText}>
                {uniqueCompanyNumber &&
                  `${Translate.TR_RECEIPT_INFO_UNIQUE_COMPANY_NUMBER_LABEL} ${uniqueCompanyNumber}`}
              </Text>
            </View>
            <View style={style.addressContainer}>
              <Text style={style.addressText}>
                {`${city && city} ${street && street}`}
              </Text>
              <Text style={style.addressText}>
                {zipCode &&
                  `${Translate.TR_RECEIPT_INFO_ZIP_CODE_LABEL} ${zipCode}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ClientSearchItem;
