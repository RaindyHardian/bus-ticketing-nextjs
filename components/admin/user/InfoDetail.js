export default function InfoDetail(props) {
  const { user } = props;
  return (
    <div>
      <div>
        <h4>Name</h4>
        <p>{user.name}</p>
      </div>
      <div>
        <h4>Email</h4>
        <p>{user.email}</p>
      </div>
      <div>
        <h4>Role</h4>
        <p>{user.role}</p>
      </div>
      <div>
        <h4>Created at</h4>
        <p>{user.created_at}</p>
      </div>
      <div>
        <h4>Updated at</h4>
        <p>{user.updated_at}</p>
      </div>
    </div>
  );
}
