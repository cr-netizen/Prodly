function Card({ title, description, image }) {
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={image}
        alt={title}
        className="w-full rounded"
      />

      <h2 className="text-xl font-bold mt-2">
        {title}
      </h2>

      <p>{description}</p>

      <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
        Learn More
      </button>
    </div>
  );
}
export default Card;