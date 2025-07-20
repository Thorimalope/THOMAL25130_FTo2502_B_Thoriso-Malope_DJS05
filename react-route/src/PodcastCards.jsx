import { Link } from "react-router-dom";

export default function PodcastCard(props) {
    const readableDate = new Date(props.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const genreTags = props.genres.map((genre, index) => (
        <span key={index} className="genre">{genre}</span>
    ));

    return (
        <Link to={`/podcast/${props.id}`} className="card-link">
            <div className="card">
                <img className="poster" src={props.image} alt={"Cover for " + props.title} />
                <h3 className="title">{props.title}</h3>
                <p className="season-count">
                    {props.seasons} season{props.seasons > 1 ? "s" : ""}
                </p>
                <div className="tags">
                    {genreTags}
                </div>
                <p className="updated-text">Updated {readableDate}</p>
            </div>
        </Link>
    );
}
