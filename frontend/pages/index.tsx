import { useEvent, useStore, useList } from 'effector-react/ssr';
import { $users, update } from '@/models/users';
import { allSettled, fork, serialize } from 'effector';
import { $ssrData, getSSRDataExampleFx } from '@/models/ssr-data-example';
import appDomain from '@/models/app';

export default function Home() {
  const ssrData = useStore($ssrData);
  const updateEvent = useEvent(update);

  const handleClick = () => {
    updateEvent({
      id: 10,
      name: 'Foo',
    });
  };

  const renderUsers = useList($users, (user) => (
    <div key={user.id}>
      <h1>Name: {user.name}</h1>
      <span>Id: {user.id}</span>
    </div>
  ));

  return (
    <div>
      <h1>{JSON.stringify(ssrData, null, '  ')}</h1>
      <div>{renderUsers}</div>
      <button onClick={handleClick}>Добавить</button>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const scope = fork(appDomain);
  await allSettled(getSSRDataExampleFx, { scope });

  return {
    props: {
      initialState: serialize(scope, { onlyChanges: true }),
    },
  };
};
