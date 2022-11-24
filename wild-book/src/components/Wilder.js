import profile from "../assets/profile.png";

const Wilder = ({name, skills, description}) => {
    return (
        <article className="cards">
            <img src={profile} className="profile_image" alt="profile-jane-doe" />
            <h3>{name}</h3>
            <p>{description}</p>
            <ul className="skill_list_container">
                {skills.map((e) => <li className="skill_list_item">{e}</li>)}
            </ul>
        </article>
    )
};

export default Wilder;