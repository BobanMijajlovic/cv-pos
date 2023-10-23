import React from 'react';
import {View} from 'react-native';
import style from 'src/screens/journalPreview/style';
import JournalPreviewHeader from 'src/screens/journalPreview/JournalPreviewHeader';
import JournalPreviewContextContainer from 'src/screens/journalPreview/context';

const JournalPreview = () => {
  return (
    <JournalPreviewContextContainer>
      <View style={style.container}>
        <JournalPreviewHeader />
      </View>
    </JournalPreviewContextContainer>
  );
};

export default JournalPreview;
