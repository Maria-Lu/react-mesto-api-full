import PopupWithForm from './PopupWithForm';

function ConfirmPopup({
  isOpen,
  onClose,
  onCardDelete,
  isLoading
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText="Да"
      buttonLoadingText ="Удаление..."
      isButtonDisabled={false}
    />
  );
}

export default ConfirmPopup;
