import create from 'zustand';

interface BookAppointmentState {
  bookType: 'doctor' | 'video';
  symptoms: string[];
  selectedSymptoms: string[];
  appointmentDate?: Date;
  appointmentTime?: string;
  patients: string[];
  selectedPatients: string[];
  fetchPatients: () => void;
  fetchSymptoms: () => void;
  setBookType: (bookType: 'doctor' | 'video') => void;
  setPatients: (patients: string[]) => void;
  setSymptoms: (symptoms: string[]) => void;
  addOrRemoveSelectedSymptom: (symptom: string) => void;
  addOrRemoveSelectedPatient: (patient: string) => void;
  setAppointmentDate: (date: Date) => void;
  setAppointmentTime: (time?: string) => void;
}

export const useBookAppointment = create<BookAppointmentState>((set, get) => ({
  bookType: 'doctor',
  symptoms: [],
  selectedSymptoms: [],
  patients: [],
  selectedPatients: [],
  setBookType: (bookType: 'doctor' | 'video') => set({bookType}),
  setPatients: (patients: string[]) => set({patients}),
  setSymptoms: (symptoms: string[]) => set({symptoms}),
  fetchPatients: () => {
    // mimic remote fetch
    setTimeout(() => {
      set({
        patients: [
          'Yarik Nikolenko',
          'Julien Timothy',
          'Raina Aretha',
          'Raizal Pregnanta',
        ],
      });
    }, 300);
  },
  fetchSymptoms: () => {
    setTimeout(() => {
      set({
        symptoms: [
          'symptom1',
          'symp2',
          'sympt3',
          'symptom4',
          'symptom5',
          'sym6',
          'symptom7',
          'symptom8',
          'symptom9',
          'symptom10',
        ],
      });
    }, 300);
  },
  addOrRemoveSelectedSymptom: (symptom: string) =>
    set({
      selectedSymptoms:
        get().selectedSymptoms.indexOf(symptom) >= 0
          ? get().selectedSymptoms.filter(p => p !== symptom)
          : [...get().selectedSymptoms, symptom],
    }),
  addOrRemoveSelectedPatient: (patient: string) =>
    set({
      selectedPatients:
        get().selectedPatients.indexOf(patient) >= 0
          ? get().selectedPatients.filter(p => p !== patient)
          : [...get().selectedPatients, patient],
    }),
  setAppointmentDate: (date: Date) => set({appointmentDate: date}),
  setAppointmentTime: (time?: string) => set({appointmentTime: time}),
}));
