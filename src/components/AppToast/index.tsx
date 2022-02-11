import { Toast, ToastHeader, ToastBody } from 'reactstrap';

interface AppToastProps {
  open: boolean;
  headerText: string;
  bodyText: string;
}

const AppToast = (props: AppToastProps) => {
  const { open: isOpen, headerText, bodyText } = props;

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
      <Toast isOpen={isOpen}>
        <ToastHeader>{headerText}</ToastHeader>
        <ToastBody className="text-start">{bodyText}</ToastBody>
      </Toast>
    </div>
  );
};

export default AppToast;
