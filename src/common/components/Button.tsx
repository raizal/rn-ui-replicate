import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';
import Animated, {ZoomOutEasyUp} from 'react-native-reanimated';
import {BodyText} from '@src/common/components';
import clsx from 'clsx';

interface ButtonTagProps {
  active?: boolean;
  text: string;
  initialState?: 'inactive' | 'active';
  onPress?: () => void;
}

const Touchable = styled(TouchableOpacity, 'rounded-xl bg-white ml-5');

const Container = styled(
  Animated.View,
  'flex flex-row rounded-2xl border border-1 bg-white border-neutral-100 py-3 px-4 items-center min-w-[120px] items-center justify-center',
);

const Text = styled(
  BodyText,
  'text-[18px] leading-5 text-neutral-500 text-center',
);

const ButtonTag = ({text, active, onPress}: ButtonTagProps) => {
  return (
    <Touchable
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        elevation: 6,
      }}>
      <Container
        exiting={ZoomOutEasyUp.duration(300)}
        tw={clsx(active && 'border-brand-primary-500')}>
        <Text>{text}</Text>
      </Container>
    </Touchable>
  );
};

export default ButtonTag;
