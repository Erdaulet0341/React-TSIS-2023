import s from "./Profile.module.css";


export default function Profile() {

  return (
    <div className={s.container}>
      <div className={s.profile}>
        <h2>Profile</h2>
        <div className={s.profile_details}>
          <div className={s.profile_item}>
            <span className={s.label}>Username:</span>
            <span className={s.value}>JohnDoe</span>
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>Email:</span>
            <span className={s.value}>johndoe@example.com</span>
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>City:</span>
            <span className={s.value}>New York</span>
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>Password:</span>
            <span className={s.value}>********</span>
          </div>
        </div>
      </div>
    </div>
  );
}
