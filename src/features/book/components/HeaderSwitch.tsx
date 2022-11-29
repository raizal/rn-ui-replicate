import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {H2} from '@components/index';
import {styled} from 'nativewind';
import clsx from 'clsx';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomInEasyUp,
  ZoomOutEasyUp,
} from 'react-native-reanimated';
import {useBookAppointment} from '@features/book/stores';

const Container = styled(
  Animated.View,
  'flex mx-auto flex-row w-[80%] bg-brand-bg-input rounded-2xl',
);

const Button = styled(Pressable, 'flex-1 rounded-2xl items-center py-[10px]');

const ButtonBg = styled(
  Animated.View,
  'absolute w-[50%] h-full bg-white border-2 border-neutral-200 rounded-2xl',
);

const Text = styled(H2, 'text-brand-primary-500');

const HeaderSwitch = () => {
  const position = useSharedValue(0);
  const setBookType = useBookAppointment(state => state.setBookType);

  const [isDoctor, setIsDoctor] = useState(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginLeft: `${interpolate(position.value, [0, 1], [0, 50])}%`,
    };
  });

  const onPress = (active: boolean) => {
    position.value = withTiming(active ? 0 : 1, {
      duration: 300,
      easing: Easing.bounce,
    });
    setIsDoctor(active);
    setTimeout(() => setBookType(active ? 'doctor' : 'video'), 100);
  };

  return (
    <Container
      exiting={ZoomOutEasyUp.duration(100)}
      entering={ZoomInEasyUp.duration(100)}
      style={{
        elevation: 5,
      }}>
      <ButtonBg style={animatedStyle} />
      <Button onPress={() => onPress(true)}>
        <Text tw={clsx(!isDoctor && 'text-neutral-400 font-normal')}>
          Doctor
        </Text>
      </Button>
      <Button onPress={() => onPress(false)}>
        <Text tw={clsx(isDoctor && 'text-neutral-400 font-normal')}>
          Video Consult
        </Text>
      </Button>
    </Container>
  );
};

export default HeaderSwitch;
