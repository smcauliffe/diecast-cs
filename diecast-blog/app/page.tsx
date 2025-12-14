import Link from "next/link";
import { getAllCars } from "@/lib/contentstack";

export default async function Home() {
  const cars = await getAllCars();

  return (
    <main className="main">
      <h2 className="page-title">The Collection</h2>

      {cars.length === 0 ? (
        <div className="empty-state">
          <p>No cars in the collection yet.</p>
        </div>
      ) : (
        <div className="car-grid">
          {cars.map((car) => (
            <Link href={`/cars/${car.slug}`} key={car.uid} className="car-card">
              <div className="car-card-image">
                {car.main_image ? (
                  <img src={car.main_image.url} alt={car.title} />
                ) : (
                  <span>No image</span>
                )}
              </div>
              <div className="car-card-content">
                <h3 className="car-card-title">{car.title}</h3>
                <div className="car-card-meta">
                  <span className="brand-badge">{car.brand}</span>
                  {car.year && <span>{car.year}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
