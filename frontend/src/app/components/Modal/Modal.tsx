import PrimaryButton from "../PrimaryButton/PrimaryButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  title?: string;
  description?: string;
  actionButtonText?: string;
  closeButtonText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onAction,
  title,
  description,
  actionButtonText,
  closeButtonText,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="montserrat-regular w-[600px] rounded-lg bg-white p-12 text-center shadow-lg">
        <h5 className="mb-3 text-2xl">{title}</h5>
        <p className="mb-12 text-gray-500">{description}</p>
        <div className="flex justify-around">
          <PrimaryButton onClick={onAction} size="large" color="blue">
            {actionButtonText}
          </PrimaryButton>
          <PrimaryButton onClick={onClose} size="large" color="white">
            {closeButtonText}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
