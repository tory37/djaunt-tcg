// SignOutButton component
const SignOutButton = ({ logout }) => {
  const handleSignOut = () => {
    logout();
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 20px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
