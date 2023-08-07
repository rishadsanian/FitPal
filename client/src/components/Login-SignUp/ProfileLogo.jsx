const ProfileLogo = (props) => {
  return (
    <div
      className="rounded-circle text-white d-flex align-items-center justify-content-center"
      style={{ width: '3em', height: '3em', background: '#4A55A2' }}
    >
      <h3 className="p-0 m-0 fw-bold">
        {props.email.charAt(0).toUpperCase()}
      </h3>
    </div>
  );
};
export default ProfileLogo;
