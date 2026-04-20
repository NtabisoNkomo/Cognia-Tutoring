import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-primary font-mono text-xl mb-4 tracking-widest font-bold">404 ERROR</div>
        <h1 className="text-5xl font-bold text-foreground mb-6">Page Not Found</h1>
        <p className="text-text-secondary text-lg mb-8 max-w-md">It seems like the page you&apos;re looking for has moved to a higher grade or doesn&apos;t exist in our curriculum.</p>
        <Link href="/" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-all">
          Return Home
        </Link>
      </div>
    </div>
  );
}
