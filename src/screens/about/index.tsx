import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NetworkInfo} from 'react-native-network-info';
import style from 'src/screens/about/style';
import {Translate} from 'src/translate/data';
import {useSelector} from 'react-redux';
import {_selectorApplicationAboutSoftware} from 'src/store/Application/helpers';

const About = () => {
  const [ip, setIp] = useState();
  const aboutSoftware = useSelector(_selectorApplicationAboutSoftware);

  useEffect(() => {
    NetworkInfo.getIPV4Address().then(ipv4Address => {
      // @ts-ignore
      setIp(ipv4Address);
    });
    console.log(ip);
  }, [NetworkInfo, setIp, ip]);

  return (
    <View style={style.aboutContainer}>
      <Text style={style.aboutHeader}>
        {Translate.TR_SETTINGS_TAB_ABOUT_SOFTWARE_PART_HEADER}
      </Text>
      <View style={style.aboutRow}>
        <Text style={style.aboutHelpText}>
          {Translate.TR_SETTINGS_TAB_ABOUT_MANUFACTURER_LABEL}
        </Text>
        <Text style={style.aboutText}>
          {aboutSoftware && aboutSoftware.manufacturer}
        </Text>
      </View>
      <View style={style.aboutRow}>
        <Text style={style.aboutHelpText}>
          {Translate.TR_SETTINGS_TAB_ABOUT_SERIAL_NUMBER_LABEL}
        </Text>
        <Text style={style.aboutText}>
          {aboutSoftware && aboutSoftware.serialNumber}
        </Text>
      </View>
      <View style={style.aboutRow}>
        <Text style={style.aboutHelpText}>
          {Translate.TR_SETTINGS_TAB_ABOUT_SOFTWARE_VERSION_LABEL}
        </Text>
        <Text style={style.aboutText}>
          {aboutSoftware && aboutSoftware.softwareVersion}
        </Text>
      </View>
      <Text style={style.aboutHeader}>
        {Translate.TR_SETTINGS_TAB_ABOUT_HARDWARE_PART_HEADER}
      </Text>
      <View style={style.aboutRow}>
        <Text style={style.aboutHelpText}>
          {Translate.TR_SETTINGS_TAB_ABOUT_IP_ADDRESS_LABEL}
        </Text>
        <Text style={style.aboutText}>{ip}</Text>
      </View>
    </View>
  );
};

export default About;
