function StatCard({ icon, number, text }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <h3>{number}</h3>

      <p>{text}</p>
    </div>
  );
}

export default StatCard;