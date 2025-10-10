
export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
       <main className="flex-1 py-12 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>
              bitgro is a platform dedicated to making smart investments accessible to everyone. We believe in empowering our users with the tools and knowledge to grow their wealth confidently.
            </p>
            <p>
                Our team of financial experts and technologists work tirelessly to curate the best investment opportunities and build a secure, transparent, and easy-to-use platform.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
