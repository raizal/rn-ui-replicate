import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Flex, H1} from '@components/index';
import Header from '@components/Header';
import HeaderSwitch from './components/HeaderSwitch';
import SymptomSection from '@features/book/components/SymptomSection';
import ChoosePatientSection from '@features/book/components/ChoosePatientSection';
import ReasonInputButton from './components/ReasonInputButton';
import SymptomDialog from '@features/book/components/SymptomDialog';
import BottomSheet from '@gorhom/bottom-sheet';
import {ScrollView as RNScrollView, TouchableOpacity} from 'react-native';
import {styled} from 'nativewind';
import {useBackHandler} from '@react-native-community/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppointmentDialog from './components/AppointmentDialog';
import {useBookAppointment} from './stores';

const ScrollView = styled(RNScrollView, 'bg-white h-full');
const Container = styled(SafeAreaView, 'flex-1 grow bg-white');
const FooterButton = styled(
  TouchableOpacity,
  'flex flex-col bg-white border border-0.5 border-neutral-200 items-center py-4 rounded-2xl',
);

const BookDoctor = () => {
  const symptomDialog = useRef<BottomSheet>(null);
  const appointmentDialog = useRef<BottomSheet>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchSymptoms = useBookAppointment(state => state.fetchSymptoms);
  const fetchPatients = useBookAppointment(state => state.fetchPatients);

  useEffect(() => {
    fetchSymptoms();
    fetchPatients();
  });

  useBackHandler(() => {
    if (dialogOpen) {
      symptomDialog?.current?.close();
      return true;
    }
    return false;
  });

  const showSymptomDialog = useCallback(() => {
    symptomDialog?.current?.expand();
  }, []);

  const showAppointmentDialog = useCallback(() => {
    appointmentDialog?.current?.expand();
  }, []);

  const onSubmitSymptomDialog = useCallback(() => {
    symptomDialog.current?.close();
  }, []);

  const onSubmitAppointment = useCallback(() => {
    appointmentDialog.current?.close();
  }, []);

  return (
    <Container>
      <Header />
      <ScrollView>
        <Flex>
          <HeaderSwitch />
          <ChoosePatientSection />
          <Flex tw="px-4 mt-5 mb-2">
            <ReasonInputButton
              onInputClick={showSymptomDialog}
              onDateClick={showAppointmentDialog}
              // pickedDate={selectedDate}
            />
          </Flex>
          <SymptomSection
            title="Selected symptoms and reasons:"
            variant="active"
          />
          <SymptomSection title="Choose your symptoms and reasons:" />
        </Flex>
      </ScrollView>
      <Flex tw="px-4 pb-4">
        <FooterButton
          tw="bg-brand-primary-500"
          activeOpacity={0.65}
          style={{
            elevation: 4,
          }}>
          <H1 tw="leading-6 text-white">Done</H1>
        </FooterButton>
      </Flex>
      <SymptomDialog
        ref={symptomDialog}
        onChange={index => {
          setDialogOpen(index >= 0);
        }}
        onSubmit={onSubmitSymptomDialog}
      />
      <AppointmentDialog
        ref={appointmentDialog}
        onChange={index => {
          setDialogOpen(index >= 0);
        }}
        onSubmit={onSubmitAppointment}
      />
    </Container>
  );
};

export default BookDoctor;
