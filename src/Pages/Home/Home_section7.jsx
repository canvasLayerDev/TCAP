import { FiArrowUpRight } from "react-icons/fi";
import "./Home_section7.css";
import { useNavigate } from "react-router-dom";

const Home_section7 = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* COLLAB CTA SECTION */}
      <section
        className="collab-wrap"
        style={{
          backgroundImage: 'url("/img/Hero-bg2.svg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100px",
          display: "flex",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <section className="collab-inner container">
          <p className="collab-tagline">LET'S COLLABORATE</p>

          <h1 className="collab-heading">
            LET&apos;S WORK <br /> TOGETHER
          </h1>

          {/* <button
            className="collab-action-btn"
            onClick={() => navigate("/partner")}
          >
            <FiArrowUpRight size={20} />
            <span>Get In Touch</span>
          </button> */}

          <button
  className="collab-action-btn"
  onClick={() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      navigate("/partner");
    }, 300); // thoda delay taaki smooth scroll feel aaye
  }}
>
  <FiArrowUpRight size={20} />
  <span>Get In Touch</span>
</button>

        </section>
      </section>
    </>
  );
};

export default Home_section7;
