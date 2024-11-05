import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from "../constant/color";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.appName}>LEGO VN</Text>
      <Text style={styles.version}>Phiên bản 1.0.0</Text>
      <Text style={styles.copyright}>© 2024 LEGO VN. Tất cả các quyền được bảo lưu.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  backgroundColor: '#5B41FF'
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  version: {
    fontSize: 12,
    color: colors.white,
    marginTop: 2,
  },
  copyright: {
    fontSize: 10,
    color: colors.white,
    marginTop: 2,
  },
});

export default Footer;
