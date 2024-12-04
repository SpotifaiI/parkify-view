import { Card } from '../components/Card';
import '../styles/screens/Home.css';

export function Home() {
  return (
    <main id="home-screen">
      <section>
        <Card label='Ocupada recente' heading='A2' />
        <Card label='Vaga concorrida' heading='G5' />
        <Card label='Vaga tranquila' heading='B4' />
        <Card label='Livre recente' heading='D7' />
        <Card label='Média espera' heading='10' content='minutos' />
        <Card label='Média ocupação' heading='3' content='horas' />
        <Card />
        <Card />
        <Card />
      </section>
    </main>
  );
}