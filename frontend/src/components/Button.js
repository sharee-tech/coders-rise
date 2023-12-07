export default function Button({ children, onClick, css }) {
  return (
    <button type="button" className={`btn ${css}`} onClick={onClick}>
      {" "}
      {children}
    </button>
  );
}
