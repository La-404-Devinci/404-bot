interface CardProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  title: string;
}

export default function Card({ children, footer, title }: CardProps) {
  return (
    <div className="bg-black p-8 lg:p-12">
      <header>
        <h2 className="text-white text-2xl font-bold">{title}</h2>
      </header>

      <div className="mt-6 pt-6 border-t border-white/20 max-w-xl">
        {children}
      </div>

      {footer && (
        <footer className="mt-6 pt-6 border-t border-white/20 flex justify-end">
          {footer}
        </footer>
      )}
    </div>
  );
}
