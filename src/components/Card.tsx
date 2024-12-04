import '../styles/components/Card.css';

type CardProps = {
  label?: string;
  heading?: string;
  content?: string;
};

export function Card({ heading, content, label }: CardProps) {
  return (
    <div className="card-component">
      <span>{label}</span>
      <span>{heading}</span>
      <span>{content}</span>
    </div>
  );
}