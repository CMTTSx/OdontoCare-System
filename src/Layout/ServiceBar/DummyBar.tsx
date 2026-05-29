import AttendanceItem from './AttendanceItem';

export default function DummyBar() {
  return (
    <AttendanceItem
      id="dummy-att-001"
      name="Abílio Diniz Jorge"
      age="60 Anos e 7 Meses"
      dateTime="22/12/2022 11:00"
      status="Agendado"
      color="#5465FF"
      isMockup
      showActions
    />
  );
}
