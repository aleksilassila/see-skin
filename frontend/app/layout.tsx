import Navigation from "./(navigation)/Navigation";
import "./global.css";
import Footer from "./(footer)/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
