import React from 'react';
import {BodyText, Flex} from '@src/common/components';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import clsx from 'clsx';
import Button from '@components/Button';
import {styled} from 'nativewind';
import Plus from '@icons/Plus.svg';
import {useBookAppointment} from '@features/book/stores';

const Touchable = styled(
  TouchableOpacity,
  'flex items-center w-full h-full justify-center',
);
const DashedContainer = styled(
  Animated.View,
  'absolute top-[6px] bottom-[6px] left-[16px] overflow-hidden pt-1 pb-1.5 px-1.5',
);

const ButtonContainer = styled(
  Animated.View,
  'w-[100px] bg-white overflow-hidden',
);

const List = styled(Animated.FlatList<string>);
const Text = styled(
  Animated.Text,
  'text-[18px] leading-5 text-neutral-500 text-center',
);

const PlusIconContainer = styled(
  Animated.View,
  'absolute bottom-[-16] left-[-16]',
);
const PlusIcon = styled(Plus, 'fill-neutral-300');

const SCROLL_RANGE = 60;

interface SymptomSectionProps {
  classNames?: string;
}

const SymptomSection = ({classNames}: SymptomSectionProps) => {
  const patients = useBookAppointment(state => state.patients);
  const selectedPatients = useBookAppointment(state => state.selectedPatients);
  const onSelect = useBookAppointment(
    state => state.addOrRemoveSelectedPatient,
  );

  const prevX = useSharedValue(0);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const diff = event.contentOffset.x - prevX.value;
      scrollX.value = withTiming(
        Math.min(Math.max(0, scrollX.value + diff), 70),
        {
          duration: 300,
        },
      );
    },
    onBeginDrag: event => {
      prevX.value = event.contentOffset.x;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const buttonWidth = interpolate(
      scrollX.value,
      [0, SCROLL_RANGE],
      [100, 50],
      Extrapolation.CLAMP,
    );

    return {
      width: buttonWidth,
    };
  });

  const animatedBorderRadiusStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      scrollX.value,
      [0, SCROLL_RANGE],
      [8, 500],
      Extrapolation.CLAMP,
    );
    return {
      borderRadius,
    };
  });

  const plusIconAnimatedStyle = useAnimatedStyle(() => {
    const bottom = interpolate(
      scrollX.value,
      [0, SCROLL_RANGE],
      [-16, -6],
      Extrapolation.CLAMP,
    );
    const left = interpolate(
      scrollX.value,
      [0, SCROLL_RANGE],
      [-16, -3],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      scrollX.value,
      [0, SCROLL_RANGE],
      [1, 0.7],
      Extrapolation.CLAMP,
    );

    return {
      bottom,
      left,
      scaleX: scale,
      scaleY: scale,
    };
  });

  const textOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [0, SCROLL_RANGE],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  });

  return (
    <Flex tw={clsx(classNames)}>
      <BodyText tw="ml-4 mt-4 mb-2 tracking-wide text-neutral-500 text-[16px]">
        Choose Patient:
      </BodyText>
      <Flex tw="py-1 min-h-[69px]">
        <List
          tw={'flex-wrap flex-row pr-4 pl-2'}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Button
              text={item}
              active={selectedPatients?.indexOf(item) >= 0}
              onPress={() => onSelect(item)}
            />
          )}
          contentContainerStyle={{
            paddingVertical: 6,
            paddingRight: 32,
            paddingLeft: 112,
          }}
          data={patients}
        />
        <DashedContainer style={[styles.dashed, animatedBorderRadiusStyle]}>
          <ButtonContainer
            tw={clsx(Platform.OS === 'ios' && 'shadow-sm')}
            style={[{elevation: 6}, animatedStyle, animatedBorderRadiusStyle]}>
            <Touchable activeOpacity={0.85}>
              <Text style={textOpacity}>Add</Text>
              <PlusIconContainer style={plusIconAnimatedStyle}>
                <PlusIcon width={56} height={56} />
              </PlusIconContainer>
            </Touchable>
          </ButtonContainer>
        </DashedContainer>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  dashed: {
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#30C2D0',
  },
});

export default SymptomSection;
