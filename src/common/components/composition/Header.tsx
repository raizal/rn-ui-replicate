import { Flex, H2 } from "@components/index";
import React from 'react';
import {styled} from 'nativewind';
import Stethoscope from '@icons/Stethoscope.svg';
import ArrowBack from '@icons/ArrowBack.svg';

const IconStethoscope = styled(Stethoscope, 'fill-brand-primary-500');
const IconArrowBack = styled(ArrowBack, 'color-brand-primary-500');

const Header = () => {
  return (
    <Flex tw="flex flex-row items-center pt-4 pb-3 px-3 bg-white">
      <IconArrowBack width={32} height={32} />
      <H2 tw="mx-4 flex-1 text-xl text-gray-600 leading-5">Book a Doctor</H2>
      <IconStethoscope width={48} height={48} />
    </Flex>
  );
};

export default Header;
