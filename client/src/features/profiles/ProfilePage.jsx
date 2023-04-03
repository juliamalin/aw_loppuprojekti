import { useGetProfileQuery } from './profileSlice';

function Profile() {
  const { data, isLoading } = useGetProfileQuery('mikkoterho yms'); // tähän siis se profiili query

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <img src={data.image} alt={data.name} />
    </div>
  );
}
