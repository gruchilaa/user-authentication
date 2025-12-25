import { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingModal = forwardRef((_, ref) => {
  const [loading, setLoading] = useState<boolean>(false);
  const styles = createStyles();

  useImperativeHandle(ref, () => ({
    show: () => {
      setLoading(true);
    },
    hide: () => {
      setLoading(false);
    },
  }));

  if (!loading) {
    return null;
  }

  return (
    <View style={styles.loader}>
      <ActivityIndicator size={'large'} />
    </View>
  );
});

export default LoadingModal;

const createStyles = () => {
  return StyleSheet.create({
    loader: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      position: 'absolute',
      zIndex: 10,
    },
  });
};
