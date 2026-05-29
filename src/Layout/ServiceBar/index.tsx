import AttendanceItem from './AttendanceItem';
import { AttendanceItem as AttendanceItemType } from './types';

type ServiceBarProps = AttendanceItemType & {
  showActions?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
};

export default function ServiceBar(props: ServiceBarProps) {
  return <AttendanceItem {...props} />;
}
