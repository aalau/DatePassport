import React, { useRef } from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';

export default function BigButton(props) {
  const { onPress, title = 'Save' } = props;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.9, // Shrink slightly when pressed
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1, // Return to original size after release
        friction: 4, // Adjust springiness
        tension: 100,
        useNativeDriver: true,
      }).start();
  };

  return (
    <Pressable style={styles.button} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.button, {transform: [{ scale: scaleAnim }]}]}>
            <Text style={styles.text}>{title}</Text>
        </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: 'tan',
  },
  text: {
    fontSize: 60,
    lineHeight: 64,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});


