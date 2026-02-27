// src/component/ConfirmModal.jsx
import "../css/confirmModal.css";

export default function ConfirmModal({
  open,
  title = "확인",
  message,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
}) {
  if (!open) return null;

  return (
    <div className="cm-backdrop" onClick={onCancel}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cm-head">
          <h3>{title}</h3>
        </div>

        <div className="cm-body">
          {/* 줄바꿈 메시지 대응 */}
          <p className="cm-message">
            {String(message).split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>

        <div className="cm-actions">
          <button className="cm-btn cm-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="cm-btn cm-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}