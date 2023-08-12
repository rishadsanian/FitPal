const ProfileLogo = (props) => {
  return (
    <div
      className="rounded-circle text-white d-flex align-items-center justify-content-center border border-white"
      style={{ width: '3em', height: '3em', background: '#5F36B6' }}
    >
      <h3 className="p-0 m-0">
        {props.email.charAt(0).toUpperCase()}
      </h3>
    </div>
  );
};
export default ProfileLogo;
