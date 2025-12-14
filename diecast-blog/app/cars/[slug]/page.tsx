import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarBySlug, getAllCars } from "@/lib/contentstack";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cars = await getAllCars();
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export default async function CarPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <main className="main">
      <article className="car-detail">
        <Link href="/" className="back-link">
          ← Back to collection
        </Link>

        <div className="car-detail-image">
          {car.main_image ? (
            <img src={car.main_image.url} alt={car.title} />
          ) : (
            <span>No image</span>
          )}
        </div>

        <h1>{car.title}</h1>

        <div className="car-detail-meta">
          <span className="brand-badge">{car.brand}</span>
          {car.year && <span>Year: {car.year}</span>}
        </div>

        <div
          className="car-detail-description"
          dangerouslySetInnerHTML={{ __html: car.description }}
        />
      </article>
    </main>
  );
}
