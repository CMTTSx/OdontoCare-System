import AttendanceRow from './AttendanceRow';

export default function ServiceBar() {
  return (
    <AttendanceRow
      name="Mayara Silva Souza"
      age="26 Anos e 7 Meses"
      dateTime="22/12/2022 10:30"
      status="Em Atendimento"
      color="#05F140"
      showActions
    />
  );
}
