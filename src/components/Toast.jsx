const ToastComponent = ({ message, type }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className={`alert ${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ToastComponent;
