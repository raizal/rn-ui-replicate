import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';
import Animated, {ZoomOutEasyUp, ZoomInEasyUp} from 'react-native-reanimated';
import {BodyText} from '@components/index';
import Tick from '@icons/Tick.svg';
import Plus from '@icons/Plus.svg';
import clsx from 'clsx';

interface ButtonTagProps {
  active?: boolean;
  text: string;
  initialState?: 'inactive' | 'active';
  onPress?: () => void;
}

const Touchable = styled(TouchableOpacity, 'rounded-xl mb-3 ml-3');

const Container = styled(
  Animated.View,
  'flex flex-row bg-white rounded-xl border border-1 border-neutral-100 py-2 px-2 items-center',
);

const Text = styled(
  BodyText,
  'text-[16px] leading-5 text-brand-primary-400 font-medium text-center',
);
const IconPlus = styled(Plus, 'fill-brand-primary-400');
const IconTick = styled(Tick, 'fill-white');

const ButtonTag = ({text, active, onPress}: ButtonTagProps) => {
  return (
    <Touchable onPress={onPress} activeOpacity={0.9}>
      <Container
        exiting={ZoomOutEasyUp.duration(300)}
        entering={ZoomInEasyUp.duration(300).delay(300).randomDelay()}
        tw={clsx(
          active && 'bg-brand-primary-400 border-0',
          Platform.OS === 'ios' && 'shadow-sm',
        )}
        style={{
          elevation: 6,
        }}>
        <Text tw={clsx(active && 'text-white')}>{text}</Text>
        {!active && <IconPlus width={16} height={16} />}
        {active && <IconTick width={24} height={24} />}
      </Container>
    </Touchable>
  );
};

export default ButtonTag;
