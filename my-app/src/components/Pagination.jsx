import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constant/color';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={[
          styles.paginationButton,
          currentPage === 1 && styles.disabledButton,
        ]}
      >
        <Text style={styles.paginationButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.paginationText}> {currentPage} / {totalPages}</Text>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={[
          styles.paginationButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
      >
        <Text style={styles.paginationButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  paginationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: colors.gray,
  },
  paginationButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  paginationText: {
    fontSize: 16,
    color: colors.gray,
    marginHorizontal: 16,
  },
});

export default Pagination;