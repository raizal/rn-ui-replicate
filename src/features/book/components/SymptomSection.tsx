import React from 'react';
import {BodyText, Flex} from '@src/common/components';
import ButtonTag from '@components/ButtonTag';
import clsx from 'clsx';
import Animated, {ZoomInEasyUp, ZoomOutEasyUp} from 'react-native-reanimated';
import {styled} from 'nativewind';

const Container = styled(Animated.View, 'flex flex-col');

interface SymptomSectionProps {
  title: string;
  items: string[];
  onSelect: (selected: string) => void;
  classNames?: string;
  variant?: 'active' | 'inactive';
}

const SymptomSection = ({
  items,
  title,
  onSelect,
  classNames,
  variant = 'inactive',
}: SymptomSectionProps) => {
  return (
    <Container
      exiting={ZoomOutEasyUp.duration(100)}
      entering={ZoomInEasyUp.duration(100)}
      tw={clsx('min-h-[96px]', classNames)}>
      <BodyText tw="ml-4 mt-4 mb-4 tracking-wide text-neutral-500 text-[16px]">
        {title}
      </BodyText>
      <Flex tw={'flex-wrap flex-row pr-4 pl-1'}>
        {items.map((item, index) => (
          <ButtonTag
            active={variant === 'active'}
            onPress={() => onSelect(item)}
            key={`selected-item-${index}`}
            text={item}
          />
        ))}
      </Flex>
    </Container>
  );
};

export default SymptomSection;
