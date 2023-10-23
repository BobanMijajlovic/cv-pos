import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {TClientModel} from 'src/database/d';
import style from 'src/screens/clientListItem/style';
import {ClientsDefinitionNavName} from 'src/navigation/d';
import {useNavigation} from '@react-navigation/native';
import {Translate} from 'src/translate/data';
import EmptyTag from 'src/components/emptyTag';
import ComponentRender from 'src/components/componentRender';

const ClientListItem = (client: {index: number} & TClientModel) => {
  const {id, index} = client;
  const {navigate} = useNavigation();
  const handlerOnEdit = useCallback(() => {
    id &&
      navigate(ClientsDefinitionNavName, {
        id: Number(id),
      });
  }, [id, navigate]);

  return (
    <TouchableHighlight onPress={handlerOnEdit}>
      <View style={[style.root, index % 2 !== 0 && style.itemOdd]}>
        <View style={style.contentContainer}>
          <EmptyTag
            model={client}
            field={'name'}
            rootStyle={style.nameContainer}
            textStyle={style.nameLabel}
            placeholder={'###'}
          />
          <View style={style.dataContainer}>
            <ComponentRender
              fullWidth={false}
              label={Translate.TR_RECEIPT_INFO_TIN_LABEL}
              value={
                <EmptyTag
                  model={client}
                  field={'tin'}
                  textStyle={style.pibAndMbText}
                  placeholder={'#######'}
                />
              }
            />
            <ComponentRender
              fullWidth={false}
              label={Translate.TR_RECEIPT_INFO_UNIQUE_COMPANY_NUMBER_LABEL}
              value={
                <EmptyTag
                  model={client}
                  field={'uniqueCompanyNumber'}
                  textStyle={style.pibAndMbText}
                  placeholder={'########'}
                />
              }
            />
          </View>
          <ComponentRender
            fullWidth={false}
            label={'Address'}
            value={
              <EmptyTag
                model={client}
                field={'street'}
                placeholder={'##########'}
                textStyle={style.addressText}
              />
            }
          />
          <ComponentRender
            fullWidth={false}
            label={'City , Zip code'}
            value={
              <View style={style.viewRow}>
                <EmptyTag
                  model={client}
                  field={'city'}
                  placeholder={'######'}
                  textStyle={style.addressText}
                />
                <Text> , </Text>
                <EmptyTag
                  model={client}
                  field={'zipCode'}
                  placeholder={'#####'}
                  textStyle={style.addressText}
                />
              </View>
            }
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ClientListItem;
