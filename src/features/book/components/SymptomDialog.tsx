import React, {useCallback, useMemo, useState} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {Keyboard, TouchableOpacity} from 'react-native';
import {BodyText, Flex, H1, H2} from '@components/index';
import {styled} from 'nativewind';
import {BottomSheetDefaultFooterProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';
import SymptomSection from '@features/book/components/SymptomSection';
import {useBookAppointment} from '@features/book/stores';

const FooterButton = styled(
  TouchableOpacity,
  'flex flex-col bg-white border border-0.5 border-neutral-200 items-center py-4 rounded-2xl',
);

const ContentContainer = styled(
  Flex,
  'flex flex-col py-8 rounded-t-2xl border-t-1',
);

const TextInput = styled(
  BottomSheetTextInput,
  'border border-1 border-neutral-200 rounded-xl mt-3 px-4 py-2 bg-brand-bg-input shadow-xl',
);

interface SymptompDialogProps {
  onChange?: (index: number) => void;
  onSubmit?: (selected: string[]) => void;
}

const SymptomDialog = React.forwardRef<BottomSheet, SymptompDialogProps>(
  ({onChange, onSubmit}, ref) => {
    const onSelect = useBookAppointment(
      state => state.addOrRemoveSelectedSymptom,
    );

    const [inputText, setInputText] = useState('');

    const initialSnapPoints = useMemo(() => ['75%', '75%'], []);

    const onInputSubmit = useCallback(() => {
      onSelect(inputText);
      setInputText('');
    }, [inputText, onSelect]);

    const onClose = useCallback(() => {
      setInputText('');
      Keyboard.dismiss();
      onChange && onChange(-1);
    }, [onChange]);

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} />
      ),
      [],
    );

    const renderFooter = useCallback(
      (props: BottomSheetDefaultFooterProps) => {
        return (
          <BottomSheetFooter {...props} bottomInset={24}>
            <Flex tw="px-4">
              <FooterButton
                onPress={() => onSubmit && onSubmit([])}
                activeOpacity={0.9}
                style={{
                  elevation: 4,
                }}>
                <H2 tw="leading-5 text-brand-primary-500">Done</H2>
              </FooterButton>
            </Flex>
          </BottomSheetFooter>
        );
      },
      [onSubmit],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={initialSnapPoints}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={renderBackdrop}
        onChange={onChange}
        onClose={onClose}
        footerComponent={renderFooter}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetScrollView>
          <ContentContainer tw="pb-[72px]">
            <Flex tw="px-4">
              <H1>Symptoms & Conditions</H1>
              <BodyText>Please specify your symptoms:</BodyText>
              <TextInput
                value={inputText}
                returnKeyType={'done'}
                numberOfLines={1}
                onChangeText={text => setInputText(text)}
                onSubmitEditing={onInputSubmit}
                placeholder="e.g. Cough"
              />
            </Flex>
            <SymptomSection
              title="Selected symptoms and reasons:"
              variant="active"
            />
            <SymptomSection title="Choose your symptoms and reasons:" />
          </ContentContainer>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

export default SymptomDialog;
