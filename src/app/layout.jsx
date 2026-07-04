import './globals.css';

export const metadata = {
  title: 'ProfileForge',
  description: 'Generate beautiful GitHub Profile READMEs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
