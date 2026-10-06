function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      className={`primary-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;