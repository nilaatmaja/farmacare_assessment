import { useParams } from 'react-router-dom';

export default function Pokemon() {
  const { id } = useParams();
  return <div>Pokemon</div>;
}
