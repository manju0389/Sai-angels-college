export default function Programs({ programs }) {
    
  return (
    <section className="programs">
        <h2 className="text-center fw-bold pb-4"> Campus Infrastructure </h2>
        <div className="programs-container container">
          {programs.map((item, index) => (
            <a href="curriculum" style={{ textDecoration: "none" }}>
              <div className="card" key={index}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            </a>
          ))}
        </div>
      </section>
  );
}